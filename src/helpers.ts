import * as core from '@actions/core';

const PLATFORMS = ['alpine', 'linux', 'macos', 'windows'];
const BASEURL = 'https://uploader.codecov.io/latest/';

const setFailure = (message, failCi) => {
    failCi ? core.setFailed(message) : core.warning(message);
    if (failCi) {
      process.exit();
    }
};

const getUploaderName = (platform) => {
  if (isWindows(platform)) {
    return 'codecov.exe';
  } else {
    return 'codecov';
  }
};

const isValidPlatform = (platform) => {
  return PLATFORMS.includes(platform);
};

const isWindows = (platform) => {
  return platform === 'windows';
};

export {
  BASEURL,
  getUploaderName,
  isValidPlatform,
  isWindows,
  setFailure,
};
