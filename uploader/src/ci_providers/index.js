const providerAppveyorci = require('./provider_appveyorci')
const providerAzurepipelines = require('./provider_azurepipelines')
const providerBitbucket = require('./provider_bitbucket')
const providerBuildkite = require('./provider_buildkite')
const providerCircleci = require('./provider_circleci')
const providerDrone = require('./provider_drone')
const providerGitHubactions = require('./provider_githubactions')
const providerGitLabci = require('./provider_gitlabci')
const providerJenkinsci = require('./provider_jenkinsci')
const providerLocal = require('./provider_local')
const providerTravisci = require('./provider_travisci')

// Please make sure provider_local is last
const providers = [
  providerAppveyorci,
  providerAzurepipelines,
  providerBitbucket,
  providerBuildkite,
  providerCircleci,
  providerDrone,
  providerGitHubactions,
  providerGitLabci,
  providerJenkinsci,
  providerTravisci,
  providerLocal,
]

module.exports = providers
