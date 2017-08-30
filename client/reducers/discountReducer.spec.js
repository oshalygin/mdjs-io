import {
  DISCOUNT_DEACTIVATED_SUCCESS,
  LOAD_DISCOUNTS_SUCCESS,
} from '../actions/actionTypes';
import reducer from './discountReducer';

describe('Reducer - Discount', () => {
  const getInitialState = () => {
    return [];
  };

  const discounts = [
    {
      discountID: 31,
      discountTypeID: 0,
      discountName: 'Neighbor Discount',
      value: 10,
      applyTypeID: 0,
      items: [],
      lastUpdatedDate: '2017-04-13T21:33:36.087',
      createdDate: '2017-04-13T21:33:36.087',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
    {
      discountID: 32,
      discountTypeID: 1,
      discountName: 'Best Friend',
      value: 5,
      applyTypeID: 0,
      items: [],
      lastUpdatedDate: '2017-04-13T21:44:51.023',
      createdDate: '2017-04-13T21:44:51.023',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
  ];

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {
    const action = {
      type: 'UNKNOWN',
    };

    const expected = getInitialState();
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).toEqual(expected);
  });

  it('should hydrate the state with all of the discounts in the action in addition to the additional checked and disabled properties', () => {
    const action = {
      type: LOAD_DISCOUNTS_SUCCESS,
      discounts,
    };

    const expected = discounts;
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).toEqual(expected);
  });

  it('should remove the discount that was passed in as part of the DISCOUNT_DEACTIVATED_SUCCESS dispatched action', () => {
    const action = {
      type: DISCOUNT_DEACTIVATED_SUCCESS,
      discount: discounts[0],
    };

    const expected = 1;
    const actual = reducer(discounts, action).length;

    expect(actual).toEqual(expected);
  });
});
