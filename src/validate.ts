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

const retrieveChecksum = async (version, encryption) => {
  const url = `https://raw.githubusercontent.com/codecov/codecov-bash/${version}/SHA${encryption}SUM`;
  try {
    const response = await request({
      maxAttempts: 10,
      timeout: 3000,
      url: url,
    });
    return response.body;
  } catch (err) {
    core.warning(
        `Codecov could not retrieve checksum SHA${encryption} at ${url}`,
    );
    return false;
  }
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
