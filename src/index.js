import tokenize from './tokenize';
import logger from './logger';


export const mainLog = logger.extend('main');

export default (inputStr) => {
  mainLog(`input is '${inputStr}'`);
  const tokens = tokenize(inputStr);

  return tokens;
};
