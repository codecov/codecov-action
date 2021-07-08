function detect(envs) {
  return envs.CI && envs.TRAVIS && envs.SHIPPABLE
}

function _getBuild(inputs) {
  const { args, envs } = inputs
  return args.build || envs.TRAVIS_JOB_NUMBER
}

// eslint-disable-next-line no-unused-vars
function _getBuildURL(inputs) {
  return ''
}

function _getBranch(inputs) {
  const { args, envs } = inputs

  let branch = ''
  if (envs.TRAVIS_BRANCH !== envs.TRAVIS_TAG) {
    branch = envs.TRAVIS_PULL_REQUEST_BRANCH || envs.TRAVIS_BRANCH
  }
  return args.branch || branch
}

function _getJob(envs) {
  return envs.TRAVIS_JOB_ID
}

function _getPR(inputs) {
  const { args, envs } = inputs
  return args.pr || envs.TRAVIS_PULL_REQUEST || ''
}

function _getService() {
  return 'travis'
}

function getServiceName() {
  return 'Travis CI'
}

function _getSHA(inputs) {
  const { args, envs } = inputs
  return args.sha || envs.TRAVIS_PULL_REQUEST_SHA || envs.TRAVIS_COMMIT
}

function _getSlug(inputs) {
  const { args, envs } = inputs
  return args.slug || envs.TRAVIS_REPO_SLUG
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
