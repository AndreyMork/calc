import logger from '../logger';
import tokenizator from './tokenizator';

const tokenizeLog = logger.extend('tokenize');

export default (str) => {
  // TODO: input str errors
  tokenizeLog(`input is '${str}'`);
  const characters = str.split('');

  tokenizator.startParsing();
  characters.forEach((char) => {
    tokenizator.step(char);
    if (tokenizator.is('readyToSave')) {
      tokenizator.saveToken();
      // While token is being saved, a character is not going to be processed.
      // So, after the saving the character is send in machine again.
      tokenizator.step(char);
    }
  });
  tokenizator.finishParsing();

  const tokens = tokenizator.getTokens();
  tokenizeLog('Tokens are:');
  tokenizeLog(tokens);
  return tokens;
};
