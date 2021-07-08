const core = require('@actions/core');

const uploader = require('../uploader/src/index');

import buildExec from './buildExec';

// const {failCi} = buildExec();

try {
  const {execArgs, options} = buildExec();
  console.log(execArgs);
  uploader
      .main(execArgs, options)
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
