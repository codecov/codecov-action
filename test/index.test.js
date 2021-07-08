const app = require('../src')

const { version } = require('../package.json')
const nock = require('nock')
const fs = require('fs')

describe('Uploader Core', () => {
  const env = process.env

  afterEach(() => {
    process.env = env
    jest.restoreAllMocks()
  })

  it('Can return version', () => {
    expect(app.getVersion()).toBe(version)
  })

  it('Can display header', () => {
    expect(app.generateHeader(app.getVersion())).toBe(`
     _____          _
    / ____|        | |
   | |     ___   __| | ___  ___ _____   __
   | |    / _ \\ / _\` |/ _ \\/ __/ _ \\ \\ / /
   | |___| (_) | (_| |  __/ (_| (_) \\ V /
    \\_____\\___/ \\__,_|\\___|\\___\\___/ \\_/

  Codecov report uploader ${version}`)
  })

  it('Can upload with custom name', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    process.env.CI = 'true'
    process.env.CIRCLECI = 'true'

    nock('https://codecov.io')
      .post('/upload/v4')
      .query(actualQueryObject => actualQueryObject.name === 'customname')
      .reply(200, 'https://results.codecov.io\nhttps://codecov.io')

    nock('https://codecov.io').put('/').reply(200, 'success')

    const result = await app.main({
      name: 'customname',
      token: 'abcdefg',
      url: 'https://codecov.io',
    })
    expect(result).toEqual({
      status: 'success',
      resultURL: 'https://results.codecov.io',
    })
  }, 30000)

  it('Can parse environment variables', async () => {
    process.env.SOMETHING = 'red'
    process.env.ANOTHER = 'blue'
    jest.spyOn(process, 'exit').mockImplementation(() => {})
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    await app.main({
      name: 'customname',
      token: 'abcdefg',
      url: 'https://codecov.io',
      dryRun: true,
      env: 'SOMETHING,ANOTHER',
    })
    expect(log).toHaveBeenCalledWith(expect.stringMatching(/SOMETHING=red/))
    expect(log).toHaveBeenCalledWith(expect.stringMatching(/ANOTHER=blue/))
    expect(log).toHaveBeenCalledWith(expect.stringMatching(/<<<<<< ENV/))
  })

  describe('Flags', () => {
    it('can upload with flags', async () => {
      process.env.CI = 'true'
      process.env.CIRCLECI = 'true'

      nock('https://codecov.io')
        .post('/upload/v4')
        .query(actualQueryObject => actualQueryObject.flags === 'a-flag')
        .reply(200, 'https://results.codecov.io\nhttps://codecov.io')

      nock('https://codecov.io').put('/').reply(200, 'success')

      const result = await app.main({
        flags: 'a-flag',
        token: 'abcdefg',
        url: 'https://codecov.io',
      })
      expect(result).toEqual({
        status: 'success',
        resultURL: 'https://results.codecov.io',
      })
    }, 30000)
  })

  it('Can upload with parent sha', async () => {
    process.env.CI = 'true'
    process.env.CIRCLECI = 'true'

    const parent = '2x4bqz123abc'

    nock('https://codecov.io')
      .post('/upload/v4')
      .query(actualQueryObject => actualQueryObject.parent === parent)
      .reply(200, 'https://results.codecov.io\nhttps://codecov.io')

    nock('https://codecov.io').put('/').reply(200, 'success')

    const result = await app.main({
      token: 'abcdefg',
      url: 'https://codecov.io',
      parent,
    })
    expect(result).toEqual({
      status: 'success',
      resultURL: 'https://results.codecov.io',
    })
  }, 30000)

  it('Can find all coverage from root dir', async () => {
    jest.spyOn(process, 'exit').mockImplementation(() => {})
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    await app.main({
      name: 'customname',
      token: 'abcdefg',
      url: 'https://codecov.io',
      dryRun: true,
    })
    expect(log).toHaveBeenCalledWith(
      expect.stringMatching(/An example coverage root file/),
    )
    expect(log).toHaveBeenCalledWith(
      expect.stringMatching(/An example coverage other file/),
    )
  })

  it('Can find only coverage from custom dir', async () => {
    jest.spyOn(process, 'exit').mockImplementation(() => {})
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    await app.main({
      name: 'customname',
      token: 'abcdefg',
      url: 'https://codecov.io',
      dryRun: true,
      dir: './test/fixtures/other',
    })
    expect(log).toHaveBeenCalledWith(
      expect.stringMatching(/An example coverage other file/),
    )
    expect(log).not.toHaveBeenCalledWith(
      expect.stringMatching(/An example coverage root file/),
    )
  })

  it('Can remove coverage files', async () => {
    jest.spyOn(process, 'exit').mockImplementation(() => {})
    const unlink = jest.spyOn(fs, 'unlink').mockImplementation(() => {})
    await app.main({
      name: 'customname',
      token: 'abcdefg',
      url: 'https://codecov.io',
      dryRun: true,
      dir: './test/fixtures/other',
      clean: true,
    })
    expect(unlink).toHaveBeenCalledWith(
      'test/fixtures/other/coverage.txt',
      expect.any(Function),
    )
  })

  it('Can include the network', async () => {
    jest.spyOn(process, 'exit').mockImplementation(() => {})
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    await app.main({
      name: 'customname',
      token: 'abcdefg',
      url: 'https://codecov.io',
      dryRun: true,
      dir: './test/fixtures/other',
    })
    expect(log).toHaveBeenCalledWith(expect.stringMatching(/<<<<<< network/))
  })

  it('Can ignore the network', async () => {
    jest.spyOn(process, 'exit').mockImplementation(() => {})
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    await app.main({
      name: 'customname',
      token: 'abcdefg',
      url: 'https://codecov.io',
      dryRun: true,
      feature: 'network',
    })
    expect(log).not.toHaveBeenCalledWith(
      expect.stringMatching(/<<<<<< network/),
    )
  })
})
