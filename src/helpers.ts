import * as core from '@actions/core';

const PLATFORMS = ['alpine', 'linux', 'macos', 'windows'];
const BASEURL = 'https://uploader.codecov.io/latest/';

const setFailure = (message: string, failCi: boolean): void => {
    failCi ? core.setFailed(message) : core.warning(message);
    if (failCi) {
      process.exit();
    }
};

const getUploaderName = (platform: string): string => {
  if (isWindows(platform)) {
    return 'codecov.exe';
  } else {
    return 'codecov';
  }
};

const isValidPlatform = (platform: string): boolean => {
  return PLATFORMS.includes(platform);
};

const isWindows = (platform: string): boolean => {
  return platform === 'windows';
};

export {
  BASEURL,
  getUploaderName,
  isValidPlatform,
  isWindows,
  setFailure,
};
