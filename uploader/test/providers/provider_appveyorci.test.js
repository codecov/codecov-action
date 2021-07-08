const td = require('testdouble')

const providerAppveyorci = require('../../src/ci_providers//provider_appveyorci')

describe('AppveyorCI Params', () => {
  afterEach(() => {
    td.reset()
  })

  describe('detect()', () => {
    it('does not run without AppveyorCI env variable', () => {
      const inputs = {
        args: {},
        envs: {},
      }
      let detected = providerAppveyorci.detect(inputs.envs)
      expect(detected).toBeFalsy()

      inputs.envs.CI = 'true'
      detected = providerAppveyorci.detect(inputs.envs)
      expect(detected).toBeFalsy()

      inputs.envs.CI = 'True'
      detected = providerAppveyorci.detect(inputs.envs)
      expect(detected).toBeFalsy()

      inputs.envs.CI = 'false'
      inputs.envs.APPVEYOR = 'true'
      detected = providerAppveyorci.detect(inputs.envs)
      expect(detected).toBeFalsy()

      inputs.envs.APPVEYOR = 'True'
      detected = providerAppveyorci.detect(inputs.envs)
      expect(detected).toBeFalsy()
    })

    it('does run with AppveyorCI env variable', () => {
      const inputs = {
        args: {},
        envs: {
          CI: 'true',
          APPVEYOR: 'true',
        },
      }
      const detected = providerAppveyorci.detect(inputs.envs)
      expect(detected).toBeTruthy()
    })
  })

  // it('gets the correct params on no env variables', () => {
  //   const inputs = {
  //     args: {},
  //     envs: {
  //       CI: 'true',
  //       APPVEYOR: 'true'
  //     }
  //   }
  //   const expected = {
  //     branch: '',
  //     build: '',
  //     buildURL: '',
  //     commit: '',
  //     job: '',
  //     pr: '',
  //     service: '',
  //     slug: ''
  //   }
  //   const params = providerAppveyorci.getServiceParams(inputs)
  //   expect(expected).toBeTruthy()
  // })

  it('gets correct params on push', () => {
    const inputs = {
      args: {},
      envs: {
        APPVEYOR: 'true',
        APPVEYOR_ACCOUNT_NAME: 'testOrg',
        APPVEYOR_BUILD_ID: '2',
        APPVEYOR_BUILD_VERSION: '3',
        APPVEYOR_JOB_ID: '1',
        APPVEYOR_PROJECT_SLUG: 'testRepo',
        APPVEYOR_PULL_REQUEST_NUMBER: 4,
        APPVEYOR_REPO_BRANCH: 'main',
        APPVEYOR_REPO_COMMIT: 'testingsha',
        APPVEYOR_REPO_NAME: 'testOrg/testRepo',
        APPVEYOR_URL: 'https://appveyor.com',
        CI: 'true',
      },
    }
    const expected = {
      branch: 'main',
      build: '1',
      buildURL:
        'https%3A%2F%2Fappveyor.com%2Fproject%2FtestOrg%2FtestRepo%2Fbuilds%2F2%2Fjob%2F1',
      commit: 'testingsha',
      job: 'testOrg%2FtestRepo%2F3',
      pr: 4,
      service: 'appveyor',
      slug: 'testOrg/testRepo',
    }
    const params = providerAppveyorci.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })

  it('gets correct params for overrides', () => {
    const inputs = {
      args: {
        branch: 'branch',
        build: 3,
        pr: '2',
        sha: 'testsha',
        slug: 'testOrg/testRepo',
      },
      envs: {
        APPVEYOR: 'true',
        CI: 'true',
      },
    }
    const expected = {
      branch: 'branch',
      build: 3,
      buildURL: '',
      commit: 'testsha',
      job: '',
      pr: '2',
      service: 'appveyor',
      slug: 'testOrg/testRepo',
    }

    const params = providerAppveyorci.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })
})
