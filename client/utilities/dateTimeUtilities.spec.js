import dateFns from 'date-fns';
import { getLastNumberOfMonthsArray } from './dateTimeUtilities';

import { expect } from 'chai';

describe('http endpoints', () => {

  it('should contain the same number of elements in the array as the passed in months', () => {

    const months = 7;
    const expected = months;
    const actual = getLastNumberOfMonthsArray(months)
      .length;

    expect(actual).equals(expected);

  });

  it('should set the first value in the array with the current month value', () => {

    const months = 7;
    const expected = new Date().getMonth();
    const actual = getLastNumberOfMonthsArray(months)[0].monthValue;

    expect(actual).equals(expected);

  });

  it('should set the first value in the array with the current month display name', () => {

    const months = 7;
    const expected = dateFns.format(new Date(), 'MMM');
    const actual = getLastNumberOfMonthsArray(months)[0].displayName;

    expect(actual).equals(expected);

  });

  it('should set the first value in the array with the current year', () => {

    const months = 7;
    const expected = new Date().getFullYear();
    const actual = getLastNumberOfMonthsArray(months)[0].year;

    expect(actual).equals(expected);

  });

  it('should set the first value in the array with the current month value with a base of 1', () => {

    const months = 7;
    const expected = new Date().getMonth() + 1;
    const actual = getLastNumberOfMonthsArray(months)[0].monthDisplayValue;

    expect(actual).equals(expected);

  });

  it('should set the second value in the array with the current month value with a base of 1', () => {

    const months = 7;
    const expected = new Date().getMonth();
    const actual = getLastNumberOfMonthsArray(months)[1].monthDisplayValue;

    expect(actual).equals(expected);

  });

});
