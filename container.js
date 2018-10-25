import calc from './src';
import utils from './src/utils';
import tokenize from './src/tokenize';
import getLexemes from './src/tokenize/getLexemes';
import evaluateLexemes from './src/tokenize/evaluateLexemes';
import operatorsRegister from './src/operatorsRegister';
import Constant from './src/entities/Constant';
import buildAST from './src/buildAST';
import shuntingYard from './src/buildAST/shunting-yard';
import math from './src/math';

export default {
  calc,
  utils,
  tokenize,
  getLexemes,
  evaluateLexemes,
  operatorsRegister,
  buildAST,
  shuntingYard,
  Constant,
  math,
};
