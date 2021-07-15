import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

import * as core from '@actions/core';
import * as openpgp from 'openpgp';
import * as fetch from 'node-fetch';

import {
  BASEURL,
  getUploaderName,
  setFailure,
} from './helpers';

const verify = async (platform: string, filename: string) => {
  try {
    const uploaderName = getUploaderName(platform);

    // Read in public key
    const publicKeyArmored = await fs.readFileSync(
        path.join(__dirname, 'pgp_keys.asc'),
        'utf-8',
    );
    core.info('Got publicKeyArmored');

    // Get SHASUM and SHASUM signature files
    const shasumRes = await fetch(
        `${BASEURL}${platform}/${uploaderName}.SHA256SUM`,
    );
    const shasum = await shasumRes.text();
    core.info(`Got shasum ${shasum}`);

    const shaSigRes = await fetch(
        `${BASEURL}${platform}/${uploaderName}.SHA256SUM.sig`,
    );
    const shaSig = await shaSigRes.text();
    core.info(`Got shaSig ${shaSig}`);

    // Verify shasum
    const verified = await openpgp.verify({
      message: await openpgp.cleartext.fromText(shasum),
      signature: await openpgp.signature.readArmored(shaSig),
      publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys,
    });
    core.info(`Got verified ${verified}`);
    const {valid} = verified.signatures[0];
    if (valid) {
      core.info('Signed by key id ' + verified.signatures[0].keyid.toHex());
    } else {
      setFailure('Codecov: Error validating SHASUM signature', true);
    }

    // Verify uploader
    const uploaderSha = crypto.createHash(`sha256`);
    const stream = fs.createReadStream(filename);
    stream
        .on('data', (data) => {
          uploaderSha.update(data);
        }).on('end', () => {
          const hash = `${uploaderSha.digest('hex')}  ${uploaderName}`;
          if (hash !== shasum) {
            setFailure(
                'Codecov: Uploader shasum does not match ' +
                  `uploader hash: ${hash}, public hash: ${shasum}`,
                true,
            );
          }
        });
  } catch (err) {
    setFailure(`Codecov: Error validating uploader: ${err.message}`, true);
  }
};
export default verify;
