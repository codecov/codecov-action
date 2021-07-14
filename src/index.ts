import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

const core = require('@actions/core');
const exec = require('@actions/exec');

import buildExec from './buildExec';

let failCi;
const setFailure = (message, failCi) => {
   failCi ? core.setFailed(message) : core.warning(message);
};
const isWindows = (platform) => {
  return platform === 'windows';
};
const PLATFORMS = ['alpine', 'linux', 'macos', 'windows'];

try {
  const {execArgs, options, failCi, platform} = buildExec();
  if (!PLATFORMS.includes(platform)) {
    setFailure(
        `Codecov: Encountered an unexpected platform: ${platform}`,
        failCi,
    );
    process.exit();
  }
  const url = `https://uploader.codecov.io/latest/codecov-${platform}${isWindows(platform) ? '.exe' : ''}`;
  const filename = path.join(
      __dirname,
      `uploader${isWindows(platform) ? '.exe' : ''}`,
  );

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
        }).on('finish', async () => {
          filePath.close();
          core.info('Uploader binary written.');

          // TODO - validate step

          fs.chmodSync(filename, '777');

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
          await exec.exec(filename, execArgs, options)
              .catch((err) => {
                setFailure(
                    `Codecov: Failed to properly upload: ${err.message}`,
                    failCi,
                );
              }).then(() => {
                unlink();
              });
        });
  });
} catch (err) {
  setFailure(`Codecov: Encountered an unexpected error ${err.message}`, failCi);
}
