#!/usr/bin/env node
const
  yargs = require('yargs')

yargs
  .command(require('../src/cmd/encrypt'))
  .command(require('../src/cmd/decrypt'))
  .help()
  .argv
