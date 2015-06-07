var _ = require('lodash')
var chalk = require('chalk')

module.exports = function(description, actual, expected) {
  if (_.isEqual(expected, actual)) {
    console.log(chalk.green('✓ ' + description))
  } else { 
    console.log(chalk.red(['✗', description, '-- You passed', actual, 'but expected', expected].join(' ')))
  }
}
