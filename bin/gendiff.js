#!/usr/bin/env node
import commander from 'commander';
// const commander = require('commander')

commander
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information');
commander.parse(process.argv);
