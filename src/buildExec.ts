import * as core from '@actions/core';
import * as github from '@actions/github';

import {version} from '../package.json';

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
  const envVars = core.getInput('env_vars');
  const dryRun = isTrue(core.getInput('dry_run'));
  const failCi = isTrue(core.getInput('fail_ci_if_error'));
  const file = core.getInput('file');
  const files = core.getInput('files');
  const flags = core.getInput('flags');
  const functionalities = core.getInput('functionalities');
  const name = core.getInput('name');
  const overrideBranch = core.getInput('override_branch');
  const overrideBuild = core.getInput('override_build');
  const overrideCommit = core.getInput('override_commit');
  const overridePr = core.getInput('override_pr');
  const overrideTag = core.getInput('override_tag');
  const rootDir = core.getInput('root_dir');
  const searchDir = core.getInput('directory');
  const slug = core.getInput('slug');
  const token = core.getInput('token');
  const verbose = isTrue(core.getInput('verbose'));
  const url = core.getInput('url');
  const workingDir = core.getInput('working-directory');

  const execArgs = [];
  execArgs.push(
      '-n',
      `${name}`,
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
  if (dryRun) {
    execArgs.push('-d');
  }
  if (envVarsArg.length) {
    execArgs.push('-e', envVarsArg.join(','));
  }
  if (functionalities) {
    functionalities.split(',').forEach((f) => {
      execArgs.push('-X', `${f}`);
    });
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
  if (flags) {
    flags.split(',').forEach((f) => {
      execArgs.push('-F', `${f}`);
    });
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
  if (slug) {
    execArgs.push('-r', `${slug}`);
  }
  if (url) {
    execArgs.push('-u', `${url}`);
  }
  if (verbose) {
    execArgs.push('-v');
  }
  if (workingDir) {
    options.cwd = workingDir;
  }

  return {execArgs, options, failCi};
};

export default buildExec;
