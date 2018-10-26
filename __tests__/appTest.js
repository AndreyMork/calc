import calc from '../src';


describe('app test', () => {
  it('calc', () => {
    expect(calc('2 * 5 + 2^(2 - 2) / 0.5')).toBe(12);
  });
});
