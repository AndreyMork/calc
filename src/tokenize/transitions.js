import { getTypeOfChar } from '../utils';


const defaultSaveTransitions = {
  whitespace: 'readyToSave',
  operator: 'readyToSave',
};

const startParsing = {
  name: 'startParsing',
  from: '*',
  to: 'pending',
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
      point: 'singlePoint',
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
  to() {
    this.tokenType = 'operator';
    return 'readyToSave';
  },
};

const trashTransitions = {
  name: 'step',
  from: 'trash',
  to(char) {
    const type = getTypeOfChar(char);

    const nextState = defaultSaveTransitions[type] || 'trash';
    if (nextState === 'readyToSave') {
      this.tokenType = 'trash';
    }

    return nextState;
  },
};

const nameTransitions = {
  name: 'step',
  from: 'name',
  to(char) {
    const type = getTypeOfChar(char);
    const transitions = {
      alpha: 'name',
      underscore: 'name',
      digit: 'name',
    };

    const nextState = transitions[type] || defaultSaveTransitions[type] || 'trash';
    if (nextState === 'readyToSave') {
      this.tokenType = 'id';
    }

    return nextState;
  },
};

const integerPartTransitions = {
  name: 'step',
  from: 'integerPart',
  to(char) {
    const type = getTypeOfChar(char);
    const transitions = {
      digit: 'integerPart',
      point: 'point',
    };

    const nextState = transitions[type] || defaultSaveTransitions[type] || 'trash';
    if (nextState === 'readyToSave') {
      this.tokenType = 'num';
    }

    return nextState;
  },
};

const singlePointTransitions = {
  name: 'step',
  from: 'singlePoint',
  to(char) {
    const type = getTypeOfChar(char);
    const transitions = {
      digit: 'fractionalPart',
    };

    const nextState = transitions[type] || defaultSaveTransitions[type] || 'trash';
    if (nextState === 'readyToSave') {
      this.tokenType = 'trash';
    }

    return nextState;
  },

};

const pointTranisitions = {
  name: 'step',
  from: 'point',
  to(char) {
    const type = getTypeOfChar(char);
    const transitions = {
      digit: 'fractionalPart',
    };

    const nextState = transitions[type] || defaultSaveTransitions[type] || 'trash';
    if (nextState === 'readyToSave') {
      this.tokenType = 'num';
    }

    return nextState;
  },
};

const fractionalPartTransitions = {
  name: 'step',
  from: 'fractionalPart',
  to(char) {
    const type = getTypeOfChar(char);
    const transitions = {
      digit: 'fractionalPart',
    };

    const nextState = transitions[type] || defaultSaveTransitions[type] || 'trash';
    if (nextState === 'readyToSave') {
      this.tokenType = 'num';
    }

    return nextState;
  },
};

export default [
  startParsing,
  operatorTransitions,
  saveToken,
  pendingTransitions,
  trashTransitions,
  nameTransitions,
  integerPartTransitions,
  singlePointTransitions,
  pointTranisitions,
  fractionalPartTransitions,
];
