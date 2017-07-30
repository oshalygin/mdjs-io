import { expect } from 'chai';
import * as actionTypes from '../actions/actionTypes';
import reducer from './loadingReducer';

describe('Reducer - Loading', () => {
  const getInitialState = () => {
    return {
      loadingUser: false,
      loadingOrders: true,
      loadingMonthlySummary: true,
    };
  };

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {
    const action = {
      type: 'UNKNOWN',
    };

    const expected = getInitialState();
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).to.deep.equal(expected);
  });

  it('should set the loadingItems flag to true on a ITEM_DEACTIVATED dispatch', () => {
    const action = {
      type: actionTypes.ITEM_DEACTIVATED,
    };

    const expected = true;
    const actual = reducer(getInitialState(), action).loadingItems;

    expect(actual).equals(expected);
  });

  it('should set the loadingItems flag to false on a ITEM_DEACTIVATED_SUCCESS dispatch', () => {
    const action = {
      type: actionTypes.ITEM_DEACTIVATED_SUCCESS,
    };

    const expected = false;
    const actual = reducer(getInitialState(), action).loadingItems;

    expect(actual).equals(expected);
  });

  it('should set the loadingUser flag to false on a LOGOUT_SUCCESS dispatch', () => {
    const action = {
      type: actionTypes.LOGOUT_SUCCESS,
    };

    const expected = false;
    const actual = reducer(getInitialState(), action).loadingUser;

    expect(actual).equals(expected);
  });

  it('should set the loadingMonthlySummary flag to true on a "LOADING_MONTHLY_SUMMARY" dispatch', () => {
    const action = {
      type: actionTypes.LOADING_MONTHLY_SUMMARY,
    };

    const expected = true;
    const actual = reducer(getInitialState(), action).loadingMonthlySummary;

    expect(actual).equals(expected);
  });

  it('should set the loadingMonthlySummary flag to false on a "LOAD_MONTHLY_SUMMARY_SUCCESS" dispatch', () => {
    const action = {
      type: actionTypes.LOAD_MONTHLY_SUMMARY_SUCCESS,
    };

    const expected = false;
    const actual = reducer(getInitialState(), action).loadingMonthlySummary;

    expect(actual).equals(expected);
  });
});
