// @ts-check

/**
 *
 * @param {string|Object} message
 * @param {Object} [options]
 * @param {string} [options.level]
 * @param {Object} [options.args]
 * @returns void
 */
function log(message, options) {
  if (!options || !options.level) {
    return console.log(message)
  }
  switch (options.level) {
    case 'debug':
      if (options.args && options.args.verbose) {
        console.debug(message)
      }

      break
    case 'error':
      console.error(message)
      break
    default:
      console.log(message)
      break
  }
}

module.exports = {
  log,
}
