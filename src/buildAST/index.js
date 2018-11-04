import { buildASTLog } from '../loggers';
import shuntingYard from './shunting-yard';

const extractArgsFromPostfixList = (postfixList, operationArity) => (
  postfixList.slice(-operationArity));

const removeArgsFromPostfixList = (postfixList, operationArity) => (
  postfixList.slice(0, -operationArity));

const buildAST = (tokens) => {
  const postfixTokens = shuntingYard(tokens);
  buildASTLog(postfixTokens.map(tk => tk.toString()).join(' '));

  const treeList = postfixTokens.reduce((acc, token) => {
    if (token.isOperand) {
      const newNode = { data: token };
      const newAcc = [...acc, newNode];
      return newAcc;
    }
    const operationArgs = extractArgsFromPostfixList(acc, token.arity);
    const newPostfixList = removeArgsFromPostfixList(acc, token.arity);
    const newNode = { data: token, children: operationArgs };
    const newAcc = [...newPostfixList, newNode];
    return newAcc;
  }, []);

  if (treeList.length > 1) {
    throw new Error('AST has more than one root');
  }

  const root = treeList[0];
  return root;
};

export default buildAST;
