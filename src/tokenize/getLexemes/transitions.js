import { getTypeOfChar } from '../../utils';


const defaultSaveTransitions = {
  whitespace: 'readyToSave',
  sign: 'readyToSave',
  operator: 'readyToSave',
  specialCharacter: 'readyToSave',
};

const startScanning = {
  name: 'startScanning',
  from: '*',
  to: 'pending',
};

const saveLexeme = {
  name: 'saveLexeme',
  from: 'readyToSave',
  to: 'pending',
};

// TODO: unary minus?
const pendingTransitions = {
  name: 'scan',
  from: 'pending',
  to: (char) => {
    const type = getTypeOfChar(char);
    const transitions = {
      whitespace: 'pending',
      alpha: 'name',
      underscore: 'name',
      digit: 'integerPart',
      point: 'singlePoint',
      sign: 'operator',
      operator: 'operator',
      specialCharacter: 'specialCharacter',
      trash: 'trash',
    };

    const nextState = transitions[type];
    return nextState;
  },
};

const operatorTransitions = {
  name: 'scan',
  from: 'operator',
  to() {
    this.lexemeType = 'operator';
    return 'readyToSave';
  },
};

const specialCharacterTransitions = {
  name: 'scan',
  from: 'specialCharacter',
  to() {
    this.lexemeType = 'specialCharacter';
    return 'readyToSave';
  },
};

const trashTransitions = {
  name: 'scan',
  from: 'trash',
  to(char) {
    const type = getTypeOfChar(char);

    const nextState = defaultSaveTransitions[type] ?? 'trash';
    if (nextState === 'readyToSave') {
      this.lexemeType = 'trash';
    }

    return nextState;
  },
};

const nameTransitions = {
  name: 'scan',
  from: 'name',
  to(char) {
    const type = getTypeOfChar(char);
    const transitions = {
      alpha: 'name',
      underscore: 'name',
      digit: 'name',
    };

    const nextState = transitions[type] ?? defaultSaveTransitions[type] ?? 'trash';
    if (nextState === 'readyToSave') {
      this.lexemeType = 'id';
    }

    return nextState;
  },
};

const integerPartTransitions = {
  name: 'scan',
  from: 'integerPart',
  to(char) {
    const type = char.toLocaleLowerCase() === 'e' ? 'exp' : getTypeOfChar(char);
    const transitions = {
      digit: 'integerPart',
      point: 'point',
      exp: 'exponentialSign',
    };

    const nextState = transitions[type] ?? defaultSaveTransitions[type] ?? 'trash';
    if (nextState === 'readyToSave') {
      this.lexemeType = 'num';
    }

    return nextState;
  },
};

const singlePointTransitions = {
  name: 'scan',
  from: 'singlePoint',
  to(char) {
    const type = getTypeOfChar(char);
    const transitions = {
      digit: 'fractionalPart',
    };

    const nextState = transitions[type] ?? defaultSaveTransitions[type] ?? 'trash';
    if (nextState === 'readyToSave') {
      this.lexemeType = 'trash';
    }

    return nextState;
  },

};

const pointTranisitions = {
  name: 'scan',
  from: 'point',
  to(char) {
    const type = char.toLocaleLowerCase() === 'e' ? 'exp' : getTypeOfChar(char);
    const transitions = {
      digit: 'fractionalPart',
      exp: 'exponentialSign',
    };

    const nextState = transitions[type] ?? defaultSaveTransitions[type] ?? 'trash';
    if (nextState === 'readyToSave') {
      this.lexemeType = 'num';
    }

    return nextState;
  },
};

const fractionalPartTransitions = {
  name: 'scan',
  from: 'fractionalPart',
  to(char) {
    const type = char.toLocaleLowerCase() === 'e' ? 'exp' : getTypeOfChar(char);
    const transitions = {
      digit: 'fractionalPart',
      exp: 'exponentialSign',
    };

    const nextState = transitions[type] ?? defaultSaveTransitions[type] ?? 'trash';
    if (nextState === 'readyToSave') {
      this.lexemeType = 'num';
    }

    return nextState;
  },
};

const exponentialSignTransitions = {
  name: 'scan',
  from: 'exponentialSign',
  to(char) {
    const type = getTypeOfChar(char);
    const transitions = {
      digit: 'exponentialPart',
      sign: 'exponentialPart',
    };

    const nextState = transitions[type] ?? 'trash';
    return nextState;
  },
};

const exponentialPartTransitions = {
  name: 'scan',
  from: 'exponentialPart',
  to(char) {
    const type = getTypeOfChar(char);
    const transitions = {
      digit: 'exponentialPart',
    };

    const nextState = transitions[type] ?? defaultSaveTransitions[type] ?? 'trash';
    if (nextState === 'readyToSave') {
      this.lexemeType = 'num';
    }

    return nextState;
  },
};

export default [
  startScanning,
  operatorTransitions,
  specialCharacterTransitions,
  saveLexeme,
  pendingTransitions,
  trashTransitions,
  nameTransitions,
  integerPartTransitions,
  singlePointTransitions,
  pointTranisitions,
  fractionalPartTransitions,
  exponentialSignTransitions,
  exponentialPartTransitions,
];
