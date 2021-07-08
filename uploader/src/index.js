// @ts-check
const zlib = require('zlib')
const { version } = require('../package.json')
const fileHelpers = require('./helpers/files')
const validateHelpers = require('./helpers/validate')
const webHelpers = require('./helpers/web')
const { log } = require('./helpers/logger')
const providers = require('./ci_providers')

/**
 *
 * @param {string} uploadHost
 * @param {string} token
 * @param {string} query
 * @param {string} uploadFile
 * @param {Object} args
 * @param {number} start
 */
function dryRun(uploadHost, token, query, uploadFile) {
  log('==> Dumping upload file (no upload)')
  log(
    `${uploadHost}/upload/v4?package=uploader-${version}&token=${token}&${query}`,
  )
  log(uploadFile)
}

/**
 *
 * @param {Object} args
 * @param {string} args.build Specify the build number manually
 * @param {string} args.branch Specify the branch manually
 * @param {string} args.dir Directory to search for coverage reports.
 * @param {string} args.env Specify environment variables to be included with this build
 * @param {string} args.sha Specify the commit SHA mannually
 * @param {string} args.file Target file(s) to upload
 * @param {string} args.flags Flag the upload to group coverage metrics
 * @param {string} args.name Custom defined name of the upload. Visible in Codecov UI
 * @param {string} args.parent The commit SHA of the parent for which you are uploading coverage.
 * @param {string} args.pr Specify the pull request number mannually
 * @param {string} args.token Codecov upload token
 * @param {string} args.tag Specify the git tag
 * @param {boolean} args.verbose Run with verbose logging
 * @param {string} args.rootDir Specify the project root directory when not in a git repo
 * @param {boolean} args.nonZero Should errors exit with a non-zero (default: false)
 * @param {boolean} args.dryRun Don't upload files to Codecov
 * @param {string} args.slug Specify the slug manually (Enterprise use)
 * @param {string} args.url Change the upload host (Enterprise use)
 * @param {boolean} args.clean Move discovered coverage reports to the trash
 * @param {string} args.feature Toggle features
 */
async function main(args) {
  /*
  Step 1: validate and sanitize inputs
  Step 2: detect if we are in a git repo
  Step 3: get network (file listing)
  Step 4: select coverage files (search or specify)
  Step 5: generate upload file
  Step 6: determine CI provider
  Step 7: either upload or dry-run
  */

  // == Step 1: validate and sanitize inputs
  // TODO: clean and sanitize envs and args
  const envs = process.env
  // args
  const inputs = { args, envs }

  const uploadHost = validateHelpers.validateURL(args.url)
    ? args.url
    : 'https://codecov.io'
  let token = validateHelpers.validateToken(args.token) ? args.token : ''
  if (token === '') {
    token = process.env.CODECOV_TOKEN || ''
  }
  token = args.token || process.env.CODECOV_TOKEN || ''
  log(generateHeader(getVersion()))

  // == Step 2: detect if we are in a git repo
  const projectRoot = args.rootDir || fileHelpers.fetchGitRoot()
  if (projectRoot === '') {
    log(
      '=> No git repo detected. Please use the -R flag if the below detected directory is not correct.',
    )
  }

  log(`=> Project root located at: ${projectRoot}`)

  // == Step 3: get network
  let uploadFile = ''

  if (!args.feature || args.feature.split(',').includes('network') === false) {
    log('Start of network processing...', { level: 'debug', args })
    let fileListing
    try {
      fileListing = await fileHelpers.getFileListing(projectRoot, args)
    } catch (error) {
      throw new Error(`Error getting file listing: ${error}`)
    }

    uploadFile = uploadFile
      .concat(fileListing)
      .concat(fileHelpers.endNetworkMarker())
  }

  // == Step 4: select coverage files (search or specify)

  // Look for files
  let coverageFilePaths = []
  if (!args.file) {
    coverageFilePaths = fileHelpers.getCoverageFiles(
      args.dir || projectRoot,
      // TODO: Determine why this is so slow (I suspect it's walking paths it should not)
      fileHelpers.coverageFilePatterns(),
    )
    if (coverageFilePaths.length > 0) {
      log(`=> Found ${coverageFilePaths.length} possible coverage files:`)
      log(coverageFilePaths.join('\n'))
    } else {
      throw new Error(
        'No coverage files located, please try use `-f`, or change the project root with `-R`',
      )
    }
  } else {
    coverageFilePaths[0] = validateHelpers.validateFileNamePath(args.file)
      ? args.file
      : ''
    if (coverageFilePaths.length === 0) {
      throw new Error('Not coverage file found, exiting.')
    }
  }
  log('End of network processing', { level: 'debug', args })

  // == Step 5: generate upload file
  // TODO: capture envs

  // Get coverage report contents
  for (const coverageFile of coverageFilePaths) {
    let fileContents
    try {
      fileContents = await fileHelpers.readCoverageFile(
        args.dir || projectRoot,
        coverageFile,
      )
    } catch (error) {
      throw new Error(`Error reading coverage file (${coverageFile}): ${error}`)
    }

    uploadFile = uploadFile.concat(fileHelpers.fileHeader(coverageFile))
    uploadFile = uploadFile.concat(fileContents)
    uploadFile = uploadFile.concat(fileHelpers.endFileMarker())
  }

  // Cleanup
  if (args.clean) {
    for (const coverageFile of coverageFilePaths) {
      fileHelpers.removeFile(args.dir || projectRoot, coverageFile)
    }
  }

  // Environment variables
  if (args.env || envs.CODECOV_ENV) {
    const environmentVars = args.env || envs.CODECOV_ENV
    const vars = environmentVars
      .split(',')
      .filter(Boolean)
      .map(evar => `${evar}=${process.env[evar] || ''}\n`)
      .join('')
    uploadFile = uploadFile.concat(vars)
    uploadFile = uploadFile.concat(fileHelpers.endEnvironmentMarker())
  }

  const gzippedFile = zlib.gzipSync(uploadFile)

  // == Step 6: determine CI provider

  // Determine CI provider
  let serviceParams
  for (const provider of providers) {
    if (provider.detect(envs)) {
      log(`Detected ${provider.getServiceName()} as the CI provider.`)
      serviceParams = provider.getServiceParams(inputs)
      break
    }
  }

  if (serviceParams === undefined) {
    throw new Error('Unable to detect service, please specify manually.')
  }

  // == Step 7: either upload or dry-run

  const query = webHelpers.generateQuery(
    webHelpers.populateBuildParams(inputs, serviceParams),
  )

  if (args.dryRun) {
    return dryRun(uploadHost, token, query, uploadFile)
  } else {
    log(
      `Pinging Codecov: ${uploadHost}/v4?package=uploader-${version}&token=*******&${query}`,
    )
    try {
      const uploadURL = await webHelpers.uploadToCodecov(
        uploadHost,
        token,
        query,
        gzippedFile,
        version,
      )
      const result = await webHelpers.uploadToCodecovPUT(uploadURL, gzippedFile)
      log(result)
      return result
    } catch (error) {
      throw new Error(`Error uploading to ${uploadHost}: ${error}`)
    }
  }
}

/**
 *
 * @param {string} version
 * @returns {string}
 */
function generateHeader(version) {
  return `
     _____          _
    / ____|        | |
   | |     ___   __| | ___  ___ _____   __
   | |    / _ \\ / _\` |/ _ \\/ __/ _ \\ \\ / /
   | |___| (_) | (_| |  __/ (_| (_) \\ V /
    \\_____\\___/ \\__,_|\\___|\\___\\___/ \\_/

  Codecov report uploader ${version}`
}

function getVersion() {
  return version
}

module.exports = {
  log,
  main,
  getVersion,
  generateHeader,
}
