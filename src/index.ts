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
  fs.access(filename, fs.constants.W_OK, (err) => {
    core.info(`${filename} ${err ? 'is not writable' : 'is writable'}`);
  });
  core.info(`filename: ${filename}`);

  https.get(getBaseUrl(platform, uploaderVersion), (res) => {
    const filePath = fs.createWriteStream(filename, {flags: 'w'});
    filePath
        .on('open', () => {
          if (fs.existsSync(filename)) {
            core.info('IT EXISTS open');
          } else {
            core.info('IT DOESNT EXIST open');
          }
          res.pipe(filePath);
          if (fs.existsSync(filename)) {
            core.info('IT EXISTS pipe');
          } else {
            core.info('IT DOESNT EXIST pipe');
          }
        }).on('error', (err) => {
          if (fs.existsSync(filename)) {
            core.info('IT EXISTS error');
          } else {
            core.info('IT DOESNT EXIST error');
          }
          setFailure(
              `Codecov:Failed to write uploader binary: ${err.message}\n${err}`,
              true,
          );
          core.info(`${console.trace()}`);
        }).on('finish', async () => {
          if (fs.existsSync(filename)) {
            core.info('IT EXISTS finish');
          } else {
            core.info('IT DOESNT EXIST finish');
          }
          filePath.close();
          if (fs.existsSync(filename)) {
            core.info('IT EXISTS close');
          } else {
            core.info('IT DOESNT EXIST close');
          }

          await verify(filename, platform, uploaderVersion, verbose, failCi);
          await versionInfo(platform, uploaderVersion);
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
