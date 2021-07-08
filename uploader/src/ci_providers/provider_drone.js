function detect(envs) {
  return !!envs.DRONE
}

function _getBuild(inputs) {
  const { args, envs } = inputs
  return args.build || envs.DRONE_BUILD_NUMBER
}

function _getBuildURL(inputs) {
  const { envs } = inputs
  return envs.DRONE_BUILD_URL || ''
}

function _getBranch(inputs) {
  const { args, envs } = inputs
  return args.branch || envs.DRONE_BRANCH || ''
}

// eslint-disable-next-line no-unused-vars
function _getJob(envs) {
  return ''
}

function _getPR(inputs) {
  const { args, envs } = inputs
  return args.pr || envs.DRONE_PULL_REQUEST || ''
}

function _getService() {
  return 'drone'
}

function getServiceName() {
  return 'Drone'
}

function _getSHA(inputs) {
  const { args, envs } = inputs
  return args.sha || envs.DRONE_COMMIT_SHA || ''
}

function _getSlug(inputs) {
  const { args, envs } = inputs
  return args.slug || envs.DRONE_REPO_LINK || ''
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
