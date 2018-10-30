import operatorsRegister from '../operatorsRegister';
import specialCharactersRegister from '../specialCharactersRegister';
import Constant from '../entities/Constant';
// import { evaluateLexemesLog } from '../loggers';

const ambiguousOperators = operatorsRegister.getAmbiguousOperators();

const lexemeToToken = (lex, prevToken) => {
  if (lex.type === 'num') {
    return Constant(lex.value);
  }
  if (lex.type === 'operator') {
    if (ambiguousOperators.includes(lex.value)) {
      const isBinaryOperation = prevToken !== undefined
        && lexemeToToken(prevToken).isOperand;

      const operatorRepr = isBinaryOperation ? lex.value : `${lex.value}u`;
      return operatorsRegister[operatorRepr];
    }

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
  const tokens = lexemes.map((lex, ind) => (
    lexemeToToken(lex, lexemes[ind - 1])));

  return tokens;
};
