const childProcess = require('child_process')
const { log } = require('../helpers/logger')

function detect(envs) {
  return !!envs.SYSTEM_TEAMFOUNDATIONSERVERURI
}

function _getBuild(inputs) {
  const { args, envs } = inputs
  return args.build || envs.BUILD_BUILDNUMBER || ''
}

function _getBuildURL(inputs) {
  const { envs } = inputs
  if (envs.SYSTEM_TEAMPROJECT && envs.BUILD_BUILDID) {
    return encodeURIComponent(
      `${envs.SYSTEM_TEAMFOUNDATIONSERVERURI}${envs.SYSTEM_TEAMPROJECT}/_build/results?buildId=${envs.BUILD_BUILDID}`,
    )
  }
  return ''
}

function _getBranch(inputs) {
  const { args, envs } = inputs
  let branch = ''
  if (envs.BUILD_SOURCEBRANCH) {
    branch = envs.BUILD_SOURCEBRANCH.replace('refs/heads/', '')
  }
  return args.branch || branch
}

function _getJob(envs) {
  return envs.BUILD_BUILDID || ''
}

function _getPR(inputs) {
  const { args, envs } = inputs
  return (
    args.pr ||
    envs.SYSTEM_PULLREQUEST_PULLREQUESTNUMBER ||
    envs.SYSTEM_PULLREQUEST_PULLREQUESTID ||
    ''
  )
}

function _getService() {
  return 'azure_pipelines'
}

function getServiceName() {
  return 'Azure Pipelines'
}

function _getSHA(inputs) {
  const { args, envs } = inputs
  let commit = envs.BUILD_SOURCEVERSION

  if (_getPR(inputs)) {
    const mergeCommitRegex = /^[a-z0-9]{40} [a-z0-9]{40}$/
    const mergeCommitMessage = childProcess
      .execFileSync('git', ['show', '--no-patch', '--format="%P"'])
      .toString()
      .trimRight()
    if (mergeCommitRegex.exec(mergeCommitMessage)) {
      const mergeCommit = mergeCommitMessage.split(' ')[1]
      log(`    Fixing merge commit SHA ${commit} -> ${mergeCommit}`)
      commit = mergeCommit
    }
  }

  return args.sha || commit || ''
}

function _getProject(inputs) {
  const { envs } = inputs
  return envs.SYSTEM_TEAMPROJECT || ''
}

function _getServerURI(inputs) {
  const { envs } = inputs
  return envs.SYSTEM_TEAMFOUNDATIONSERVERURI
}

function _getSlug(inputs) {
  const { args } = inputs
  return args.slug || ''
}
/**
 * Generates and return the serviceParams object
 *
 * @param {args: {}, envs: {}} inputs an object of arguments and enviromental variable key/value pairs
 * @returns {{ branch: string, build: string, buildURL: string, commit: string, job: string, pr: string, service: string, slug: string }}
 */
function getServiceParams(inputs) {
  return {
    branch: _getBranch(inputs),
    build: _getBuild(inputs),
    buildURL: _getBuildURL(inputs),
    commit: _getSHA(inputs),
    job: _getJob(inputs.envs),
    pr: _getPR(inputs),
    project: _getProject(inputs),
    server_uri: _getServerURI(inputs),
    service: _getService(),
    slug: _getSlug(inputs),
  }
}

module.exports = {
  detect,
  getServiceName,
  getServiceParams,
}
