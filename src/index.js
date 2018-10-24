import tokenize from './tokenize';
import { mainLog } from './loggers';


export default (inputStr) => {
  mainLog(`input is '${inputStr}'`);
  const tokens = tokenize(inputStr);

  return tokens;
};
