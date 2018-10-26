import operatorsRegister from '../operatorsRegister';
import specialCharactersRegister from '../specialCharactersRegister';
import Constant from '../entities/Constant';
// import { evaluateLexemesLog } from '../loggers';


const lexemeToToken = (lex) => {
  if (lex.type === 'num') {
    return Constant(lex.value);
  }
  if (lex.type === 'operator') {
    return operatorsRegister[lex.value];
  }
  if (lex.type === 'specialCharacter') {
    return specialCharactersRegister[lex.value];
  }
  if (lex.type === 'trash') {
    throw new Error(`Unexpected token ${lex.value}`);
  }

  // evaluateLexemesLog(`'${lex.type} is not supported yet'`);
  throw new Error(`'${lex.type}' is not supported yet. At token: '${lex.value}'`);
};


export default (lexemes) => {
  // evaluateLexemesLog(lexemes);
  const tokens = lexemes.map(lex => lexemeToToken(lex));
  // evaluateLexemesLog(tokens);
  return tokens;
};
