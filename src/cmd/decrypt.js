const
chalk = require('chalk'),
{ decrypt } = require('../utils/crypto')


// boostrap
main = function (argv)
{
  console.log(chalk.yellow(' - result:',decrypt(argv.string)))
}

// exports
exports.command = 'decrypt'

exports.describe = 'decrypt --string stringToDecrypt'

exports.builder = (yargs) => {
  yargs
  .alias('s', 'string')
  .describe('s', 'String to encode ')
  .demandOption(['s'])
}

exports.handler = main
