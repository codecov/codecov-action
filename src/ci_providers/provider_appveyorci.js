function detect(envs) {
  return (
    (envs.CI === 'true' || envs.CI === 'True') &&
    (envs.APPVEYOR === 'true' || envs.APPVEYOR === 'True')
  )
}

function _getBuild(inputs) {
  const { args, envs } = inputs
  return args.build || encodeURIComponent(envs.APPVEYOR_JOB_ID)
}

function _getBuildURL(inputs) {
  const { envs } = inputs
  if (
    envs.APPVEYOR_URL &&
    envs.APPVEYOR_REPO_NAME &&
    envs.APPVEYOR_BUILD_ID &&
    envs.APPVEYOR_JOB_ID
  ) {
    return encodeURIComponent(
      `${envs.APPVEYOR_URL}/project/${envs.APPVEYOR_REPO_NAME}/builds/${envs.APPVEYOR_BUILD_ID}/job/${envs.APPVEYOR_JOB_ID}`,
    )
  }
  return ''
}

function _getBranch(inputs) {
  const { args, envs } = inputs
  return args.branch || envs.APPVEYOR_REPO_BRANCH || ''
}

function _getJob(envs) {
  if (
    envs.APPVEYOR_ACCOUNT_NAME &&
    envs.APPVEYOR_PROJECT_SLUG &&
    envs.APPVEYOR_BUILD_VERSION
  ) {
    return `${envs.APPVEYOR_ACCOUNT_NAME}%2F${envs.APPVEYOR_PROJECT_SLUG}%2F${envs.APPVEYOR_BUILD_VERSION}`
  }
  return ''
}

function _getPR(inputs) {
  const { args, envs } = inputs
  return args.pr || envs.APPVEYOR_PULL_REQUEST_NUMBER || ''
}

function _getService() {
  return 'appveyor'
}

function getServiceName() {
  return 'Appveyor CI'
}

function _getSHA(inputs) {
  const { args, envs } = inputs
  return args.sha || envs.APPVEYOR_REPO_COMMIT || ''
}

function _getSlug(inputs) {
  const { args, envs } = inputs
  return args.slug || envs.APPVEYOR_REPO_NAME || ''
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
