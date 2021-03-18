#!/usr/bin/env node
import commander from 'commander';
// const commander = require('commander')

commander
  .version('1.0.0')
  .arguments('<filepath1>,<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');
commander.parse(process.argv);
