import debug from 'debug';

const logger = debug('calc');

export const mainLog = logger.extend('main');

export const tokenizeLog = logger.extend('tokenize');
export const getLexemesLog = tokenizeLog.extend('getLexemes');
export const scannerLog = getLexemesLog.extend('scanner');
export const evaluateLexemesLog = tokenizeLog.extend('evaluateLexems');

export const buildASTLog = logger.extend('buildAST');
export const shuntingYardLog = logger.extend('shuntingYard');

export const utilsLog = logger.extend('utils');

export default logger;
