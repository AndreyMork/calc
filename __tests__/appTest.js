import calc from '../src';


describe('app test', () => {
  it('calc', () => {
    expect(calc('2 * 5 + 2^(2 - 2) / 0.5')).toBe(12);
    expect(calc('-2')).toBe(-2);
    expect(calc('--2')).toBe(2);
    expect(calc('+2')).toBe(2);
    expect(calc('1--1')).toBe(2);
    expect(calc('2^-1')).toBe(0.5);
    expect(calc('2^(-1)^2')).toBe(2);
    expect(calc('2^-1^2')).toBe(0.5);
  });
});
