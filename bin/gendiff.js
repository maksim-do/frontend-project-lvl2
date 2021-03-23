#!/usr/bin/env node
import commander from 'commander';
import getDiff from '../src/getDiff.js';
//const getDiff = require('../src/getDiff')

commander
  .version('1.0.0')
  .arguments('[filepath1] [filepath2]')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action((filepath1,filepath2) => {
    console.log(getDiff(filepath1,filepath2));
  })
commander.parse(process.argv);
