const buildSpecialChar = value => ({
  value,
  isOperand: false,
  isOperator: false,
  isSpecialCharacter: true,
  toString: () => value,
});


export default {
  '(': buildSpecialChar('('),
  ')': buildSpecialChar(')'),
};
