const core = require("@actions/core");
const exec = require("@actions/exec");
const request = require("request");
const fs = require("fs");

let fail_ci;
try {
  const name = core.getInput("name");
  const token = core.getInput("token");
  const flags = core.getInput("flags");
  const file = core.getInput("file");
  const yml = core.getInput("yml");
  fail_ci = core.getInput("fail_ci_if_error").toLowerCase();

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

  request("https://codecov.io/bash", (error, response, body) => {
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

      options.env = {
        CODECOV_TOKEN: `${token}`,
        GITHUB_ACTION: process.env.GITHUB_ACTION,
        GITHUB_REF: process.env.GITHUB_REF,
        GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
        GITHUB_SHA: process.env.GITHUB_SHA,
        GITHUB_HEAD_REF: process.env.GITHUB_HEAD_REF || ''
      };

      const execArgs = ["codecov.sh"];
      if (file) {
        execArgs.push(
          "-f", `${file}`
        );
      }

      execArgs.push(
        "-n", `${name}`,
        "-F", `${flags}`,
        "-y", `${yml}`
      );

      if (fail_ci) {
        execArgs.push(
          "-Z"
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
        });;

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
  });
} catch (error) {
  if (fail_ci) {
    core.setFailed(`Codecov failed with the following error: ${error.message}`);
  } else {
    core.warning(`Codecov warning: ${error.message}`);
  }
}
