const core = require('@actions/core');
const github = require('@actions/github');

const {version} = require('../package.json');

const context = github.context;

const isTrue = (variable) => {
  const lowercase = variable.toLowerCase();
  return (
    lowercase === '1' ||
    lowercase === 't' ||
    lowercase === 'true' ||
    lowercase === 'y' ||
    lowercase === 'yes'
  );
};

const buildExec = () => {
  const clean = core.getInput('move_coverage_to_trash');
  const commitParent = core.getInput('commit_parent');
  const curlAwsArgs = core.getInput('aws_curl_args');
  const curlCodecovArgs = core.getInput('codecov_curl_args');
  const envVars = core.getInput('env_vars');
  const failCi = isTrue(core.getInput('fail_ci_if_error'));
  const file = core.getInput('file');
  const files = core.getInput('files');
  const flags = core.getInput('flags');
  const functionalities = core.getInput('functionalities');
  const gcovArgs = core.getInput('gcov_args');
  const gcovDir = core.getInput('gcov_root_dir');
  const gcovExclude = core.getInput('gcov_path_exclude');
  const gcovExec = core.getInput('gcov_executable');
  const gcovInclude = core.getInput('gcov_path_include');
  const gcovPrefix = core.getInput('gcov_prefix');
  const name = core.getInput('name');
  const networkFilter = core.getInput('network_filter');
  const overrideBranch = core.getInput('override_branch');
  const overrideBuild = core.getInput('override_build');
  const overrideCommit = core.getInput('override_commit');
  const overridePr = core.getInput('override_pr');
  const overrideTag = core.getInput('override_tag');
  const rootDir = core.getInput('root_dir');
  const searchDir = core.getInput('directory');
  const token = core.getInput('token');
  const verbose = isTrue(core.getInput('verbose'));
  const workingDir = core.getInput('working-directory');
  const writePath = core.getInput('path_to_write_report');
  const xcodeDerivedData = core.getInput('xcode_derived_data');
  const xcodePackage = core.getInput('xcode_package');

  const filepath = workingDir ?
    workingDir + '/codecov' : 'codecov';

  const execArgs = [filepath];
  execArgs.push(
      '-n',
      `${name}`,
      '-F',
      `${flags}`,
      '-Q',
      `github-action-${version}`,
  );

  const options:any = {};
  options.env = Object.assign(process.env, {
    GITHUB_ACTION: process.env.GITHUB_ACTION,
    GITHUB_RUN_ID: process.env.GITHUB_RUN_ID,
    GITHUB_REF: process.env.GITHUB_REF,
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
    GITHUB_SHA: process.env.GITHUB_SHA,
    GITHUB_HEAD_REF: process.env.GITHUB_HEAD_REF || '',
  });

  const envVarsArg = [];
  for (const envVar of envVars.split(',')) {
    const envVarClean = envVar.trim();
    if (envVarClean) {
      options.env[envVarClean] = process.env[envVarClean];
      envVarsArg.push(envVarClean);
    }
  }

  if (token) {
    options.env.CODECOV_TOKEN = token;
  }
  if (clean) {
    execArgs.push('-c');
  }
  if (commitParent) {
    execArgs.push('-N', `${commitParent}`);
  }
  if (curlAwsArgs) {
    execArgs.push('-A', `${curlAwsArgs}`);
  }
  if (curlCodecovArgs) {
    execArgs.push('-U', `${curlCodecovArgs}`);
  }
  if (envVarsArg.length) {
    execArgs.push('-e', envVarsArg.join(','));
  }
  if (failCi) {
    execArgs.push('-Z');
  }
  if (file) {
    execArgs.push('-f', `${file}`);
  }
  if (files) {
    files.split(',').forEach((f) => {
      execArgs.push('-f', `${f}`);
    });
  }
  if (functionalities) {
    functionalities.split(',').forEach((f) => {
      execArgs.push('-X', `${f}`);
    });
  }
  if (gcovArgs) {
    execArgs.push('-a', `${gcovArgs}`);
  }
  if (gcovDir) {
    execArgs.push('-p', `${gcovDir}`);
  }
  if (gcovExclude) {
    execArgs.push('-g', `${gcovExclude}`);
  }
  if (gcovExec) {
    execArgs.push('-x', `${gcovExec}`);
  }
  if (gcovInclude) {
    execArgs.push('-G', `${gcovInclude}`);
  }
  if (gcovPrefix) {
    execArgs.push('-k', `${gcovPrefix}`);
  }
  if (networkFilter) {
    execArgs.push('-i', `${networkFilter}`);
  }
  if (overrideBranch) {
    execArgs.push('-B', `${overrideBranch}`);
  }
  if (overrideBuild) {
    execArgs.push('-b', `${overrideBuild}`);
  }
  if (overrideCommit) {
    execArgs.push('-C', `${overrideCommit}`);
  } else if (
    `${context.eventName}` == 'pull_request' ||
    `${context.eventName}` == 'pull_request_target'
  ) {
    execArgs.push('-C', `${context.payload.pull_request.head.sha}`);
  }
  if (overridePr) {
    execArgs.push('-P', `${overridePr}`);
  } else if (
    `${context.eventName}` == 'pull_request_target'
  ) {
    execArgs.push('-P', `${context.payload.number}`);
  }
  if (overrideTag) {
    execArgs.push('-T', `${overrideTag}`);
  }
  if (rootDir) {
    execArgs.push('-R', `${rootDir}`);
  }
  if (searchDir) {
    execArgs.push('-s', `${searchDir}`);
  }
  if (verbose) {
    execArgs.push('-v');
  }
  if (workingDir) {
    options.cwd = workingDir;
  }
  if (writePath) {
    execArgs.push('-q', `${writePath}`);
  }
  if (xcodeDerivedData) {
    execArgs.push('-D', `${xcodeDerivedData}`);
  }
  if (xcodePackage) {
    execArgs.push('-J', `${xcodePackage}`);
  }

  return {execArgs, options, failCi};
};

export default buildExec;
