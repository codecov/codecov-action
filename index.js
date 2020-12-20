const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs");
const request = require('requestretry');

let fail_ci;
let verbose;
try {
  const name = core.getInput("name");
  const token = core.getInput("token");
  const flags = core.getInput("flags");
  const file = core.getInput("file");
  const files = core.getInput("files");
  const env_vars = core.getInput("env_vars");
  const dir = core.getInput("directory");
  const write_path = core.getInput("path_to_write_report");
  const working_dir = core.getInput("working-directory");
  const xcode_derived_data = core.getInput("xcode_derived_data");
  const xcode_package = core.getInput("xcode_package");

  fail_ci = core.getInput("fail_ci_if_error").toLowerCase();
  verbose = core.getInput("verbose").toLowerCase();

  if (
    fail_ci === "yes" ||
    fail_ci === "y" ||
    fail_ci === "true" ||
    fail_ci === "t" ||
    fail_ci === "1"
  ) {
    fail_ci = true;
  } else {
    fail_ci = false;
  }

  if (
    verbose === "yes" ||
    verbose === "y" ||
    verbose === "true" ||
    verbose === "t" ||
    verbose === "1"
  ) {
    verbose = true;
  } else {
    verbose = false;
  }

  request({
    json: false,
    maxAttempts: 10,
    timeout: 3000,
    url: "https://codecov.io/bash"
  }, (error, response, body) => {
    try {
      if (error && fail_ci) {
        throw error;
      } else if (error) {
        core.warning(`Codecov warning: ${error.message}`);
      }

      fs.writeFile("codecov.sh", body, err => {
        if (err && fail_ci) {
          throw err;
        } else if (err) {
          core.warning(`Codecov warning: ${err.message}`);
        }

        let output = "";
        let execError = "";
        const options = {};
        options.listeners = {
          stdout: data => {
            output += data.toString();
          },
          stderr: data => {
            execError += data.toString();
          }
        };

        options.env = Object.assign(process.env, {
          GITHUB_ACTION: process.env.GITHUB_ACTION,
          GITHUB_RUN_ID: process.env.GITHUB_RUN_ID,
          GITHUB_REF: process.env.GITHUB_REF,
          GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
          GITHUB_SHA: process.env.GITHUB_SHA,
          GITHUB_HEAD_REF: process.env.GITHUB_HEAD_REF || ''
        });

        if(token){
          options.env.CODECOV_TOKEN = token
        }

        const env_vars_arg = []
        for (let env_var of env_vars.split(",")) {
          let env_var_clean = env_var.trim();
          if (env_var_clean) {
            options.env[env_var_clean] = process.env[env_var_clean];
            env_vars_arg.push(env_var_clean)
          }
        }

        const execArgs = ["codecov.sh"];
        execArgs.push("-Q", "github-action");

        if (file) {
          execArgs.push(
            "-f", `${file}`
          );
        }

        if (files) {
          files.split(',').forEach(f => {
            execArgs.push(
              "-f", `${f}`
            );
          });
        }

        if (dir) {
          execArgs.push(
            "-s", `${dir}`
          );
        }

        execArgs.push(
          "-n", `${name}`,
          "-F", `${flags}`
        );

        if (fail_ci) {
          execArgs.push(
            "-Z"
          );
        }

        if (env_vars_arg.length) {
          execArgs.push(
            "-e", env_vars_arg.join(",")
          );
        }

        if (write_path) {
          execArgs.push(
            "-q", `${write_path}`
          );
        }

        if (verbose) {
          execArgs.push(
            "-v"
          );
        }

        if (working_dir) {
          options.cwd = working_dir;
        }

        if (xcode_derived_data) {
          execArgs.push(
            "-D", `${xcode_derived_data}`
          );
        }

        if (xcode_package) {
          execArgs.push(
            "-J", `${xcode_package}`
          );
        }

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
          fs.unlink("codecov.sh", err => {
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
