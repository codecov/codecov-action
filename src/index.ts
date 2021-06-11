const core = require('@actions/core');
const exec = require('@actions/exec');

const fs = require('fs');

import buildExec from './buildExec';

const codecovScript = fs.readFileSync(__dirname + '/codecov');

let failCi;
try {
  const {execArgs, options, filepath, failCi} = buildExec();

  fs.writeFile(filepath, codecovScript, (err) => {
    if (err && failCi) {
      throw err;
    } else if (err) {
      core.warning(`Codecov warning: ${err.message}`);
    }

    exec.exec('bash', execArgs, options)
        .catch((err) => {
          console.log(err);
          if (failCi) {
            core.setFailed(
                `Codecov failed with the following error: ${err.message}`,
            );
          } else {
            core.warning(`Codecov warning: ${err.message}`);
          }
        })
        .then((status) => {
          console.log(status);
          unlinkFile();
        });

    const unlinkFile = () => {
      fs.unlink(filepath, (err) => {
        if (err && failCi) {
          throw err;
        } else if (err) {
          core.warning(`Codecov warning: ${err.message}`);
        }
      });
    };
  });
} catch (error) {
  if (failCi) {
    core.setFailed(`Codecov failed with the following error: ${error.message}`);
  } else {
    core.warning(`Codecov warning: ${error.message}`);
  }
}
