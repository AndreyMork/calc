import { getTypeOfChar, isNumber } from '../src/utils';

describe('getTypeOfChar', () => {
  test('alpha', () => {
    expect(getTypeOfChar('a')).toBe('alpha');
    expect(getTypeOfChar('Z')).toBe('alpha');
    expect(getTypeOfChar('æ')).toBe('alpha');
    expect(getTypeOfChar('1')).not.toBe('alpha');
  });

  test('other chars', () => {
    expect(getTypeOfChar('_')).toBe('underscore');
    expect(getTypeOfChar('.')).toBe('point');
    expect(getTypeOfChar(',')).toBe('point');
  });

  test('digit', () => {
    expect(getTypeOfChar('6')).toBe('digit');
    expect(getTypeOfChar('0')).toBe('digit');
    expect(getTypeOfChar('a')).not.toBe('digit');
  });

  test('operators and signs', () => {
    expect(getTypeOfChar('+')).toBe('sign');
    expect(getTypeOfChar('-')).toBe('sign');
    expect(getTypeOfChar('/')).toBe('operator');
    expect(getTypeOfChar('*')).toBe('operator');
    expect(getTypeOfChar('^')).toBe('operator');
  });

  test('whitespace', () => {
    expect(getTypeOfChar(' ')).toBe('whitespace');
    expect(getTypeOfChar('\t')).toBe('whitespace');
  });

  test('specialCharacter', () => {
    expect(getTypeOfChar('(')).toBe('specialCharacter');
    expect(getTypeOfChar(')')).toBe('specialCharacter');
  });

  test('trash', () => {
    expect(getTypeOfChar('&')).toBe('trash');
    expect(getTypeOfChar('?')).toBe('trash');
    expect(getTypeOfChar('%')).toBe('trash');
  });

  test('errors', () => {
    expect(() => getTypeOfChar('')).toThrow();
    expect(() => getTypeOfChar('abc')).toThrow();
    expect(() => getTypeOfChar(1)).toThrow();
    expect(() => getTypeOfChar({})).toThrow();
  });
});

describe('isNumber', () => {
  test('number', () => {
    expect(isNumber(12)).toBe(true);
    expect(isNumber('-.3')).toBe(true);
    expect(isNumber('12.2')).toBe(true);
    expect(isNumber('0.')).toBe(true);
  });

  test('not number', () => {
    expect(isNumber('')).toBe(false);
    expect(isNumber()).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber('0.a')).toBe(false);
    expect(isNumber('abc')).toBe(false);
    expect(isNumber('.12.')).toBe(false);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Infinity)).toBe(false);
    expect(isNumber([0])).toBe(false);
  });
});
