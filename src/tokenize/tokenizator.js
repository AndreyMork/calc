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
      tokenizatorLog(`saving '${this.acc}'`);
      this.tokens.push(this.acc);
      this.acc = '';
    },
    onStartParsing() {
      tokenizatorLog('tokenization started');
      this.acc = '';
      this.tokens = [];
    },
    onFinishParsing() {
      if (this.acc) {
        tokenizatorLog(`saving '${this.acc}'`);
        this.tokens.push(this.acc);
      }
      tokenizatorLog('tokenization complete');
      this.acc = '';
    },
  },
});
