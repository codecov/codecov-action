import * as core from '@actions/core';
import {Agent, MockAgent, setGlobalDispatcher} from 'undici';

import versionInfo from './version';

const mockAgent = new MockAgent();

beforeAll(() => {
  setGlobalDispatcher(mockAgent);
  mockAgent.disableNetConnect();
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => {
  await mockAgent.close();
  setGlobalDispatcher(new Agent());
});

describe('versionInfo', () => {
  const platform = 'linux';

  test('should resolve requested version info', async () => {
    const version = 'latest';
    const coreInfoSpy = jest.spyOn(core, 'info');

    mockAgent
        .get('https://cli.codecov.io')
        .intercept({
          path: `/${platform}/${version}`,
        })
        .reply(200, {
          version: 'v0.5.2',
        });

    await versionInfo(platform, version);

    expect(coreInfoSpy).toHaveBeenCalledTimes(2);
    expect(coreInfoSpy).toHaveBeenCalledWith('==> Running version latest');
    expect(coreInfoSpy).toHaveBeenCalledWith('==> Running version v0.5.2');
  });

  test('should handle unsupported version', async () => {
    const version = 'unsupported';
    const coreInfoSpy = jest.spyOn(core, 'info');

    mockAgent
        .get('https://cli.codecov.io')
        .intercept({
          path: `/${platform}/${version}`,
        })
        .reply(404, 'MESSAGE');

    await versionInfo(platform, version);

    expect(coreInfoSpy).toHaveBeenCalledTimes(2);
    expect(coreInfoSpy).toHaveBeenCalledWith('==> Running version unsupported');
    expect(coreInfoSpy).toHaveBeenCalledWith(expect.stringContaining('Could not pull latest version information'));
  });
});
