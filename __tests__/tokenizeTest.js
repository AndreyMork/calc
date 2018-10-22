import tokenize from '../src/tokenize';

describe('tokenization', () => {
  test('tokenization', () => {
    const inputStr = 'abc + 123 && ';
    const expectedTokens = ['abc', '+', '123', '&', '&'];
    expect(tokenize(inputStr)).toEqual(expectedTokens);

    const inputStr2 = ' abc + __a_b12-.5* 432   \t   / 12.2';
    const expectedTokens2 = ['abc', '+', '__a_b12', '-', '.5', '*', '432', '/', '12.2'];
    expect(tokenize(inputStr2)).toEqual(expectedTokens2);
  });
});
