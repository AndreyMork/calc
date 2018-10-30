import math from './math';


const operationFactory = (priority, arity, associativity, callback, reprStr) => ({
  reprStr,
  priority,
  arity,
  isOperator: true,
  isOperand: false,
  isRightAssociative: associativity === 'right',
  isLeftAssociative: associativity === 'left',
  eval: callback,
  toString: () => reprStr,
});

// tier === priority. Lower tier === lower priority.
const tierConstructor = tier => (
  (...otherArgs) => operationFactory(tier, ...otherArgs));


// *** Tier1 ***
const buildTierOneOperation = tierConstructor(1);

const tierOneOperations = {
  '+': buildTierOneOperation(2, 'left', math.add, '+'),
  '-': buildTierOneOperation(2, 'left', math.sub, '-'),
};

// *** Tier2 ***
const buildTierTwoOperation = tierConstructor(2);

const tierTwoOperations = {
  '*': buildTierTwoOperation(2, 'left', math.mul, '*'),
  '/': buildTierTwoOperation(2, 'left', math.div, '/'),
};

// *** Tier3 ***
const buildTierThreeOperation = tierConstructor(3);

// QUESTION: unary associativity?
const tierThreeOperations = {
  '-u': buildTierThreeOperation(1, 'right', math.unaryNegation, '-u'),
  '+u': buildTierThreeOperation(1, 'right', math.unaryPositive, '+u'),
  '^': buildTierThreeOperation(2, 'right', math.pow, '^'),
};


export default {
  getAmbiguousOperators: () => ['-', '+'],
  ...tierOneOperations,
  ...tierTwoOperations,
  ...tierThreeOperations,
};
