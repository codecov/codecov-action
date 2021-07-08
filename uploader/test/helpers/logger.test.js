// @ts-check
const logger = require('../../src/helpers/logger')

describe('Logger Helper', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('Should call logger with default options', () => {
    // eslint-disable-next-line
    jest.spyOn(console, 'log').mockImplementation(() => {})
    logger.log('message with no options')
    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/no options/),
    )
  })

  it('Should not call logger with default options.level = debug and verbose not set', () => {
    // eslint-disable-next-line
    jest.spyOn(console, 'debug').mockImplementation(() => {})
    logger.log('message with debug level', { level: 'debug' })
    expect(console.debug).not.toHaveBeenCalled()
  })

  it('Should call logger with options.level = debug and verbose set', () => {
    jest.spyOn(console, 'debug').mockImplementation(() => {})
    logger.log('message with debug level and verbose', {
      level: 'debug',
      args: { verbose: true },
    })
    expect(console.debug).toHaveBeenCalledWith(
      expect.stringMatching(/debug level and verbose/),
    )
  })

  it('Should call logger with options.level = error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    logger.log('message with error level', { level: 'error' })
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(/error level/),
    )
  })

  it('Should call logger with unsupported options.level ', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    logger.log('message with error level of foobar', { level: 'foobar' })
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/of foobar/))
  })
})
