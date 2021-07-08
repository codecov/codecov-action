const fs = require('fs');

const core = require('@actions/core');
const exec = require('@actions/exec');
// const childProcess = require('child_process');
const https = require('https');

// import buildExec from './buildExec';

// const {failCi} = buildExec();

try {
  const url = 'https://uploader.codecov.io/latest/codecov-linux';
  const filename = __dirname + '/uploader';

  https.get(url, (res) => {
    // Image will be stored at this path
    const filePath = fs.createWriteStream(filename);
    res.pipe(filePath);
    filePath.on('finish', () => {
      filePath.close();
      // TODO - validate step
      fs.chmodSync(filename, '777');

      exec.exec(filename).catch((err) => {
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
// TODO - unlink file
