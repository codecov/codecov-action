const fs = require('fs');

const core = require('@actions/core');
// const exec = require('@actions/exec');
const childProcess = require('child_process');

const request = require('request');

// import buildExec from './buildExec';

// const {failCi} = buildExec();

try {
  const filename = __dirname + '/uploader';
  request.get('https://uploader.codecov.io/latest/codecov-linux', (err, res, body) => {
    if (err) {
      core.setFailed(
          'Codecov: Could not properly download uploader binary: ' +
          `${err.message}`,
      );
      return;
    }

    console.log(body);
    fs.writeFileSync(filename, body);
    fs.chmodSync(filename, '777');

    try {
      childProcess.execFileSync(filename);
      console.log('finished!');
    } catch (err) {
      core.setFailed(
          'Codecov: Failed to properly upload: ' +
          `${err.message}`,
      );
      return;
    };
  });
} catch (err) {
  core.setFailed(
      `Codecov: Encountered an unexpected error: ${err.message}`,
  );
}
