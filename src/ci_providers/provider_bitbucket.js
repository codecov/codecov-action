const childProcess = require('child_process')
const { validateSHA } = require('../helpers/validate.js')

function detect(envs) {
  return envs.CI && envs.BITBUCKET_BUILD_NUMBER
}

function _getBuild(inputs) {
  const { args, envs } = inputs
  return args.build || envs.BITBUCKET_BUILD_NUMBER
}

// eslint-disable-next-line no-unused-vars
function _getBuildURL(inputs) {
  return ''
}

function _getBranch(inputs) {
  const { args, envs } = inputs
  return args.branch || envs.BITBUCKET_BRANCH || ''
}

function _getJob(envs) {
  return envs.BITBUCKET_BUILD_NUMBER
}

function _getPR(inputs) {
  const { args, envs } = inputs
  return args.pr || envs.BITBUCKET_PR_ID || ''
}

function _getService() {
  return 'bitbucket'
}

function getServiceName() {
  return 'Bitbucket'
}

function _getSHA(inputs) {
  const { args, envs } = inputs
  let commit = envs.BITBUCKET_COMMIT

  if (commit && validateSHA(commit, 12)) {
    commit = childProcess.execFileSync('git', ['rev-parse', commit])
  }

  return args.sha || commit
}

function _getSlug(inputs) {
  const { args, envs } = inputs

  let slug = ''
  if (envs.BITBUCKET_REPO_OWNER && envs.BITBUCKET_REPO_SLUG) {
    slug = `${envs.BITBUCKET_REPO_OWNER}/${envs.BITBUCKET_REPO_SLUG}`
  }
  return args.slug || slug
}

function getServiceParams(inputs) {
  return {
    branch: _getBranch(inputs),
    build: _getBuild(inputs),
    buildURL: _getBuildURL(inputs),
    commit: _getSHA(inputs),
    job: _getJob(inputs.envs),
    pr: _getPR(inputs),
    service: _getService(),
    slug: _getSlug(inputs),
  }
}

module.exports = {
  detect,
  getServiceName,
  getServiceParams,
}
