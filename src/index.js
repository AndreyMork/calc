import tokenize from './tokenize';
import { mainLog } from './logger';


export default (inputStr) => {
  mainLog(`input is '${inputStr}'`);
  const tokens = tokenize(inputStr);

  return tokens;
};
