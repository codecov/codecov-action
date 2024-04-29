import * as fs from 'node:fs';
import * as https from 'node:https';
import * as path from 'node:path';

import * as exec from '@actions/exec';

import {
  buildCommitExec,
  buildGeneralExec,
  buildReportExec,
  buildUploadExec,
} from './buildExec';
import {
  getBaseUrl,
  getCommand,
  getPlatform,
  getUploaderName,
  setFailure,
  setSafeDirectory,
} from './helpers';

import verify from './validate';
import versionInfo from './version';

let failCi;

const run = async (): Promise<void> => {
  try {
    const {commitExecArgs, commitOptions, commitCommand} = await buildCommitExec();
    const {reportExecArgs, reportOptions, reportCommand} = await buildReportExec();
    const {
      uploadExecArgs,
      uploadOptions,
      disableSafeDirectory,
      failCi,
      os,
      uploaderVersion,
      uploadCommand,
    } = await buildUploadExec();
    const {args, verbose} = buildGeneralExec();

    const platform = getPlatform(os);

    const filename = path.join( __dirname, getUploaderName(platform));
    https.get(getBaseUrl(platform, uploaderVersion), (res) => {
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

            await verify(filename, platform, uploaderVersion, verbose, failCi);
            await versionInfo(platform, uploaderVersion);
            await fs.chmodSync(filename, '777');
            if (!disableSafeDirectory) {
              await setSafeDirectory();
            }

            const unlink = (): void => {
              fs.unlink(filename, (err) => {
                if (err) {
                  setFailure(
                      `Codecov: Could not unlink uploader: ${err.message}`,
                      failCi,
                  );
                }
              });
            };
            const doUpload = async (): Promise<void> => {
              await exec.exec(getCommand(filename, args, uploadCommand).join(' '),
                  uploadExecArgs,
                  uploadOptions)
                  .catch((err) => {
                    setFailure(
                        `Codecov:
                        Failed to properly upload report: ${err.message}`,
                        failCi,
                    );
                  });
            };
            const createReport = async (): Promise<void> => {
              await exec.exec(
                  getCommand(filename, args, reportCommand).join(' '),
                  reportExecArgs,
                  reportOptions)
                  .then(async (exitCode) => {
                    if (exitCode == 0) {
                      await doUpload();
                    }
                  }).catch((err) => {
                    setFailure(
                        `Codecov:
                        Failed to properly create report: ${err.message}`,
                        failCi,
                    );
                  });
            };
            await exec.exec(
                getCommand(
                    filename,
                    args,
                    commitCommand,
                ).join(' '),
                commitExecArgs, commitOptions)
                .then(async (exitCode) => {
                  if (exitCode == 0) {
                    await createReport();
                  }
                  unlink();
                }).catch((err) => {
                  setFailure(
                      `Codecov: Failed to properly create commit: ${err.message}`,
                      failCi,
                  );
                });
          });
    });
  } catch (err) {
    setFailure(`Codecov: Encountered an unexpected error ${err.message}`, failCi);
  }
};

run();
