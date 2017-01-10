import { expect } from 'chai';

describe('Server Sanity Check', () => {
  describe('Simple math', () => {
    it('5+5 = 10', () => {
      const expected = 10;

      const firstValue = 5;
      const secondValue = 5;
      const actual = firstValue + secondValue;

      expect(actual).equals(expected);
    });
  });
});
