import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

import * as exec from '@actions/exec';

import buildExec from './buildExec';
import {
  BASEURL,
  getPlatform,
  getUploaderName,
  isValidPlatform,
  setFailure,
} from './helpers';

import verify from './validate';

let failCi;

try {
  const {execArgs, options, failCi} = buildExec();
  const platform = getPlatform();
  if (!isValidPlatform()) {
    setFailure(
        `Codecov: Encountered an unexpected platform: ${platform}`,
        failCi,
    );
  }
  const filename = path.join( __dirname, getUploaderName());
  https.get(BASEURL, (res) => {
    // Image will be stored at this path
    const filePath = fs.createWriteStream(filename);
    res.pipe(filePath);
    filePath
        .on('error', (err) => {
          setFailure(
              `Codecov: Failed to write uploader binary: ${err.message}`,
              true,
          );
        }).on('finish', async () => {
          filePath.close();

          await verify(filename);
          await fs.chmodSync(filename, '777');

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
