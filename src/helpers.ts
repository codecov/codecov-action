import * as core from '@actions/core';

const PLATFORMS = ['alpine', 'linux', 'macos', 'windows'];

const setFailure = (message: string, failCi: boolean): void => {
    failCi ? core.setFailed(message) : core.warning(message);
    if (failCi) {
      process.exit();
    }
};

const getUploaderName = (): string => {
  if (isWindows()) {
    return 'codecov.exe';
  } else {
    return 'codecov';
  }
};

const isValidPlatform = (): boolean => {
  return PLATFORMS.includes(getPlatform());
};

const isWindows = (): boolean => {
  return getPlatform() === 'windows';
};

const getPlatform = (): string => {
  return process.env.RUNNER_OS.toLowerCase();
};

const BASEURL = `https://uploader.codecov.io/latest/${getPlatform()}/${getUploaderName()}`;

export {
  BASEURL,
  getPlatform,
  getUploaderName,
  isValidPlatform,
  isWindows,
  setFailure,
};
