import { expect } from 'chai';
import { percentDifference } from './calculationsUtility';

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

});
