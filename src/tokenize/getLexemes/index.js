import scanner from './scanner';
import { getLexemesLog } from '../../logger';


export default (str) => {
  // TODO: input str errors
  getLexemesLog(`input is '${str}'`);
  const characters = str.split('');

  scanner.startScanning();
  characters.forEach((char) => {
    scanner.scan(char);
    if (scanner.is('readyToSave')) {
      scanner.saveLexeme();
      // While lexeme is being saved, a character is not going to be processed.
      // So, after the saving the character is send in machine again.
      scanner.scan(char);
    }
  });
  scanner.finishScanning();

  const lexemes = scanner.getLexemes();
  getLexemesLog('Lexemes are:');
  getLexemesLog(lexemes);
  return lexemes;
};
