const childProcess = require('child_process')
const { log } = require('../helpers/logger')

function detect(envs) {
  return envs.GITHUB_ACTIONS
}

function _getBuild(inputs) {
  const { args, envs } = inputs
  return args.build || envs.GITHUB_RUN_ID || ''
}

function _getBuildURL(inputs) {
  const { envs } = inputs
  return encodeURIComponent(
    `${envs.GITHUB_SERVER_URL}/${_getSlug(inputs)}/actions/runs/${_getBuild(
      inputs,
    )}`,
  )
}

function _getBranch(inputs) {
  const { args, envs } = inputs
  const branchRegex = /refs\/heads\/(.*)/
  const branchMatches = branchRegex.exec(envs.GITHUB_REF)
  let branch
  if (branchMatches) {
    branch = branchMatches[1]
  }

  if (envs.GITHUB_HEAD_REF && envs.GITHUB_HEAD_REF !== '') {
    branch = envs.GITHUB_HEAD_REF
  }
  return args.branch || branch
}

function _getJob(envs) {
  return encodeURIComponent(envs.GITHUB_WORKFLOW)
}

function _getPR(inputs) {
  const { args, envs } = inputs
  let match
  if (envs.GITHUB_HEAD_REF && envs.GITHUB_HEAD_REF !== '') {
    const prRegex = /refs\/pull\/([0-9]+)\/merge/
    const matches = prRegex.exec(envs.GITHUB_REF)
    match = matches[1]
  }
  return args.pr || match || ''
}

function _getService() {
  return 'github-actions'
}

function getServiceName() {
  return 'GitHub Actions'
}

function _getSHA(inputs) {
  const { args, envs } = inputs
  const pr = _getPR(inputs)

  let commit = envs.GITHUB_SHA
  if (pr && pr !== false && !args.sha) {
    const mergeCommitRegex = /^[a-z0-9]{40} [a-z0-9]{40}$/
    const mergeCommitMessage = childProcess
      .spawnSync('git', ['show', '--no-patch', '--format="%P"'])
      .stdout.toString()
      .trimRight()
    if (mergeCommitRegex.exec(mergeCommitMessage)) {
      const mergeCommit = mergeCommitMessage.split(' ')[1]
      log(`    Fixing merge commit SHA ${commit} -> ${mergeCommit}`)
      commit = mergeCommit
    } else if (mergeCommitMessage === '') {
      log(
        '->  Issue detecting commit SHA. Please run actions/checkout with fetch-depth > 1 or set to 0',
      )
    }
  }

  return args.sha || commit
}

function _getSlug(inputs) {
  const { args, envs } = inputs
  return args.slug || envs.GITHUB_REPOSITORY
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
