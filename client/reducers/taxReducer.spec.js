import { expect } from 'chai';
import {
  TAX_DEACTIVATED_SUCCESS,
  LOAD_TAXES_SUCCESS
} from '../actions/actionTypes';
import reducer from './taxReducer';


describe('Reducer - Tax', () => {

  const getInitialState = () => {
    return [];
  };

  const taxes = [
    {
      taxID: 19,
      taxName: 'Texas',
      taxTypeID: 0,
      items: [],
      value: 80,
      lastUpdatedDate: '2017-04-01T13:35:21.583',
      createdDate: '2017-04-01T13:35:21.583',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0
    },
    {
      taxID: 20,
      taxName: 'CA',
      taxTypeID: 0,
      items: [],
      value: 10,
      lastUpdatedDate: '2017-04-01T13:35:21.583',
      createdDate: '2017-04-01T13:35:21.583',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0
    }
  ];

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {
    const action = {
      type: 'UNKNOWN'
    };

    const expected = getInitialState();
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).to.deep.equal(expected);
  });

  it('should hydrate the state with all of the taxes in the action in addition to the additional checked and disabled properties', () => {

    const action = {
      type: LOAD_TAXES_SUCCESS,
      taxes
    };

    const expected = taxes;
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).deep.equals(expected);

  });

  it('should remove the tax that was passed in as part of the TAX_DEACTIVATED_SUCCESS dispatched action', () => {

    const action = {
      type: TAX_DEACTIVATED_SUCCESS,
      tax: taxes[0]
    };

    const expected = 1;
    const actual = reducer(taxes, action)
      .length;

    expect(actual).equals(expected);

  });

});
