import tokenize from './tokenize';
import buildAST from './buildAST';
import evaluate from './evaluate';
import { mainLog } from './loggers';

// TODO token string validation
export default (inputStr) => {
  mainLog(`input is '${inputStr}'`);
  const tokens = tokenize(inputStr);
  const ast = buildAST(tokens);
  const res = evaluate(ast);

  return res;
};
