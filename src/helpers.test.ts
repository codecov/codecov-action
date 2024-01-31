import {
  getBaseUrl,
  getPlatform,
  isValidPlatform,
  isWindows,
  PLATFORMS,
  getCommand,
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
    'https://cli.codecov.io/latest/linux/codecov',
    'https://cli.codecov.io/latest/macos/codecov',
    'https://cli.codecov.io/latest/windows/codecov.exe',
    'https://cli.codecov.io/latest/alpine/codecov',
    'https://cli.codecov.io/latest/linux-arm64/codecov',
    'https://cli.codecov.io/latest/alpine-arm64/codecov',
  ]);

  expect(PLATFORMS.map((platform) => {
    return getBaseUrl(platform, 'v0.1.0_8880');
  })).toEqual([
    'https://cli.codecov.io/v0.1.0_8880/linux/codecov',
    'https://cli.codecov.io/v0.1.0_8880/macos/codecov',
    'https://cli.codecov.io/v0.1.0_8880/windows/codecov.exe',
    'https://cli.codecov.io/v0.1.0_8880/alpine/codecov',
    'https://cli.codecov.io/v0.1.0_8880/linux-arm64/codecov',
    'https://cli.codecov.io/v0.1.0_8880/alpine-arm64/codecov',
  ]);
});

test('isWindows', () => {
  expect(PLATFORMS.map((platform) => {
    return isWindows(platform);
  })).toEqual([false, false, true, false, false, false]);
});

test('isValidPlatform', () => {
  expect(PLATFORMS.map((platform) => {
    return isValidPlatform(platform);
  })).toEqual([true, true, true, true, true, true]);

  expect(isValidPlatform('fakeos')).toBeFalsy();
});

test('getCommand', () => {
  expect(getCommand('path', ['-v', '-x'], 'do-upload'))
      .toEqual(['path', '-v', '-x', 'do-upload']);
});
