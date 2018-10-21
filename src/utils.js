import _ from 'lodash';

export const getTypeOfChar = (char) => {
  if (!_.isString(char)) {
    throw new Error(`${char} is not a string.`);
  } else if (char.length !== 1) {
    throw new Error(`'${char}' is not a single character.`);
  }

  const matchers = {
    alpha: /[a-z]/i.test(char),
    digit: /\d/.test(char),
    underscore: /[_]/.test(char),
    whitespace: /\s/.test(char),
    point: /[.,]/.test(char),
    operator: /[+\-*/]/.test(char),
  };
  const type = _.findKey(matchers) || 'trash';
  return type;
};

export default {
  getTypeOfChar,
};
