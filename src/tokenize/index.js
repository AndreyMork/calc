import tokenizator from './tokenizatorOptions';


export default (str) => {
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

  return tokenizator.getTokens();
};
