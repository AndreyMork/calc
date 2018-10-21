import tokenize from './tokenize';

export default (inputStr) => {
  const tokens = tokenize(inputStr);

  return tokens;
};
