import { tokenizeLog } from '../loggers';
import getLexemes from './getLexemes';
import evaluateLexemes from './evaluateLexemes';


export default (inputStr) => {
  tokenizeLog(`input: '${inputStr}'`);
  return inputStr |> getLexemes |> evaluateLexemes;
};
