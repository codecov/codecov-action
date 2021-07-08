function detect(envs) {
  return envs.JENKINS_URL
}

function _getBuild(inputs) {
  const { args, envs } = inputs
  return args.build || envs.BUILD_NUMBER
}

function _getBuildURL(inputs) {
  const { envs } = inputs
  return envs.BUILD_URL ? encodeURIComponent(envs.BUILD_URL) : ''
}

function _getBranch(inputs) {
  const { args, envs } = inputs
  return (
    args.branch ||
    envs.ghprbSourceBranch ||
    envs.GIT_BRANCH ||
    envs.BRANCH_NAME ||
    ''
  )
}

// eslint-disable-next-line no-unused-vars
function _getJob(envs) {
  return ''
}

function _getPR(inputs) {
  const { args, envs } = inputs
  return args.pr || envs.ghprbPullId || envs.CHANGE_ID || ''
}

function _getService() {
  return 'jenkins'
}

function getServiceName() {
  return 'Jenkins CI'
}

function _getSHA(inputs) {
  const { args, envs } = inputs
  return args.sha || envs.ghprbActualCommit || envs.GIT_COMMIT || ''
}

function _getSlug(inputs) {
  const { args } = inputs
  return args.slug || ''
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
