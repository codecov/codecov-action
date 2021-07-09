const core = require('@actions/core');
const exec = require('@actions/exec');

import buildExec from './buildExec';

// const {failCi} = buildExec();

try {
  const {execArgs} = buildExec();
  exec.exec('node', ['../uploader/bin/codecov', execArgs])
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
