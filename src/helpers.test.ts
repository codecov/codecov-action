import {
  getBaseUrl,
  getPlatform,
  isValidPlatform,
  isWindows,
  PLATFORMS,
} from './helpers';

let OLDOS = process.env.RUNNER_OS;

beforeEach(() => {
  jest.resetModules();
  OLDOS = process.env.RUNNER_OS;
});

afterAll(() => {
  process.env.RUNNER_OS = OLDOS;
});

test('getPlatform', () => {
  expect(getPlatform('linux')).toBe('linux');
  expect(getPlatform('windows')).toBe('windows');

  const defaultPlatform =
      process.env.RUNNER_OS ? process.env.RUNNER_OS.toLowerCase() : 'linux';
  expect(getPlatform('fakeos')).toBe(defaultPlatform);
  expect(getPlatform()).toBe(defaultPlatform);

  process.env.RUNNER_OS = 'macos';
  expect(getPlatform('fakeos')).toBe('macos');
  expect(getPlatform()).toBe('macos');

  process.env.RUNNER_OS = 'alsofakeos';
  expect(getPlatform()).toBe('linux');
  expect(getPlatform('fakeos')).toBe('linux');
});

test('getBaseUrl', () => {
  expect(PLATFORMS.map((platform) => {
    return getBaseUrl(platform, 'latest');
  })).toEqual([
    'https://cli.codecov.io/alpine/codecov',
    'https://cli.codecov.io/linux/codecov',
    'https://cli.codecov.io/macos/codecov',
    'https://cli.codecov.io/windows/codecov.exe',
  ]);

  expect(PLATFORMS.map((platform) => {
    return getBaseUrl(platform, 'v0.1.0_8880');
  })).toEqual([
    'https://cli.codecov.io/alpine/codecov',
    'https://cli.codecov.io/linux/codecov',
    'https://cli.codecov.io/macos/codecov',
    'https://cli.codecov.io/windows/codecov.exe',
  ]);
});

test('isWindows', () => {
  expect(PLATFORMS.map((platform) => {
    return isWindows(platform);
  })).toEqual([false, false, false, true]);
});

test('isValidPlatform', () => {
  expect(PLATFORMS.map((platform) => {
    return isValidPlatform(platform);
  })).toEqual([true, true, true, true]);

  expect(isValidPlatform('fakeos')).toBeFalsy();
});
