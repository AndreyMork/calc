import { isNumber } from '../utils';


// reprStr === representationString
export default (reprStr) => {
  const value = isNumber(reprStr) ? Number(reprStr) : NaN;
  return {
    value,
    orignalStr: reprStr,
    isOperand: true,
    isOperation: false,
    valueOf: () => value,
  };
};
