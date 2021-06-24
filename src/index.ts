const core = require('@actions/core');
const exec = require('@actions/exec');

import buildExec from './buildExec';

const {failCi} = buildExec();

exec.exec('bash', ['bash/linux', '-c'])
    .then(() => {
      exec.exec(__dirname + 'codecov-linux')
          .catch((err) => {
            if (failCi) {
              core.setFailed(
                  `Codecov failed with the following error: ${err.message}`,
              );
            } else {
              core.warning(`Codecov warning: ${err.message}`);
            }
          });
    })
    .catch((err) => {
      core.setFailed(
          `Codecov failed with the following error: ${err.message}`,
      );
    });
