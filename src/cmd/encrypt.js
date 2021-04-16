const
chalk = require('chalk'),
{ encrypt } = require('../utils/crypto')


// boostrap
main = function (argv)
{
  console.log(chalk.yellow(' - result:',encrypt(argv.string)))
}

// exports
exports.command = 'encrypt'

exports.describe = 'encrypt --string stringToEncyrpt'

exports.builder = (yargs) => {
  yargs
  .alias('s', 'string')
  .describe('s', 'String to encode ')
  .demandOption(['s'])
}

exports.handler = main
