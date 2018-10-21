import tokenizator from './tokenizator';


export default (str) => {
  const characters = str.split('');
  characters.forEach((char) => {
    tokenizator.step(char);
    if (tokenizator.is('readyToSave')) {
      tokenizator.saveToken();
      // While token is being saved, a character is not going to be processed.
      // So, after the saving the character is send in machine again.
      tokenizator.step(char);
    }
  });
  tokenizator.haltMachine();

  return tokenizator.getTokens();
};
