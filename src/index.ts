import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

import * as core from '@actions/core';
import * as exec from '@actions/exec';

import buildExec from './buildExec';
import {
  getBaseUrl,
  getPlatform,
  getUploaderName,
  setFailure,
} from './helpers';

import verify from './validate';
import versionInfo from './version';

let failCi;

try {
  const {execArgs, options, failCi, os, uploaderVersion, verbose} = buildExec();
  const platform = getPlatform(os);

  const filename = path.join( __dirname, getUploaderName(platform));
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

  const downloadUploader = (retries) => {
    const filePath = fs.createWriteStream(filename, {flags: 'w'});
    https.get(getBaseUrl(platform, uploaderVersion), (res) => {
      res.pipe(filePath);
    });
    filePath
        .on('error', (err) => {
          const errMessage = `${err.message}\n${console.trace()}`;
          if (retries == 0) {
            core.info(`retries: ${retries}`);
            setFailure(
                `Codecov:Failed to write uploader binary: ${errMessage}`,
                true,
            );
          } else {
            core.info(`Failed to write uploader: ${errMessage}`);
            core.info(`  Trying ${retries} more times`);
            filePath.close();
            downloadUploader(retries - 1);
          }
        }).on('finish', async () => {
          filePath.close();
          await verify(filename, platform, uploaderVersion, verbose, failCi);
          await versionInfo(platform, uploaderVersion);
          await fs.chmodSync(filename, '777');

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
  };

  const retries = 3;
  downloadUploader(retries);
} catch (err) {
  setFailure(`Codecov: Encountered an unexpected error ${err.message}`, failCi);
}
