const td = require('testdouble')

const providerJenkinsci = require('../../src/ci_providers//provider_jenkinsci')

describe('Jenkins CI Params', () => {
  afterEach(() => {
    td.reset()
  })

  describe('detect()', () => {
    it('does not run without JenkinsCI env variable', () => {
      const inputs = {
        args: {},
        envs: {},
      }
      let detected = providerJenkinsci.detect(inputs.envs)
      expect(detected).toBeFalsy()

      inputs.envs.JENKINS_URL = ''
      detected = providerJenkinsci.detect(inputs.envs)
      expect(detected).toBeFalsy()
    })

    it('does run with JenkinsCI env variable', () => {
      const inputs = {
        args: {},
        envs: {
          JENKINS_URL: 'https://example.jenkins.com',
        },
      }
      const detected = providerJenkinsci.detect(inputs.envs)
      expect(detected).toBeTruthy()
    })
  })

  // it('gets the correct params on no env variables', () => {
  //   const inputs = {
  //     args: {},
  //     envs: {
  //       JENKINS_URL: 'https://example.jenkins.com'
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
  //   const params = providerJenkinsci.getServiceParams(inputs)
  //   expect(expected).toBeTruthy()
  // })

  it('gets correct params on push', () => {
    const inputs = {
      args: {},
      envs: {
        BUILD_NUMBER: 1,
        BUILD_URL: 'https://example.jenkins.com',
        CHANGE_ID: 2,
        GIT_BRANCH: 'main',
        GIT_COMMIT: 'testingsha',
        JENKINS_URL: 'https://example.com',
      },
    }
    const expected = {
      branch: 'main',
      build: 1,
      buildURL: 'https%3A%2F%2Fexample.jenkins.com',
      commit: 'testingsha',
      job: '',
      pr: 2,
      service: 'jenkins',
      slug: '',
    }
    const params = providerJenkinsci.getServiceParams(inputs)
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
        JENKINS_URL: 'https://example.com',
      },
    }
    const expected = {
      branch: 'branch',
      build: 3,
      buildURL: '',
      commit: 'testsha',
      job: '',
      pr: '2',
      service: 'jenkins',
      slug: 'testOrg/testRepo',
    }

    const params = providerJenkinsci.getServiceParams(inputs)
    expect(params).toMatchObject(expected)
  })
})
