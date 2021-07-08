function detect(envs) {
  return envs.CI && envs.CIRCLECI
}

// eslint-disable-next-line no-unused-vars
function _getBuildURL(inputs) {
  return ''
}

// This is the value that gets passed to the Codecov uploader
function _getService() {
  return 'circleci'
}

// This is the name that gets printed
function getServiceName() {
  return 'CircleCI'
}

function _getBranch(inputs) {
  const { args, envs } = inputs
  return args.branch || envs.CIRCLE_BRANCH
}

function _getSHA(inputs) {
  const { args, envs } = inputs
  return args.sha || envs.CIRCLE_SHA1
}

function _getSlug(inputs) {
  const { args, envs } = inputs
  let slug
  if (envs.CIRCLE_PROJECT_REPONAME !== '') {
    slug = `${envs.CIRCLE_PROJECT_USERNAME}/${envs.CIRCLE_PROJECT_REPONAME}`
  } else {
    slug = `${envs.CIRCLE_REPOSITORY_URL.split(':')[1].split('.git')[0]}`
  }
  return args.slug || slug
}

function _getBuild(inputs) {
  const { args, envs } = inputs
  return args.build || envs.CIRCLE_BUILD_NUM || ''
}

function _getPR(inputs) {
  const { args, envs } = inputs
  return args.pr || envs.CIRCLE_PR_NUMBER || ''
}

function _getJob(envs) {
  return envs.CIRCLE_NODE_INDEX || ''
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
