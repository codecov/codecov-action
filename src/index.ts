const fs = require('fs');
const https = require('https');

const core = require('@actions/core');
const exec = require('@actions/exec');

import buildExec from './buildExec';

let failCi;
const setFailure = (message, failCi) => {
   failCi ? core.setFailed(message) : core.warning(message);
};

try {
  const {execArgs, options, failCi, platform} = buildExec();
  const PLATFORMS = ['alpine', 'linux', 'macos', 'windows'];
  if (!PLATFORMS.includes(platform)) {
    setFailure(
        `Codecov: Encountered an unexpected platform: ${platform}`,
        failCi,
    );
  }
  const url = `https://uploader.codecov.io/latest/codecov-${platform}`;
  const filename = __dirname + '/uploader';

  https.get(url, (res) => {
    // Image will be stored at this path
    const filePath = fs.createWriteStream(filename);
    res.pipe(filePath);
    filePath
        .on('error', (err) => {
          setFailure(
              `Codecov: Failed to write uploader binary: ${err.message}`,
              failCi,
          );
        }).on('finish', () => {
          filePath.close();
          core.info('Uploader binary written.');

          // TODO - validate step

          fs.chmodSync(filename, '777');
          exec.exec(filename, execArgs, options)
              .catch((err) => {
                setFailure(
                    `Codecov: Failed to properly upload: ${err.message}`,
                    failCi,
                );
              }).then(() => {
                unlink();
              });

          const unlink = () => {
            fs.unlink(filename, (err) => {
              if (err) {
                setFailure(
                    `Codecov: Could not unlink uploader: ${err.message}`,
                    failCi,
                );
              }
            });
          };
        });
  });
} catch (err) {
  setFailure(`Codecov: Encountered an unexpected error ${err.message}`, failCi);
}
