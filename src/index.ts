const fs = require('fs');
const https = require('https');

const core = require('@actions/core');
const exec = require('@actions/exec');

import buildExec from './buildExec';

try {
  const url = 'https://uploader.codecov.io/latest/codecov-linux';
  const filename = __dirname + '/uploader';
  const {execArgs, options} = buildExec();

  https.get(url, (res) => {
    // Image will be stored at this path
    const filePath = fs.createWriteStream(filename);
    core.setOutput('Writing uploader binary...');
    res.pipe(filePath);
    filePath
        .on('error', (err) => {
          core.setFailed(
              'Codecov: Failed to write uploader binary: ' +
              `${err.message}`,
          );
        }).on('finish', () => {
          filePath.close();
          core.setOutput('Uploader binary written.');
          // TODO - validate step
          fs.chmodSync(filename, '777');

          exec.exec(filename, execArgs, options).catch((err) => {
            core.setFailed(
                'Codecov: Failed to properly upload: ' +
                `${err.message}`,
            );
            return;
          });
        });
  });
} catch (err) {
  core.setFailed(
      `Codecov: Encountered an unexpected error: ${err.message}`,
  );
}
