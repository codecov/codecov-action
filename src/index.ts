const fs = require('fs');
const https = require('https');

const core = require('@actions/core');
const exec = require('@actions/exec');

import buildExec from './buildExec';

// const {failCi} = buildExec();

try {
  const url = 'https://uploader.codecov.io/latest/codecov-linux';
  const filename = __dirname + '/uploader';
  const {execArgs, options} = buildExec();

  https.get(url, (res) => {
    // Image will be stored at this path
    const filePath = fs.createWriteStream(filename);
    res.pipe(filePath);
    filePath.on('finish', () => {
      filePath.close();
      // TODO - validate step
      fs.chmodSync(filename, '777');

      exec.exec(filename, execArgs, options)
          .then(() => {
            console.log('finished');
          }).catch((err) => {
            core.setFailed(
                'Codecov: Failed to properly upload: ' +
                `${err.message}`,
            );
          });
    });
  });
} catch (err) {
  core.setFailed(
      `Codecov: Encountered an unexpected error: ${err.message}`,
  );
}
// TODO - unlink file
