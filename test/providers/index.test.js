const td = require('testdouble')

const providers = require('../../src/ci_providers')

describe('CI Providers', () => {
  afterEach(() => {
    td.reset()
  })

  it('is an array of CI providers', () =>
    expect(providers).toBeInstanceOf(Array))
  providers.forEach(provider => {
    it('has a service name', () => {
      expect(typeof provider.getServiceName()).toBe('string')
      expect(provider.getServiceName()).not.toBe('')
    })
  })
})
