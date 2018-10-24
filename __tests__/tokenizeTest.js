import getLexemes from '../src/tokenize/getLexemes';

describe('tokenization', () => {
  test('lexeme scanner', () => {
    const inputStr = 'abc + 123 && ';
    const expectedTokens = [
      { val: 'abc', type: 'id' },
      { val: '+', type: 'operator' },
      { val: '123', type: 'num' },
      { val: '&&', type: 'trash' },
    ];
    expect(getLexemes(inputStr)).toEqual(expectedTokens);

    const inputStr2 = ' + __a_b12-.5* 432 2.   \t .  a..a 12.2';
    const expectedTokens2 = [
      { val: '+', type: 'operator' },
      { val: '__a_b12', type: 'id' },
      { val: '-', type: 'operator' },
      { val: '.5', type: 'num' },
      { val: '*', type: 'operator' },
      { val: '432', type: 'num' },
      { val: '2.', type: 'num' },
      { val: '.', type: 'trash' },
      { val: 'a..a', type: 'trash' },
      { val: '12.2', type: 'num' },
    ];

    expect(getLexemes(inputStr2)).toEqual(expectedTokens2);

    const trashStr = '2abc .abc  12.abc 12.3&&';
    const expectedTokens3 = [
      { val: '2abc', type: 'trash' },
      { val: '.abc', type: 'trash' },
      { val: '12.abc', type: 'trash' },
      { val: '12.3&&', type: 'trash' },
    ];
    expect(getLexemes(trashStr)).toEqual(expectedTokens3);
  });
});
