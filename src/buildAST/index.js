import { buildASTLog } from '../loggers';
import shuntingYard from './shunting-yard';


const buildAST = (tokens) => {
  const postfixTokens = shuntingYard(tokens);
  buildASTLog(postfixTokens.map(tk => tk.toString()).join(' '));

  const treeList = postfixTokens.reduce((acc, token) => {
    if (token.isOperand) {
      return [...acc, { data: token }];
    }

    const operationArgs = acc.slice(-token.arity);
    const newAcc = acc.slice(0, -token.arity);
    return [...newAcc, { data: token, children: operationArgs }];
  }, []);

  if (treeList.length > 1) {
    throw new Error('AST has more than one root');
  }

  const root = treeList[0];
  return root;
};

export default buildAST;
