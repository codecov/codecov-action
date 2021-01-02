const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs");
const request = require('requestretry');

import buildExec from "./buildExec";

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
