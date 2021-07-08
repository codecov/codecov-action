const td = require('testdouble')
const providerBuildkite = require('../../src/ci_providers/provider_buildkite')

describe('Buildkite Params', () => {
  afterEach(() => {
    td.reset()
  })

  describe('detect()', () => {
    it('does not run without Buildkite env variable', () => {
      const inputs = {
        args: {},
        envs: {},
      }
      const detected = providerBuildkite.detect(inputs.envs)
      expect(detected).toBeFalsy()
    })

    it('does not run without Buildkite env variable', () => {
      const inputs = {
        args: {},
        envs: {
          BUILDKITE: 'true',
        },
      }
      const detected = providerBuildkite.detect(inputs.envs)
      expect(detected).toBeTruthy()
    })
  })

  it('gets correct params on push', () => {
    const inputs = {
      args: {},
      envs: {
        BUILDKITE: 'true',
        BUILDKITE_BUILD_NUMBER: '1',
        BUILDKITE_JOB_ID: '3',
        BUILDKITE_PROJECT_SLUG: 'testRepo',
        BUILDKITE_BRANCH: 'main',
        BUILDKITE_COMMIT: 'testingsha',
        BUILDKITE_BUILD_URL: 'https://buildkite.com/testOrg/testRepo',
        CI: 'true',
      },
    }
    const expected = {
      branch: 'main',
      build: '1',
      buildURL: 'https://buildkite.com/testOrg/testRepo',
      commit: 'testingsha',
      job: '3',
      pr: '',
      service: 'buildkite',
      slug: 'testRepo',
    }
    const params = providerBuildkite.getServiceParams(inputs)
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
        BUILDKITE: 'true',
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
      service: 'buildkite',
      slug: 'testOrg/testRepo',
    }

    const params = providerBuildkite.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })
})
