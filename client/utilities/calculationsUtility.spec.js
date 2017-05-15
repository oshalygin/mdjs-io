import { expect } from 'chai';
import { percentDifference, percentageOf } from './calculationsUtility';

describe('Calculations Utilities', () => {

  it('should return 28.57% difference with a first value of 1500 and the second 2000', () => {

    const expected = '28.57%';
    
    const firstValue = 1500;
    const secondValue = 2000;
    const decimalPlaces = 2;

    const actual = percentDifference(firstValue, secondValue, decimalPlaces);

    expect(actual).equals(expected);

  });

  it('should return 28% difference with a first value of 1500 and the second 2000 when no decimal places is requested', () => {

    const expected = '29%';

    const firstValue = 1500;
    const secondValue = 2000;
    const decimalPlaces = 0;

    const actual = percentDifference(firstValue, secondValue, decimalPlaces);

    expect(actual).equals(expected);

  });

  it('should return 0% difference with a first value of 1500 and the second 1500 when no decimal places is requested', () => {

    const expected = '0%';

    const firstValue = 1500;
    const secondValue = 1500;
    const decimalPlaces = 0;

    const actual = percentDifference(firstValue, secondValue, decimalPlaces);

    expect(actual).equals(expected);

  });

  it('should return 0% difference with a first value of 0 and the second 0 when no decimal places is requested', () => {

    const expected = '0%';
    
    const firstValue = 0;
    const secondValue = 0;
    const decimalPlaces = 0;

    const actual = percentDifference(firstValue, secondValue, decimalPlaces);

    expect(actual).equals(expected);

  });

  it('should return 40% as the percentage of when calling percentageOf', () => {

    const expected = '40%';

    const numerator = 200;
    const total = 500;
    const decimalPlaces = 0;

    const actual = percentageOf(numerator, total, decimalPlaces);

    expect(actual).equals(expected);

  });

  it('should return 22% as the percentage of when calling percentageOf without a decimalPlace value', () => {

    const expected = '22%';

    const numerator = 200;
    const total = 900;

    const actual = percentageOf(numerator, total);

    expect(actual).equals(expected);

  });

  it('should return 22.222% as the percentage of when calling percentageOf with 3 decimal places', () => {

    const expected = '22.222%';

    const numerator = 200;
    const total = 900;
    const decimalPlaces = 3;

    const actual = percentageOf(numerator, total, decimalPlaces);

    expect(actual).equals(expected);

  });

  it('should return 0% as the percentage of when calling percentageOf where the total is 0', () => {

    const expected = '0%';

    const numerator = 0;
    const total = 0;
    const decimalPlaces = 3;

    const actual = percentageOf(numerator, total, decimalPlaces);

    expect(actual).equals(expected);

  });

});
