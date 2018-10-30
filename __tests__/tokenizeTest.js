import getLexemes from '../src/tokenize/getLexemes';

describe('tokenization', () => {
  test('lexeme scanner', () => {
    const inputStr = 'abc + 123 && 10.2e-2 10.2.e ';
    const expectedTokens = [
      { value: 'abc', type: 'id' },
      { value: '+', type: 'operator' },
      { value: '123', type: 'num' },
      { value: '&&', type: 'trash' },
      { value: '10.2e-2', type: 'num' },
      { value: '10.2.e', type: 'trash' },
    ];
    expect(getLexemes(inputStr)).toEqual(expectedTokens);

    const inputStr2 = ' + __a_b12-(.5* 432 2.)   \t .  a..a 12.2';
    const expectedTokens2 = [
      { value: '+', type: 'operator' },
      { value: '__a_b12', type: 'id' },
      { value: '-', type: 'operator' },
      { value: '(', type: 'specialCharacter' },
      { value: '.5', type: 'num' },
      { value: '*', type: 'operator' },
      { value: '432', type: 'num' },
      { value: '2.', type: 'num' },
      { value: ')', type: 'specialCharacter' },
      { value: '.', type: 'trash' },
      { value: 'a..a', type: 'trash' },
      { value: '12.2', type: 'num' },
    ];

    expect(getLexemes(inputStr2)).toEqual(expectedTokens2);

    const trashStr = '2abc .abc  12.abc 12.3&&';
    const expectedTokens3 = [
      { value: '2abc', type: 'trash' },
      { value: '.abc', type: 'trash' },
      { value: '12.abc', type: 'trash' },
      { value: '12.3&&', type: 'trash' },
    ];
    expect(getLexemes(trashStr)).toEqual(expectedTokens3);
  });
});
