import debug from 'debug';

const logger = debug('calc');

export const mainLog = logger.extend('main');

export const tokenizeLog = logger.extend('tokenize');
export const getLexemesLog = tokenizeLog.extend('getLexemes');
export const scannerLog = getLexemesLog.extend('scanner');

export const utilsLog = logger.extend('utils');

export default logger;
