import tokenize from './tokenize';

const dataString = '123 +/-*abc ab*12c 12.5 .2  123';
const tokens = tokenize(dataString);
console.log(tokens);
