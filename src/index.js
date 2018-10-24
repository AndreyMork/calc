import tokenize from './tokenize';
import { mainLog } from './loggers';

// TODO token string validation
export default (inputStr) => {
  mainLog(`input is '${inputStr}'`);
  const tokens = tokenize(inputStr);

  return tokens;
};
