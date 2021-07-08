const td = require('testdouble')
const childProcess = require('child_process')

/*
Add your provider here and name it provder<Ci>. Example:
const providerTravisci = require('../../src/ci_providers//provider_travisci')
*/

describe('<Ci> Params', () => {
  afterEach(() => {
    td.reset()
  })

  describe('detect()', () => {
    it('does not run without <Ci> env variable', () => {
      const inputs = {
        args: {},
        envs: {},
      }
      /*
      const detected = provider<Ci>.detect(inputs.envs)
      expect(detected).toBeFalsy()
      */
    })

    it('does not run without <Ci> env variable', () => {
      const inputs = {
        args: {},
        envs: {},
      }
      /*
      const detected = provider<Ci>.detect(inputs.envs)
      expect(detected).toBeTruthy()
      */
    })
  })

  // This should test that the provider outputs proper default values
  it('gets the correct params on no env variables', () => {
    const inputs = {
      args: {},
      envs: {},
    }
    const expected = {
      branch: '',
      build: '',
      buildURL: '',
      commit: '',
      job: '',
      pr: '',
      service: '',
      slug: '',
    }
    /*
    const params = provider<Ci>.getServiceParams(inputs)
    expect(expected).toBeTruthy()
    */
  })

  // This should test that the provider outputs proper parameters when a push event is created
  it('gets the correct params on push', () => {
    const inputs = {
      args: {},
      envs: {},
    }
    const expected = {
      branch: '',
      build: '',
      buildURL: '',
      commit: '',
      job: '',
      pr: '',
      service: '',
      slug: '',
    }
    /*
    const params = provider<Ci>.getServiceParams(inputs)
    expect(expected).toBeTruthy()
    */
  })
  //
  // This should test that the provider outputs proper parameters when a pull request event is created
  it('gets the correct params on pr', () => {
    const inputs = {
      args: {},
      envs: {},
    }
    const expected = {
      branch: '',
      build: '',
      buildURL: '',
      commit: '',
      job: '',
      pr: '',
      service: '',
      slug: '',
    }
    /*
    const params = provider<Ci>.getServiceParams(inputs)
    expect(expected).toBeTruthy()
    */
  })

  // This should test that the provider outputs proper parameters when given overrides
  it('gets the correct params on overrides', () => {
    const inputs = {
      args: {},
      envs: {},
    }
    const expected = {
      branch: '',
      build: '',
      buildURL: '',
      commit: '',
      job: '',
      pr: '',
      service: '',
      slug: '',
    }
    /*
    const params = provider<Ci>.getServiceParams(inputs)
    expect(expected).toBeTruthy()
    */
  })
})
