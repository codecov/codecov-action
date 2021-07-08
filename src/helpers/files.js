// @ts-check
const childProcess = require('child_process')
const fs = require('fs')
const path = require('path').posix
const glob = require('glob')
const { log } = require('./logger')

/**
 *
 * @param {string} projectRoot
 * @returns {Promise<string>}
 */
async function getFileListing(projectRoot, args) {
  return getAllFiles(projectRoot, projectRoot, args).join('')
}

function manualBlacklist() {
  // TODO: honor the .gitignore file instead of a hard-coded list
  return [
    'node_modules',
    '.git',
    '.nyc_output',
    '.circleci',
    '.nvmrc',
    '.gitignore',
    '.DS_Store',
    'vendor',
  ]
}

function globBlacklist() {
  // TODO: honor the .gitignore file instead of a hard-coded list
  return [
    'node_modules/**/*',
    'vendor',
    '.git',
    '.nyc_output',
    '.circleci',
    '.nvmrc',
    '.gitignore',
    '*.am',
    '*.bash',
    '*.bat',
    '*.bw',
    '*.cfg',
    '*.class',
    '*.cmake',
    '*.cmake',
    '*.conf',
    '*.coverage',
    '*.cp',
    '*.cpp',
    '*.crt',
    '*.css',
    '*.csv',
    '*.csv',
    '*.data',
    '*.db',
    '*.dox',
    '*.ec',
    '*.ec',
    '*.egg',
    '*.el',
    '*.env',
    '*.erb',
    '*.exe',
    '*.ftl',
    '*.gif',
    '*.gradle',
    '*.gz',
    '*.h',
    '*.html',
    '*.in',
    '*.jade',
    '*.jar*',
    '*.jpeg',
    '*.jpg',
    '*.js',
    '*.less',
    '*.log',
    '*.m4',
    '*.mak*',
    '*.md',
    '*.o',
    '*.p12',
    '*.pem',
    '*.png',
    '*.pom*',
    '*.profdata',
    '*.proto',
    '*.ps1',
    '*.pth',
    '*.py',
    '*.pyc',
    '*.pyo',
    '*.rb',
    '*.rsp',
    '*.rst',
    '*.ru',
    '*.sbt',
    '*.scss',
    '*.scss',
    '*.serialized',
    '*.sh',
    '*.snapshot',
    '*.sql',
    '*.svg',
    '*.tar.tz',
    '*.template',
    '*.whl',
    '*.xcconfig',
    '*.xcoverage.*',
    '*/classycle/report.xml',
    '*codecov.yml',
    '*~',
    '.*coveragerc',
    '.coverage*',
    'coverage-summary.json',
    'createdFiles.lst',
    'fullLocaleNames.lst',
    'include.lst',
    'inputFiles.lst',
    'phpunit-code-coverage.xml',
    'phpunit-coverage.xml',
    'remapInstanbul.coverage*.json',
    'scoverage.measurements.*',
    'test_*_coverage.txt',
    'testrunner-coverage*',
  ]
}

function coverageFilePatterns() {
  return [
    '*coverage*.*',
    'nosetests.xml',
    'jacoco*.xml',
    'clover.xml',
    'report.xml',
    '*.codecov.!(exe)',
    'codecov.!(exe)',
    'cobertura.xml',
    'excoveralls.json',
    'luacov.report.out',
    'coverage-final.json',
    'naxsi.info',
    'lcov.info',
    'lcov.dat',
    '*.lcov',
    '*.clover',
    'cover.out',
    'gcov.info',
    '*.gcov',
    '*.lst',
  ]
}

/**
 *
 * @param {string} projectRoot
 * @param {string[]} coverageFilePatterns
 * @returns {string[]}
 */
function getCoverageFiles(projectRoot, coverageFilePatterns) {
  return coverageFilePatterns.flatMap(pattern => {
    return glob.sync(`**/${pattern}`, {
      cwd: projectRoot,
      ignore: globBlacklist(),
    })
  })
}

/**
 *
 * @param {string} projectRoot
 * @param {string} file
 * @param {string[]} manualBlacklist
 * @returns boolean
 */
function isBlacklisted(projectRoot, file, manualBlacklist) {
  const blacklist = manualBlacklist
  return blacklist.includes(file)
}

function fetchGitRoot() {
  try {
    return (
      childProcess.spawnSync('git', ['rev-parse', '--show-toplevel'], {
        encoding: 'utf-8',
      }).stdout ||
      childProcess.spawnSync('hg', ['root'], { encoding: 'utf-8' }).stdout ||
      process.cwd()
    ).trimRight()
  } catch (error) {
    throw new Error('Error fetching git root. Please try using the -R flag.')
  }
}

/**
 *
 * @param {string} projectRoot
 * @returns {string[]}
 */
function parseGitIgnore(projectRoot) {
  const gitIgnorePath = path.join(projectRoot, '.gitignore')
  let lines
  try {
    lines = readAllLines(gitIgnorePath) || []
  } catch (error) {
    throw new Error(`Unable to open ${gitIgnorePath}: ${error}`)
  }

  return lines.filter(line => {
    if (line === '' || line.startsWith('#')) {
      return false
    }
    return true
  })
}

/**
 *
 * @param {string} projectRoot Root of the project
 * @param {string} dirPath Directory to search in
 * @param {string[]} arrayOfFiles
 * @returns {string[]}
 */
function getAllFiles(projectRoot, dirPath, args, arrayOfFiles = []) {
  log(`Searching for files in ${dirPath}`, { level: 'debug', args })
  const files = fs.readdirSync(dirPath)

  files.forEach(function (file) {
    if (isBlacklisted(projectRoot, file, manualBlacklist())) {
      return
    }
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(
        projectRoot,
        path.join(dirPath, file),
        args,
        arrayOfFiles,
      )
    } else {
      arrayOfFiles.push(
        `${path.join(dirPath.replace(projectRoot, '.'), file)}\n`,
      )
    }
  })
  log(`Search complete for files in ${dirPath}`, { level: 'debug', args })
  return arrayOfFiles
}

/**
 *
 * @param {string} filePath
 * @returns {string[]}
 */
function readAllLines(filePath) {
  const fileContents = fs.readFileSync(filePath)

  const lines = fileContents.toString().split('\n') || []
  return lines
}

/**
 *
 * @param {string} projectRoot
 * @param {string} filePath
 * @returns {string}
 */
function readCoverageFile(projectRoot, filePath) {
  try {
    return fs.readFileSync(getFilePath(projectRoot, filePath), {
      encoding: 'utf-8',
    })
  } catch (error) {
    throw new Error(`There was an error reading the coverage file: ${error}`)
  }
}

function endNetworkMarker() {
  return '<<<<<< network\n'
}

function endFileMarker() {
  return '<<<<<< EOF\n'
}

function fileHeader(filePath) {
  return `# path=${filePath}\n`
}

function endEnvironmentMarker() {
  return '<<<<<< ENV\n'
}

/**
 *
 * @param {string} projectRoot
 * @param {string} filePath
 * @returns {string}
 */
function getFilePath(projectRoot, filePath) {
  if (
    filePath.startsWith('./') ||
    filePath.startsWith('/') ||
    filePath.startsWith('.\\') ||
    filePath.startsWith('.\\')
  ) {
    return filePath
  }
  if (projectRoot === '.') {
    return path.join('.', filePath)
  }
  return path.join(projectRoot, filePath)
}

function removeFile(projectRoot, filePath) {
  fs.unlink(getFilePath(projectRoot, filePath), err => {
    if (err) {
      log(`Error removing ${filePath} coverage file`)
    }
  })
}

module.exports = {
  readCoverageFile,
  getFileListing,
  endFileMarker,
  endNetworkMarker,
  endEnvironmentMarker,
  fileHeader,
  fetchGitRoot,
  parseGitIgnore,
  getCoverageFiles,
  coverageFilePatterns,
  getFilePath,
  removeFile,
}
