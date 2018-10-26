// import { shuntingYardLog } from './loggers';


const createStack = () => {
  const stackList = [];
  return {
    push: val => stackList.push(val),
    pop: () => stackList.pop(),
    top: () => stackList[stackList.length - 1],
    isEmpty: () => stackList.length === 0,
    moveStackToList(predicate = () => true) {
      // moves items from top of the stack to a list
      // until predicate function called on stack top returns false
      // or stack emptied
      // if called without predicate moves whole stack to a list

      const res = [];
      while (!this.isEmpty() && predicate(this.top())) {
        res.push(this.pop());
      }
      return res;
    },
  };
};


export default (tokens) => {
  const operatorStack = createStack();

  const postfixList = tokens.reduce((acc, token) => {
    if (token.isOperand) {
      return [...acc, token];
    }
    if (token.isSpecialCharacter) {
      if (token.value === '(') {
        operatorStack.push(token);
        return acc;
      }
      if (token.value === ')') {
        const movedOperators = operatorStack.moveStackToList(top => top.value !== '(');
        operatorStack.pop(); // discard '('
        return [...acc, ...movedOperators];
      }

      throw new Error(`unexpected special character ${token.value}`);
    }
    if (token.isOperator) {
      // if (operatorStack.top().value === '(') {
      //   operatorStack.push(token);
      //   return acc;
      // }

      const topHasHigherPrecedenceThanToken = top => (
        top !== '('
        && ((token.priority < top.priority)
        || (token.priority === top.priority && top.isLeftAssociative)));

      const movedOperators = operatorStack.moveStackToList(topHasHigherPrecedenceThanToken);
      operatorStack.push(token);

      return [...acc, ...movedOperators];
    }

    throw new Error(`Unexpected token ${token}`);
  }, []);

  const remainOperators = operatorStack.moveStackToList();
  return [...postfixList, ...remainOperators];
};
