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
      core.warning(error);
    }

    fs.writeFile("codecov.sh", body, err => {
      if (err && fail_ci) {
        throw err;
      } else if (err) {
        core.warning(err);
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
        GITHUB_SHA: process.env.GITHUB_SHA
      };

      if (file) {
        if (fail_ci) {
          exec
            .exec(
              "bash",
              [
                "codecov.sh",
                "-f",
                `${file}`,
                "-n",
                `${name}`,
                "-F",
                `${flags}`,
                "-y",
                `${yml}`,
                "-Z"
              ],
              options
            )
            .catch(err => {
              core.setFailed(
                `Codecov failed with the following error: ${err.message}`
              );
            })
            .then(() => {
              unlinkFile();
            });
        } else {
          exec
            .exec(
              "bash",
              [
                "codecov.sh",
                "-f",
                `${file}`,
                "-n",
                `${name}`,
                "-F",
                `${flags}`,
                "-y",
                `${yml}`
              ],
              options
            )
            .then(() => {
              unlinkFile();
            });
        }
      } else {
        if (fail_ci) {
          exec
            .exec(
              "bash",
              [
                "codecov.sh",
                "-n",
                `${name}`,
                "-F",
                `${flags}`,
                "-y",
                `${yml}`,
                "-Z"
              ],
              options
            )
            .catch(err => {
              core.setFailed(
                `Codecov failed with the following error: ${err.message}`
              );
            })
            .then(() => {
              unlinkFile();
            });
        } else {
          exec
            .exec(
              "bash",
              ["codecov.sh", "-n", `${name}`, "-F", `${flags}`, "-y", `${yml}`],
              options
            )
            .then(() => {
              unlinkFile();
            });
        }
      }

      const unlinkFile = () => {
        fs.unlink("codecov.sh", err => {
          if (err && fail_ci) {
            throw err;
          } else if (err) {
            core.warning(err);
          }
        });
      };
    });
  });
} catch (error) {
  if (fail_ci) {
    core.setFailed(error.message);
  } else {
    core.warning(error.message);
  }
}
