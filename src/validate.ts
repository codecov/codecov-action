import * as crypto from 'crypto';
import * as fs from 'fs';
import * as gpg from 'gpg';
import * as path from 'path';

import * as core from '@actions/core';
import {request} from 'undici';

import {
  getBaseUrl,
  getUploaderName,
  setFailure,
} from './helpers';

const verify = async (
    filename: string,
    platform: string,
    version: string,
    verbose: boolean,
    failCi: boolean,
): Promise<void> => {
  try {
    const uploaderName = getUploaderName(platform);

    // Get SHASUM and SHASUM signature files
    console.log(`${getBaseUrl(platform, version)}.SHA256SUM`);
    const shasumRes = await request(
        `${getBaseUrl(platform, version)}.SHA256SUM`,
    );
    const shasum = await shasumRes.body.text();
    if (verbose) {
      console.log(`Received SHA256SUM ${shasum}`);
    }
    await fs.writeFileSync(
        path.join(__dirname, `${uploaderName}.SHA256SUM`),
        shasum,
    );

    const shaSigRes = await request(
        `${getBaseUrl(platform, version)}.SHA256SUM.sig`,
    );
    const shaSig = await shaSigRes.body.text();
    if (verbose) {
      console.log(`Received SHA256SUM signature ${shaSig}`);
    }
    await fs.writeFileSync(
        path.join(__dirname, `${uploaderName}.SHA256SUM.sig`),
        shaSig,
    );

    const validateSha = async () => {
      const calculateHash = async (filename: string) => {
        const stream = fs.createReadStream(filename);
        const uploaderSha = crypto.createHash(`sha256`);
        stream.pipe(uploaderSha);

        return new Promise((resolve, reject) => {
          stream.on('end', () => resolve(
              `${uploaderSha.digest('hex')}  ${uploaderName}`,
          ));
          stream.on('error', reject);
        });
      };

      const hash = await calculateHash(
          path.join(__dirname, `${uploaderName}`),
      );
      if (hash === shasum) {
        core.info(`==> Uploader SHASUM verified (${hash})`);
      } else {
        setFailure(
            'Codecov: Uploader shasum does not match -- ' +
              `uploader hash: ${hash}, public hash: ${shasum}`,
            failCi,
        );
      }
    };

    const verifySignature = () => {
      gpg.call('', [
        '--logger-fd',
        '1',
        '--verify',
        path.join(__dirname, `${uploaderName}.SHA256SUM.sig`),
        path.join(__dirname, `${uploaderName}.SHA256SUM`),
      ], async (err, verifyResult) => {
        if (err) {
          setFailure('Codecov: Error importing pgp key', failCi);
        }
        core.info(verifyResult);
        await validateSha();
      });
    };

    // Import gpg key
    gpg.call('', [
      '--logger-fd',
      '1',
      '--no-default-keyring',
      '--import',
      path.join(__dirname, 'pgp_keys.asc'),
    ], async (err, importResult) => {
      if (err) {
        setFailure('Codecov: Error importing pgp key', failCi);
      }
      core.info(importResult);
      verifySignature();
    });
  } catch (err) {
    setFailure(`Codecov: Error validating uploader: ${err.message}`, failCi);
  }
};
export default verify;
