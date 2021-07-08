const td = require('testdouble')

const providerDrone = require('../../src/ci_providers/provider_drone')

describe('Drone Params', () => {
  afterEach(() => {
    td.reset()
  })

  describe('detect()', () => {
    it('does not run without Drone env variable', () => {
      const inputs = {
        args: {},
        envs: {},
      }
      const detected = providerDrone.detect(inputs.envs)
      expect(detected).toBeFalsy()
    })

    it('does run with Drone env variable', () => {
      const inputs = {
        args: {},
        envs: {
          CI: true,
          DRONE: true,
        },
      }
      const detected = providerDrone.detect(inputs.envs)
      expect(detected).toBeTruthy()
    })
  })

  it('gets correct params', () => {
    const inputs = {
      args: {},
      envs: {
        CI: true,
        DRONE: true,
        DRONE_BRANCH: 'master',
        DRONE_COMMIT_SHA: 'testingsha',
        DRONE_BUILD_NUMBER: 2,
        DRONE_PULL_REQUEST: 1,
        DRONE_BUILD_URL: 'https://www.drone.io/',
        DRONE_REPO_LINK: 'https:/example.com/repo',
      },
    }
    const expected = {
      branch: 'master',
      build: 2,
      buildURL: 'https://www.drone.io/',
      commit: 'testingsha',
      job: '',
      pr: 1,
      service: 'drone',
      slug: 'https:/example.com/repo',
    }
    const params = providerDrone.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })
})
