import * as core from '@actions/core';
import * as exec from '@actions/exec';

const PLATFORMS = [
  'linux',
  'macos',
  'windows',
  'alpine',
  'linux-arm64',
  'alpine-arm64',
];

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

const getPlatform = (os?: string): string => {
  if (isValidPlatform(os)) {
    core.info(`==> ${os} OS provided`);
    return os;
  }

  const platform = process.env.RUNNER_OS?.toLowerCase();
  if (isValidPlatform(platform)) {
    core.info(`==> ${platform} OS detected`);
    return platform;
  }

  core.info(
      '==> Could not detect OS or provided OS is invalid. Defaulting to linux',
  );
  return 'linux';
};

const getBaseUrl = (platform: string, version: string): string => {
  return `https://cli.codecov.io/${version}/${platform}/${getUploaderName(platform)}`;
};

const getCommand = (
    filename: string,
    generalArgs:string[],
    command: string,
): string[] => {
  const fullCommand = [filename, ...generalArgs, command];
  core.info(`==> Running command '${fullCommand.join(' ')}'`);
  return fullCommand;
};

const setSafeDirectory = async () => {
  const isSafe = await exec.exec('git config --get safe.directory');
  if (!isSafe) {
    const command = ([
      'git',
      'config',
      '--global',
      '--add',
      'safe.directory',
      `${process.env['GITHUB_WORKSPACE']}`,
    ].join(' '));
    core.info(`==> Running ${command}`);
    await exec.exec(command);
  }
};

export {
  PLATFORMS,
  getBaseUrl,
  getPlatform,
  getUploaderName,
  isValidPlatform,
  isWindows,
  setFailure,
  setSafeDirectory,
  getCommand,
};
