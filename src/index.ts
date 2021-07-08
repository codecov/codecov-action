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
    }
    fs.writeFileSync(filename, body);
    fs.chmodSync(filename, '777');
    if (fs.existsSync(filename)) {
      console.log('file exists');
    } else {
      console.log('file does not exist');
    }
    console.log(fs.statSync(filename));

    childProcess.execFile(filename)
        .catch((err) => {
          core.setFailed(
              `Codecov failed with the following error: ${err.message}`,
          );
        })
        .then(() => {
          console.log('finished!');
        });
  });
} catch (err) {
  core.setFailed(
      `Codecov: Encountered an unexpected error: ${err.message}`,
  );
}
