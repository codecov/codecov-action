const td = require('testdouble')
const childProcess = require('child_process')

const providerAzurepipelines = require('../../src/ci_providers//provider_azurepipelines')

describe('Jenkins CI Params', () => {
  afterEach(() => {
    td.reset()
  })

  describe('detect()', () => {
    it('does not run without AzurePipelines env variable', () => {
      const inputs = {
        args: {},
        envs: {},
      }
      const detected = providerAzurepipelines.detect(inputs.envs)
      expect(detected).toBeFalsy()
    })

    it('does run with AzurePipelines env variable', () => {
      const inputs = {
        args: {},
        envs: {
          SYSTEM_TEAMFOUNDATIONSERVERURI: 'true',
        },
      }
      const detected = providerAzurepipelines.detect(inputs.envs)
      expect(detected).toBeTruthy()
    })
  })

  // it('gets the correct params on no env variables', () => {
  //   const inputs = {
  //     args: {},
  //     envs: {
  //       SYSTEM_TEAMFOUNDATIONSERVERURI: 'true'
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
  //   const params = providerAzurepipelines.getServiceParams(inputs)
  //   expect(expected).toBeTruthy()
  // })

  it('gets correct params on pr number', () => {
    const inputs = {
      args: {},
      envs: {
        BUILD_BUILDNUMBER: 1,
        BUILD_BUILDID: 2,
        BUILD_SOURCEBRANCH: 'refs/heads/main',
        BUILD_SOURCEVERSION: 'testingsha',
        SYSTEM_BUILD_BUILDID: 1,
        SYSTEM_PULLREQUEST_PULLREQUESTNUMBER: 3,
        SYSTEM_TEAMFOUNDATIONSERVERURI: 'https://example.azure.com',
        SYSTEM_TEAMPROJECT: 'testOrg',
      },
    }
    const expected = {
      branch: 'main',
      build: 1,
      buildURL:
        'https%3A%2F%2Fexample.azure.comtestOrg%2F_build%2Fresults%3FbuildId%3D2',
      commit: 'testingsha',
      job: 2,
      pr: 3,
      project: 'testOrg',
      server_uri: 'https://example.azure.com',
      service: 'azure_pipelines',
      slug: '',
    }
    const params = providerAzurepipelines.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })

  it('gets correct params on pr id', () => {
    const inputs = {
      args: {},
      envs: {
        BUILD_BUILDNUMBER: 1,
        BUILD_BUILDID: 2,
        BUILD_SOURCEBRANCH: 'refs/heads/main',
        BUILD_SOURCEVERSION: 'testingsha',
        SYSTEM_BUILD_BUILDID: 1,
        SYSTEM_PULLREQUEST_PULLREQUESTID: 3,
        SYSTEM_TEAMFOUNDATIONSERVERURI: 'https://example.azure.com',
        SYSTEM_TEAMPROJECT: 'testOrg',
      },
    }
    const expected = {
      branch: 'main',
      build: 1,
      buildURL:
        'https%3A%2F%2Fexample.azure.comtestOrg%2F_build%2Fresults%3FbuildId%3D2',
      commit: 'testingsha',
      job: 2,
      pr: 3,
      project: 'testOrg',
      server_uri: 'https://example.azure.com',
      service: 'azure_pipelines',
      slug: '',
    }
    const params = providerAzurepipelines.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })

  it('gets correct params on merge', () => {
    const inputs = {
      args: {},
      envs: {
        BUILD_BUILDNUMBER: 1,
        BUILD_BUILDID: 2,
        BUILD_SOURCEBRANCH: 'refs/heads/main',
        BUILD_SOURCEVERSION: 'testingsha',
        SYSTEM_BUILD_BUILDID: 1,
        SYSTEM_PULLREQUEST_PULLREQUESTID: 3,
        SYSTEM_TEAMFOUNDATIONSERVERURI: 'https://example.azure.com',
        SYSTEM_TEAMPROJECT: 'testOrg',
      },
    }
    const expected = {
      branch: 'main',
      build: 1,
      buildURL:
        'https%3A%2F%2Fexample.azure.comtestOrg%2F_build%2Fresults%3FbuildId%3D2',
      commit: 'testingmergecommitsha2345678901234567890',
      job: 2,
      pr: 3,
      project: 'testOrg',
      server_uri: 'https://example.azure.com',
      service: 'azure_pipelines',
      slug: '',
    }
    const execFileSync = td.replace(childProcess, 'execFileSync')
    td.when(
      execFileSync('git', ['show', '--no-patch', '--format="%P"']),
    ).thenReturn('testingsha123456789012345678901234567890 testingmergecommitsha2345678901234567890')
    const params = providerAzurepipelines.getServiceParams(inputs)
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
        SYSTEM_TEAMFOUNDATIONSERVERURI: 'https://example.azure.com',
      },
    }
    const expected = {
      branch: 'branch',
      build: 3,
      buildURL: '',
      commit: 'testsha',
      job: '',
      pr: '2',
      project: '',
      server_uri: 'https://example.azure.com',
      service: 'azure_pipelines',
      slug: 'testOrg/testRepo',
    }

    const params = providerAzurepipelines.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })
})
