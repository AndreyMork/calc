import { getTypeOfChar } from '../src/utils';

describe('type of character', () => {
  test('alpha', () => {
    expect(getTypeOfChar('a')).toBe('alpha');
    expect(getTypeOfChar('Z')).toBe('alpha');
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

  test('operator', () => {
    expect(getTypeOfChar('+')).toBe('operator');
    expect(getTypeOfChar('-')).toBe('operator');
    expect(getTypeOfChar('/')).toBe('operator');
    expect(getTypeOfChar('*')).toBe('operator');
    expect(getTypeOfChar('^')).toBe('operator');
    expect(getTypeOfChar('&')).not.toBe('operator');
  });

  test('whitespace', () => {
    expect(getTypeOfChar(' ')).toBe('whitespace');
    expect(getTypeOfChar('\t')).toBe('whitespace');
  });

  test('errors', () => {
    expect(() => getTypeOfChar('')).toThrow();
    expect(() => getTypeOfChar('abc')).toThrow();
    expect(() => getTypeOfChar(1)).toThrow();
    expect(() => getTypeOfChar({})).toThrow();
  });
});
