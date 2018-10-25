import calc from '../src';


describe('app test', () => {
  it('calc', () => {
    expect(calc('2 + 2')).toBe(4);
  });
});
