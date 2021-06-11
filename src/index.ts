const core = require('@actions/core');
const exec = require('@actions/exec');

import buildExec from './buildExec';

const {execArgs, options, failCi} = buildExec();

exec.exec('bash', execArgs, options)
    .catch((err) => {
      if (failCi) {
        core.setFailed(
            `Codecov failed with the following error: ${err.message}`,
        );
      } else {
        core.warning(`Codecov warning: ${err.message}`);
      }
    });
