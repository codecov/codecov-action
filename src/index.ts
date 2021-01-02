const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs");
const request = require('requestretry');

let isTrue = (variable) => {
  const lowercase = variable.toLowerCase();
  return (
    lowercase === "1" ||
    lowercase === "t" ||
    lowercase === "true" ||
    lowercase === "y" ||
    lowercase === "yes"
  );
}

let buildExec = () => {
  const clean = core.getInput("move_coverage_to_trash");
  const commit_parent = core.getInput("commit_parent");
  const curl_aws_args = core.getInput("aws_curl_args");
  const curl_codecov_args = core.getInput("codecov_curl_args");
  const env_vars = core.getInput("env_vars");
  const fail_ci = isTrue(core.getInput("fail_ci_if_error"));
  const file = core.getInput("file");
  const files = core.getInput("files");
  const flags = core.getInput("flags");
  const functionalities = core.getInput("functionalities");
  const gcov_args = core.getInput("gcov_args");
  const gcov_dir = core.getInput("gcov_root_dir");
  const gcov_exclude = core.getInput("gcov_path_exclude");
  const gcov_exec = core.getInput("gcov_executable");
  const gcov_include = core.getInput("gcov_path_include");
  const gcov_prefix = core.getInput("gcov_prefix");
  const name = core.getInput("name");
  const override_branch = core.getInput("override_branch");
  const override_build = core.getInput("override_build");
  const override_commit = core.getInput("override_commit");
  const override_pr = core.getInput("override_pr");
  const override_tag = core.getInput("override_tag");
  const root_dir = core.getInput("root_dir");
  const search_dir = core.getInput("directory");
  const token = core.getInput("token");
  const verbose = isTrue(core.getInput("verbose"));
  const working_dir = core.getInput("working_directory");
  const write_path = core.getInput("path_to_write_report");
  const xcode_derived_data = core.getInput("xcode_derived_data");
  const xcode_package = core.getInput("xcode_package");

  const filepath = working_dir ?
    working_dir + "/codecov.sh" : "codecov.sh"

  const execArgs = [filepath];
  execArgs.push( "-n", `${name}`, "-F", `${flags}`, "-Q", "github-action" );

  const options:any = {};
  options.env = Object.assign(process.env, {
    GITHUB_ACTION: process.env.GITHUB_ACTION,
    GITHUB_RUN_ID: process.env.GITHUB_RUN_ID,
    GITHUB_REF: process.env.GITHUB_REF,
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
    GITHUB_SHA: process.env.GITHUB_SHA,
    GITHUB_HEAD_REF: process.env.GITHUB_HEAD_REF || ''
  });

  const env_vars_arg = []
  for (let env_var of env_vars.split(",")) {
    let env_var_clean = env_var.trim();
    if (env_var_clean) {
      options.env[env_var_clean] = process.env[env_var_clean];
      env_vars_arg.push(env_var_clean)
    }
  }

  if (token) { options.env.CODECOV_TOKEN = token }
  if (clean) { execArgs.push("-c"); }
  if (commit_parent) { execArgs.push("-N", `${commit_parent}`); }
  if (curl_aws_args) { execArgs.push("-A", `${curl_aws_args}`); }
  if (curl_codecov_args) { execArgs.push("-U", `${curl_codecov_args}`); }
  if (env_vars_arg.length) { execArgs.push("-e", env_vars_arg.join(",")); }
  if (fail_ci) { execArgs.push("-Z"); }
  if (file) { execArgs.push("-f", `${file}`); }
  if (files) { files.split(',').forEach(f => { execArgs.push("-f", `${f}`); }); }
  if (functionalities) { functionalities.split(',').forEach(f => { execArgs.push("-X", `${f}`); }); }
  if (gcov_args) { execArgs.push("-a", `${gcov_args}`); }
  if (gcov_dir) { execArgs.push("-p", `${gcov_dir}`); }
  if (gcov_exclude) { execArgs.push("-g", `${gcov_exclude}`); }
  if (gcov_exec) { execArgs.push("-x", `${gcov_exec}`); }
  if (gcov_include) { execArgs.push("-G", `${gcov_include}`); }
  if (gcov_prefix) { execArgs.push("-k", `${gcov_prefix}`); }
  if (override_branch) { execArgs.push("-B", `${override_branch}`); }
  if (override_build) { execArgs.push("-b", `${override_build}`); }
  if (override_commit) { execArgs.push("-C", `${override_commit}`); }
  if (override_pr) { execArgs.push("-P", `${override_pr}`); }
  if (override_tag) { execArgs.push("-T", `${override_tag}`); }
  if (root_dir) { execArgs.push("-N", `${root_dir}`); }
  if (search_dir) { execArgs.push("-s", `${search_dir}`); }
  if (verbose) { execArgs.push("-v"); }
  if (working_dir) { options.cwd = working_dir; }
  if (write_path) { execArgs.push("-q", `${write_path}`); }
  if (xcode_derived_data) { execArgs.push("-D", `${xcode_derived_data}`); }
  if (xcode_package) { execArgs.push("-J", `${xcode_package}`); }

  return { execArgs, options, filepath, fail_ci };
}

let fail_ci;
try {
  request({
    json: false,
    maxAttempts: 10,
    timeout: 3000,
    url: "https://codecov.io/bash"
  }, (error, response, body) => {
    let { execArgs, options, filepath, fail_ci } = buildExec();

    try {
      if (error && fail_ci) {
        throw error;
      } else if (error) {
        core.warning(`Codecov warning: ${error.message}`);
      }

      fs.writeFile(filepath, body, err => {
        if (err && fail_ci) {
          throw err;
        } else if (err) {
          core.warning(`Codecov warning: ${err.message}`);
        }

        let output = "";
        let execError = "";
        options.listeners = {
          stdout: data => {
            output += data.toString();
          },
          stderr: data => {
            execError += data.toString();
          }
        };

        exec.exec("bash", execArgs, options)
          .catch(err => {
            if (fail_ci) {
              core.setFailed(
                `Codecov failed with the following error: ${err.message}`
              );
            } else {
              core.warning(`Codecov warning: ${err.message}`);
            }
          })
          .then(() => {
            unlinkFile();
          });

        const unlinkFile = () => {
          fs.unlink(filepath, err => {
            if (err && fail_ci) {
              throw err;
            } else if (err) {
              core.warning(`Codecov warning: ${err.message}`);
            }
          });
        };
      });
    } catch (error) {
      core.setFailed(
        `Codecov failed with the following error: ${error.message}`
      );
    }
  });
} catch (error) {
  if (fail_ci) {
    core.setFailed(`Codecov failed with the following error: ${error.message}`);
  } else {
    core.warning(`Codecov warning: ${error.message}`);
  }
}

export { buildExec };
