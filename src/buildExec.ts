/* eslint-disable  @typescript-eslint/no-explicit-any */

import * as core from '@actions/core';
import * as github from '@actions/github';


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


const buildCommitExec = () => {
  const commitParent = core.getInput('commit_parent');
  const overrideBranch = core.getInput('override_branch');
  const overrideCommit = core.getInput('override_commit');
  const overridePr = core.getInput('override_pr');
  const slug = core.getInput('slug');
  const token = core.getInput('token');
  const failCi = isTrue(core.getInput('fail_ci_if_error'));
  const workingDir = core.getInput('working-directory');

  const commitCommand = 'create-commit';
  const commitExecArgs = [];

  const commitOptions:any = {};
  commitOptions.env = Object.assign(process.env, {
    GITHUB_ACTION: process.env.GITHUB_ACTION,
    GITHUB_RUN_ID: process.env.GITHUB_RUN_ID,
    GITHUB_REF: process.env.GITHUB_REF,
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
    GITHUB_SHA: process.env.GITHUB_SHA,
    GITHUB_HEAD_REF: process.env.GITHUB_HEAD_REF || '',
  });


  if (token) {
    commitOptions.env.CODECOV_TOKEN = token;
  }
  if (commitParent) {
    commitExecArgs.push('--parent-sha', `${commitParent}`);
  }

  if (overrideBranch) {
    commitExecArgs.push('-B', `${overrideBranch}`);
  }
  if (overrideCommit) {
    commitExecArgs.push('-C', `${overrideCommit}`);
  } else if (
    `${context.eventName}` == 'pull_request' ||
    `${context.eventName}` == 'pull_request_target'
  ) {
    commitExecArgs.push('-C', `${context.payload.pull_request.head.sha}`);
  }
  if (overridePr) {
    commitExecArgs.push('--pr', `${overridePr}`);
  } else if (
    `${context.eventName}` == 'pull_request_target'
  ) {
    commitExecArgs.push('--pr', `${context.payload.number}`);
  }
  if (slug) {
    commitExecArgs.push('--slug', `${slug}`);
  }
  if (failCi) {
    commitExecArgs.push('-Z');
  }
  if (workingDir) {
    commitOptions.cwd = workingDir;
  }


  return {commitExecArgs, commitOptions, commitCommand};
};

const buildGeneralExec = () => {
  const codecovYmlPath = core.getInput('codecov_yml_path');
  const url = core.getInput('url');
  const verbose = isTrue(core.getInput('verbose'));
  const args = [];

  if (codecovYmlPath) {
    args.push('--codecov-yml-path', `${codecovYmlPath}`);
  }
  if (url) {
    args.push('--enterprise-url', `${url}`);
  }
  if (verbose) {
    args.push('-v');
  }
  return {args, verbose};
};

const buildReportExec = () => {
  const overrideCommit = core.getInput('override_commit');
  const overridePr = core.getInput('override_pr');
  const slug = core.getInput('slug');
  const token = core.getInput('token');
  const failCi = isTrue(core.getInput('fail_ci_if_error'));
  const workingDir = core.getInput('working-directory');


  const reportCommand = 'create-report';
  const reportExecArgs = [];

  const reportOptions:any = {};
  reportOptions.env = Object.assign(process.env, {
    GITHUB_ACTION: process.env.GITHUB_ACTION,
    GITHUB_RUN_ID: process.env.GITHUB_RUN_ID,
    GITHUB_REF: process.env.GITHUB_REF,
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
    GITHUB_SHA: process.env.GITHUB_SHA,
    GITHUB_HEAD_REF: process.env.GITHUB_HEAD_REF || '',
  });


  if (token) {
    reportOptions.env.CODECOV_TOKEN = token;
  }
  if (overrideCommit) {
    reportExecArgs.push('-C', `${overrideCommit}`);
  } else if (
    `${context.eventName}` == 'pull_request' ||
    `${context.eventName}` == 'pull_request_target'
  ) {
    reportExecArgs.push('-C', `${context.payload.pull_request.head.sha}`);
  }
  if (overridePr) {
    reportExecArgs.push('-P', `${overridePr}`);
  } else if (
    `${context.eventName}` == 'pull_request_target'
  ) {
    reportExecArgs.push('-P', `${context.payload.number}`);
  }
  if (slug) {
    reportExecArgs.push('--slug', `${slug}`);
  }
  if (failCi) {
    reportExecArgs.push('-Z');
  }
  if (workingDir) {
    reportOptions.cwd = workingDir;
  }

  return {reportExecArgs, reportOptions, reportCommand};
};

const buildUploadExec = () => {
  const disableFileFixes = isTrue(core.getInput('disable_file_fixes'));
  const disableSearch = isTrue(core.getInput('disable_search'));
  const dryRun = isTrue(core.getInput('dry_run'));
  const envVars = core.getInput('env_vars');
  const exclude = core.getInput('exclude');
  const failCi = isTrue(core.getInput('fail_ci_if_error'));
  const file = core.getInput('file');
  const files = core.getInput('files');
  const flags = core.getInput('flags');
  const handleNoReportsFound = isTrue(core.getInput('handle_no_reports_found'));
  const jobCode = core.getInput('job_code');
  const name = core.getInput('name');
  const os = core.getInput('os');
  const overrideBranch = core.getInput('override_branch');
  const overrideBuild = core.getInput('override_build');
  const overrideBuildUrl = core.getInput('override_build_url');
  const overrideCommit = core.getInput('override_commit');
  const overridePr = core.getInput('override_pr');
  const plugin = core.getInput('plugin');
  const plugins = core.getInput('plugins');
  const reportCode = core.getInput('report_code');
  const rootDir = core.getInput('root_dir');
  const searchDir = core.getInput('directory');
  const slug = core.getInput('slug');
  const token = core.getInput('token');
  let uploaderVersion = core.getInput('version');
  const useLegacyUploadEndpoint = isTrue(
      core.getInput('use_legacy_upload_endpoint'),
  );
  const workingDir = core.getInput('working-directory');

  const uploadExecArgs = [];
  const uploadCommand = 'do-upload';
  const uploadOptions:any = {};
  uploadOptions.env = Object.assign(process.env, {
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
      uploadOptions.env[envVarClean] = process.env[envVarClean];
      envVarsArg.push(envVarClean);
    }
  }
  if (token) {
    uploadOptions.env.CODECOV_TOKEN = token;
  }
  if (disableFileFixes) {
    uploadExecArgs.push('--disable-file-fixes');
  }
  if (disableSearch) {
    uploadExecArgs.push('--disable-search');
  }
  if (dryRun) {
    uploadExecArgs.push('-d');
  }
  if (envVarsArg.length) {
    uploadExecArgs.push('-e', envVarsArg.join(','));
  }
  if (exclude) {
    uploadExecArgs.push('--exclude', `${exclude}`);
  }
  if (failCi) {
    uploadExecArgs.push('-Z');
  }
  if (file) {
    uploadExecArgs.push('-f', `${file}`);
  }
  if (files) {
    files.split(',').map((f) => f.trim()).forEach((f) => {
      uploadExecArgs.push('-f', `${f}`);
    });
  }
  if (flags) {
    flags.split(',').map((f) => f.trim()).forEach((f) => {
      uploadExecArgs.push('-F', `${f}`);
    });
  }
  if (handleNoReportsFound) {
    uploadExecArgs.push('--handle-no-reports-found');
  }
  if (jobCode) {
    uploadExecArgs.push('--job-code', `${jobCode}`);
  }
  if (name) {
    uploadExecArgs.push('-n', `${name}`);
  }
  if (overrideBranch) {
    uploadExecArgs.push('-B', `${overrideBranch}`);
  }
  if (overrideBuild) {
    uploadExecArgs.push('-b', `${overrideBuild}`);
  }
  if (overrideBuildUrl) {
    uploadExecArgs.push('--build-url', `${overrideBuildUrl}`);
  }
  if (overrideCommit) {
    uploadExecArgs.push('-C', `${overrideCommit}`);
  } else if (
    `${context.eventName}` == 'pull_request' ||
    `${context.eventName}` == 'pull_request_target'
  ) {
    uploadExecArgs.push('-C', `${context.payload.pull_request.head.sha}`);
  }
  if (overridePr) {
    uploadExecArgs.push('-P', `${overridePr}`);
  } else if (
    `${context.eventName}` == 'pull_request_target'
  ) {
    uploadExecArgs.push('-P', `${context.payload.number}`);
  }
  if (plugin) {
    uploadExecArgs.push('--plugin', `${plugin}`);
  }
  if (plugins) {
    plugins.split(',').map((p) => p.trim()).forEach((p) => {
      uploadExecArgs.push('--plugin', `${p}`);
    });
  }
  if (reportCode) {
    uploadExecArgs.push('--report-code', `${reportCode}`);
  }
  if (rootDir) {
    uploadExecArgs.push('--network-root-folder', `${rootDir}`);
  }
  if (searchDir) {
    uploadExecArgs.push('-s', `${searchDir}`);
  }
  if (slug) {
    uploadExecArgs.push('-r', `${slug}`);
  }
  if (workingDir) {
    uploadOptions.cwd = workingDir;
  }
  if (uploaderVersion == '') {
    uploaderVersion = 'latest';
  }
  if (useLegacyUploadEndpoint) {
    uploadExecArgs.push('--legacy');
  }

  return {
    uploadExecArgs,
    uploadOptions,
    failCi,
    os,
    uploaderVersion,
    uploadCommand,
  };
};


export {
  buildCommitExec,
  buildGeneralExec,
  buildReportExec,
  buildUploadExec,
};
