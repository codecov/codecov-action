const crypto = require('crypto');

const core = require('@actions/core');

const request = require('requestretry');

const validateUploader = async (body) => {
  const version = getVersion(body);
  if (version === null) {
    core.warning('Codecov could not identify the bash uploader version.');
    return false;
  }

  for (const i of [1, 256, 512]) {
    const publicChecksum = await retrieveChecksum(version, i);
    const uploaderChecksum = calculateChecksum(body, i);
    if (uploaderChecksum !== publicChecksum.trim()) {
      core.warning(
          `Codecov ${version} checksums for SHA1 failed to match.\n` +
          `Public checksum:   ${publicChecksum}` +
          `Uploader checksum: ${uploaderChecksum}`,
      );
      return false;
    }
  }
  return true;
};

export const retrieveChecksum = async (version, encryption) => {
  const url = `https://raw.githubusercontent.com/codecov/codecov-bash/${version}/SHA${encryption}SUM`;
  const response = await request({
    maxAttempts: 10,
    timeout: 3000,
    url: url,
  });

  if (response.statusCode != 200) {
    core.warning(
        `Codecov could not retrieve checksum SHA${encryption} at ${url}`,
    );
    return '';
  }
  return response.body;
};

const calculateChecksum = (body, i) => {
  const shasum = crypto.createHash(`sha${i}`);
  shasum.update(body);
  return `${shasum.digest('hex')}  codecov`;
};

const getVersion = (body) => {
  const regex = /VERSION="(.*)+"/g;
  const match = regex.exec(body);
  return match ? match[1] : null;
};

export default validateUploader;
