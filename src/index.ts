const core = require('@actions/core');
const exec = require('@actions/exec');

const uploader = require('../uploader/bin/codecov');

import buildExec from './buildExec';

// const {failCi} = buildExec();

try {
  const {execArgs} = buildExec();
  exec.exec(uploader, execArgs)
      .catch((err) => {
        core.setFailed(
            `Codecov: Encountered an unexpected error: ${err.message}`,
        );
      });
} catch (err) {
  core.setFailed(
      `Codecov: Encountered an unexpected error: ${err.message}`,
  );
}
