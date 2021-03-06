import StateMachine from 'javascript-state-machine';
import { scannerLog } from '../../loggers';
import transitions from './transitions';


export default new StateMachine({
  transitions,
  init: 'pending',
  data: {
    acc: '',
    lexemes: [],
    lexemeType: null,
  },
  methods: {
    getLexemes() {
      return this.lexemes;
    },
    accumulatingIsOn() {
      return !this.is('pending') && !this.is('readyToSave');
    },
    onScan(lifecycle, char) {
      if (this.accumulatingIsOn()) {
        this.acc = `${this.acc}${char}`;
      }
    },
    saveAcc() {
      scannerLog(`saving '${this.acc}' as ${this.lexemeType}`);
      this.lexemes.push({ value: this.acc, type: this.lexemeType });
      this.acc = '';
      this.lexemeType = null;
    },
    onSaveLexeme() {
      this.saveAcc();
    },
    onStartScanning() {
      scannerLog('lexeme scanning started');
      this.acc = '';
      this.lexemeType = null;
      this.lexemes = [];
    },
    finishScanning() {
      if (this.acc) {
        this.scan(' ');
        this.saveAcc();
      }
      scannerLog('lexeme scanning complete');
    },
  },
});
