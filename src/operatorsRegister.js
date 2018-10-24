import math from './math';


// QUESTION: some kind of name or representation string?
const operationFactory = (priority, arity, associativity, callback) => ({
  priority,
  arity,
  isOperation: true,
  isOperand: false,
  isRightAssociative: associativity === 'right',
  isLeftAssociative: associativity === 'left',
  eval: callback,
});

// tier === priority. Lower tier === lower priority.
const tierConstructor = tier => (
  (...otherArgs) => operationFactory(tier, ...otherArgs));


// *** Tier1 ***
const buildTierOneOperation = tierConstructor(1);

const tierOneOperations = {
  '+': buildTierOneOperation(2, 'left', math.add),
  '-': buildTierOneOperation(2, 'left', math.sub),
};

// *** Tier2 ***
const buildTierTwoOperation = tierConstructor(2);

const tierTwoOperations = {
  '*': buildTierTwoOperation(2, 'left', math.mul),
  '/': buildTierTwoOperation(2, 'left', math.div),
};

// *** Tier3 ***
const buildTierThreeOperation = tierConstructor(3);

const tierThreeOperations = {
  '^': buildTierThreeOperation(2, 'right', math.pow),
};


export default {
  ...tierOneOperations,
  ...tierTwoOperations,
  ...tierThreeOperations,
};
