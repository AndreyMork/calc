import StateMachine from 'javascript-state-machine';
import logger from '../logger';
import transitions from './transitions';


const tokenizatorLog = logger.extend('tokenize:fsm');

export default new StateMachine({
  transitions,
  init: 'pending',
  data: {
    acc: '',
    tokens: [],
    tokenType: null,
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
    saveAcc() {
      tokenizatorLog(`saving '${this.acc}' as ${this.tokenType}`);
      this.tokens.push({ val: this.acc, type: this.tokenType });
      this.acc = '';
      this.tokenType = null;
    },
    onSaveToken() {
      this.saveAcc();
    },
    onStartParsing() {
      tokenizatorLog('tokenization started');
      this.acc = '';
      this.tokenType = null;
      this.tokens = [];
    },
    finishParsing() {
      if (this.acc) {
        this.step(' ');
        this.saveToken();
      }
      tokenizatorLog('tokenization complete');
    },
  },
});
