const crypto = require('crypto');

const core = require('@actions/core');

const validateUploader = (body) => {
  const version = getVersion(body);
  if (version === null) {
    core.warning('Codecov could not identify the bash uploader version.');
    return false;
  }

  for (const i of [1, 256, 512]) {
    const publicChecksum = retrieveChecksum(version, i);
    const uploaderChecksum = calculateChecksum(body, i);
    if (uploaderChecksum !== publicChecksum) {
      core.warning(
          `Codecov ${version} checksums for SHA${i} failed to match.\n` +
          `Public checksum:   ${publicChecksum}` +
          `Uploader checksum: ${uploaderChecksum}`,
      );
      return false;
    }
  }
  return true;
};

export const retrieveChecksum = (version, encryption) => {
  const checksums = {
    '1.0.1': {
      '1': '0ddc61a9408418c73b19a1375f63bb460dc947a8',
      '256': '89c658e261d5f25533598a222fd96cf17a5fa0eb3772f2defac754d9970b2ec8',
      '512': 'd075b412a362a9a2b7aedfec3b8b9a9a927b3b99e98c7c15a2b76ef09862ae' +
        'b005e91d76a5fd71b511141496d0fd23d1b42095f722ebcd509d768fba030f159e',
    },
    '1.0.2': {
      '1': '537069158a6f72b145cfe5f782dceb608d9ef594',
      '256': 'd6aa3207c4908d123bd8af62ec0538e3f2b9f257c3de62fad4e29cd3b59b41d9',
      '512': 'b6492196dd844cd81a688536bb42463d28bd666448335c4a8fc7f8f9b9b9af' +
        'c346a467e3401e3fc49e6047442a30d93a4adfaa1590101224a186013c6179c48d',
    },
  };

  if (version in checksums && encryption in checksums[version]) {
    return checksums[version][encryption];
  }
  return null;
};

const calculateChecksum = (body, i) => {
  const shasum = crypto.createHash(`sha${i}`);
  shasum.update(body);
  return `${shasum.digest('hex')}`;
};

const getVersion = (body) => {
  const regex = /VERSION="([\d\.]+)"/g;
  const match = regex.exec(body);
  return match ? match[1] : null;
};

export default validateUploader;
