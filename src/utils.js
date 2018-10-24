import _ from 'lodash';
import logger from './logger';


const utilsLog = logger.extend('utils');

export const getTypeOfChar = (char) => {
  const log = utilsLog.extend('getTypeOfChar');
  if (!_.isString(char)) {
    log(`${char} is not a string`);
    throw new Error(`${char} is not a string.`);
  } else if (char.length !== 1) {
    log(`'${char}' is not a single character.`);
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


export const isNumber = (value) => {
  const log = utilsLog.extend('isNumber');

  const typeOfValue = typeof value?.valueOf?.();
  if (typeOfValue !== 'string' && typeOfValue !== 'number') {
    log(`${value} is not a number`);
    return false;
  }
  if (value === '') {
    log(`${value} is not a number`);
    return false;
  }

  const castedToNum = Number(value);
  const res = !Number.isNaN(castedToNum) && Number.isFinite(castedToNum);
  log(`${value} is ${res ? '' : 'not '}a number`);

  return res;
};


export default {
  getTypeOfChar,
  isNumber,
};
