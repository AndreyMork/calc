import StateMachine from 'javascript-state-machine';
import transitions from './transitions';


export default new StateMachine({
  transitions,
  init: 'pending',
  data: {
    acc: '',
    tokens: [],
  },
  methods: {
    getTokens() {
      return this.tokens;
    },
    accumulatingIsOn() {
      return !this.is('pending') && !this.is('readyToSave');
    },
    onStep(lifecycle, char) {
      if (this.accumulatingIsOn()) {
        this.acc = `${this.acc}${char}`;
      }
    },
    onSaveToken() {
      this.tokens.push(this.acc);
      this.acc = '';
    },
    haltMachine() {
      if (this.acc) {
        this.tokens.push(this.acc);
      }
    },
  },
});
