#! /usr/bin/env node

import program from 'commander';
import calc from '..';
import repl from '../repl';
import { version } from '../../package.json';

program
  .description('')
  .version(version)
  // .arguments('<input>')
  // .option()
  .action(() => repl(calc))
  .parse(process.argv);
