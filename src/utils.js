import _ from 'lodash';
import logger from './logger';


const utilsLog = logger.extend('utils');

export const getTypeOfChar = (char) => {
  const log = utilsLog.extend('getTypeOfChar');
  if (!_.isString(char)) {
    log(char);
    throw new Error(`${char} is not a string.`);
  } else if (char.length !== 1) {
    log(char);
    throw new Error(`'${char}' is not a single character.`);
  }

  const matchers = {
    alpha: /\p{L}/ui.test(char),
    digit: /\d/.test(char),
    underscore: /[_]/.test(char),
    whitespace: /\s/.test(char),
    point: /[.,]/.test(char),
    operator: /[+\-*/^]/.test(char),
  };
  const type = _.findKey(matchers) ?? 'trash';
  log(`'${char}' is '${type}'`);
  return type;
};

export default {
  getTypeOfChar,
};
