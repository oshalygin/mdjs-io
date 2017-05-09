import { expect } from 'chai';
import { numberToLocaleString, numberToLocaleStringWithoutDecimals } from './currencyUtility';

describe('Currency Utilities', () => {


  it('should return "$ 500,000.00" when passing a raw number of 500000 to the utility', () => {

    const expected = '$ 500,000.00';
    const number = 500000;
    const actual = numberToLocaleString(number);

    expect(actual).equals(expected);

  });

  it('should return "$ 3,401.13" when passing a raw number of 3401.13 to the utility', () => {

    const expected = '$ 3,401.13';
    const number = 3401.13;
    const actual = numberToLocaleString(number);

    expect(actual).equals(expected);

  });

  it('should return "$ 79.13" when passing a raw number of 79.13 to the utility', () => {

    const expected = '$ 79.13';
    const number = 79.13;
    const actual = numberToLocaleString(number);

    expect(actual).equals(expected);

  });

  it('should return "$ 0.00" when passing a raw number of 0 to the utility', () => {

    const expected = '$ 0.00';
    const number = 0;
    const actual = numberToLocaleString(number);

    expect(actual).equals(expected);

  });

  it('should return "$ 0" when passing a raw number of 0 to the non-decimal utility', () => {

    const expected = '$ 0';
    const number = 0;
    const actual = numberToLocaleStringWithoutDecimals(number);

    expect(actual).equals(expected);

  });

  it('should return "$ 79" when passing a raw number of 79.13 to the non-decimal utility', () => {

    const expected = '$ 79';
    const number = 79.13;
    const actual = numberToLocaleStringWithoutDecimals(number);

    expect(actual).equals(expected);

  });

  it('should return "$ 3,401" when passing a raw number of 3401.13 to the non-decimal utility', () => {

    const expected = '$ 3,401';
    const number = 3401.13;
    const actual = numberToLocaleStringWithoutDecimals(number);

    expect(actual).equals(expected);

  });


});
