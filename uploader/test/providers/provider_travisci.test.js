const td = require('testdouble')

const providerTravisci = require('../../src/ci_providers/provider_travisci')

describe('TravisCI Params', () => {
  afterEach(() => {
    td.reset()
  })

  describe('detect()', () => {
    it('does not run without TravisCI env variable', () => {
      const inputs = {
        args: {},
        envs: {},
      }
      let detected = providerTravisci.detect(inputs.envs)
      expect(detected).toBeFalsy()

      inputs.envs.CI = true
      detected = providerTravisci.detect(inputs.envs)
      expect(detected).toBeFalsy()

      inputs.envs.TRAVIS = true
      detected = providerTravisci.detect(inputs.envs)
      expect(detected).toBeFalsy()
    })

    it('does run with TravisCI env variable', () => {
      const inputs = {
        args: {},
        envs: {
          CI: true,
          SHIPPABLE: true,
          TRAVIS: true,
        },
      }
      const detected = providerTravisci.detect(inputs.envs)
      expect(detected).toBeTruthy()
    })
  })

  it('gets correct params on push', () => {
    const inputs = {
      args: {},
      envs: {
        CI: true,
        TRAVIS: true,
        SHIPPABLE: true,
        TRAVIS_JOB_NUMBER: 1,
        TRAVIS_BRANCH: 'main',
        TRAVIS_TAG: 'main',
        TRAVIS_JOB_ID: 2,
        TRAVIS_PULL_REQUEST: '',
        TRAVIS_COMMIT: 'testingsha',
        TRAVIS_REPO_SLUG: 'testOrg/testRepo',
      },
    }
    const expected = {
      branch: '',
      build: 1,
      buildURL: '',
      commit: 'testingsha',
      job: 2,
      pr: '',
      service: 'travis',
      slug: 'testOrg/testRepo',
    }
    const params = providerTravisci.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })

  it('gets correct params on PR', () => {
    const inputs = {
      args: {},
      envs: {
        CI: true,
        SHIPPABLE: true,
        TRAVIS: true,
        TRAVIS_BRANCH: 'branch',
        TRAVIS_COMMIT: 'testingsha',
        TRAVIS_JOB_ID: 2,
        TRAVIS_JOB_NUMBER: 1,
        TRAVIS_PULL_REQUEST: '',
        TRAVIS_PULL_REQUEST_BRANCH: 'branch',
        TRAVIS_PULL_REQUEST_SHA: 'testingprsha',
        TRAVIS_REPO_SLUG: 'testOrg/testRepo',
        TRAVIS_TAG: 'main',
      },
    }
    const expected = {
      branch: 'branch',
      build: 1,
      buildURL: '',
      commit: 'testingprsha',
      job: 2,
      pr: '',
      service: 'travis',
      slug: 'testOrg/testRepo',
    }
    const params = providerTravisci.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })

  it('gets correct params on PR with no pull request branch', () => {
    const inputs = {
      args: {},
      envs: {
        CI: true,
        SHIPPABLE: true,
        TRAVIS: true,
        TRAVIS_BRANCH: 'branch',
        TRAVIS_COMMIT: 'testingsha',
        TRAVIS_JOB_ID: 2,
        TRAVIS_JOB_NUMBER: 1,
        TRAVIS_PULL_REQUEST: '',
        TRAVIS_PULL_REQUEST_SHA: 'testingprsha',
        TRAVIS_REPO_SLUG: 'testOrg/testRepo',
        TRAVIS_TAG: 'main',
      },
    }
    const expected = {
      branch: 'branch',
      build: 1,
      buildURL: '',
      commit: 'testingprsha',
      job: 2,
      pr: '',
      service: 'travis',
      slug: 'testOrg/testRepo',
    }
    const params = providerTravisci.getServiceParams(inputs)
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
        CI: true,
        SHIPPABLE: true,
        TRAVIS: true,
      },
    }
    const expected = {
      branch: 'branch',
      build: 3,
      buildURL: '',
      commit: 'testsha',
      job: undefined,
      pr: '2',
      service: 'travis',
      slug: 'testOrg/testRepo',
    }

    const params = providerTravisci.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })
})
