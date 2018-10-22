#! /usr/bin/env node

import program from 'commander';
import calc from '..';
import { version } from '../../package.json';


program
  .description('')
  .version(version)
  .arguments('<input>')
  // .option()
  .action(input => calc(input))
  .parse(process.argv);
