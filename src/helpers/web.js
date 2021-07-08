const superagent = require('superagent')
const validateHelpers = require('./validate')
const { log } = require('./logger')

/**
 *
 * @param {Object} inputs
 * @param {NodeJS.ProcessEnv} inputs.envs
 * @param {Object} serviceParams
 * @returns Object
 */
function populateBuildParams(inputs, serviceParams) {
  const { args, envs } = inputs
  serviceParams.name = args.name || envs.CODECOV_NAME || ''
  serviceParams.tag = args.tag || ''
  serviceParams.flags = validateHelpers.validateFlags(args.flags)
    ? args.flags
    : ''
  serviceParams.parent = args.parent || ''
  return serviceParams
}

/**
 *
 * @param {string} uploadURL
 * @param {Buffer} uploadFile
 * @returns {Promise<{ status: string, resultURL: string }>}
 */
async function uploadToCodecovPUT(uploadURL, uploadFile) {
  log('Uploading...')

  const parts = uploadURL.split('\n')
  const putURL = parts[1]
  const codecovResultURL = parts[0]

  try {
    const result = await superagent
      .put(`${putURL}`)
      .retry()
      .send(uploadFile)
      .set('Content-Type', 'text/plain')
      .set('Content-Encoding', 'gzip')

    if (result.status === 200) {
      return { status: 'success', resultURL: codecovResultURL }
    }
    throw new Error(`Error uploading: ${result.status}, ${result.body}`)
  } catch (error) {
    throw new Error(`Error uploading: ${error}`)
  }
}

/**
 *
 * @param {string} uploadURL The upload url
 * @param {string} token Covecov token
 * @param {string} query Query parameters
 * @param {Buffer} uploadFile Coverage file to upload
 * @param {string} version uploader version number
 * @returns {Promise<string>}
 */
async function uploadToCodecov(uploadURL, token, query, uploadFile, version) {
  try {
    const result = await superagent
      .post(`${uploadURL}/upload/v4?package=uploader-${version}&${query}`)
      .retry()
      .send(uploadFile)
      .set('Content-Type', 'text/plain')
      .set('Content-Encoding', 'gzip')
      .set('X-Upload-Token', token)
      .set('X-Reduced-Redundancy', 'false')

    return result.res.text
  } catch (error) {
    throw new Error(`Error uploading to Codecov: ${error}`)
  }
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
function camelToSnake(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      )
      .map(s => s.toLowerCase())
      .join('_')
  )
}

/**
 *
 * @param {Object} queryParams
 * @returns {string}
 */
function generateQuery(queryParams) {
  const query = Object.entries(queryParams)
    .map(([key, value]) => `${camelToSnake(key)}=${value}`)
    .join('&')
  return query
}

module.exports = {
  populateBuildParams,
  uploadToCodecov,
  uploadToCodecovPUT,
  generateQuery,
}
