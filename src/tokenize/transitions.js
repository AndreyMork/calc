import { getTypeOfChar } from '../utils';

const startParsing = {
  name: 'startParsing',
  from: '*',
  to: 'pending',
};

const finishParsing = {
  name: 'finishParsing',
  from: '*',
  to: 'stopped',
};

const saveToken = {
  name: 'saveToken',
  from: 'readyToSave',
  to: 'pending',
};

// TODO: unary minus?
// TODO: brackets
const pendingTransitions = {
  name: 'step',
  from: 'pending',
  to: (char) => {
    const type = getTypeOfChar(char);
    const transitions = {
      whitespace: 'pending',
      alpha: 'name',
      underscore: 'name',
      digit: 'integerPart',
      point: 'fractionalPart',
      operator: 'operator',
      trash: 'trash',
    };

    const nextState = transitions[type];
    return nextState;
  },
};

const operatorTransitions = {
  name: 'step',
  from: 'operator',
  to: 'readyToSave',
};

const trashTransitions = {
  name: 'step',
  from: 'trash',
  to: 'readyToSave',
};

const nameTransitions = {
  name: 'step',
  from: 'name',
  to: (char) => {
    const type = getTypeOfChar(char);
    const transitions = {
      alpha: 'name',
      underscore: 'name',
      digit: 'name',
    };

    const nextState = transitions[type] || 'readyToSave';
    return nextState;
  },
};

const integerPartTransitions = {
  name: 'step',
  from: 'integerPart',
  to: (char) => {
    const type = getTypeOfChar(char);
    const transitions = {
      digit: 'integerPart',
      point: 'fractionalPart',
    };

    const nextState = transitions[type] || 'readyToSave';
    return nextState;
  },
};

const fractionalPartTransitions = {
  name: 'step',
  from: 'fractionalPart',
  to: (char) => {
    const type = getTypeOfChar(char);
    const transitions = {
      digit: 'fractionalPart',
    };

    const nextState = transitions[type] || 'readyToSave';
    return nextState;
  },
};

export default [
  startParsing,
  finishParsing,
  operatorTransitions,
  saveToken,
  pendingTransitions,
  trashTransitions,
  nameTransitions,
  integerPartTransitions,
  fractionalPartTransitions,
];
