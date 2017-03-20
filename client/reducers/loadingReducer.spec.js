/* eslint-disable indent */

import { expect } from 'chai';
import {
  ITEM_DEACTIVATED,
  ITEM_DEACTIVATED_SUCCESS,
  LOGOUT_SUCCESS
} from '../actions/actionTypes';
import reducer from './loadingReducer';


describe('Reducer - Loading', () => {

  const getInitialState = () => {
    return {
      loadingUser: false
    };
  };

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {
    const action = {
      type: 'UNKNOWN'
    };

    const expected = getInitialState();
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).to.deep.equal(expected);
  });

  it('should set the loadingItems flag to true on a ITEM_DEACTIVATED dispatch', () => {

    const action = {
      type: ITEM_DEACTIVATED
    };

    const expected = true;
    const actual = reducer(getInitialState(), action)
      .loadingItems;


    expect(actual).equals(expected);

  });

  it('should set the loadingItems flag to false on a ITEM_DEACTIVATED_SUCCESS dispatch', () => {

    const action = {
      type: ITEM_DEACTIVATED_SUCCESS
    };

    const expected = false;
    const actual = reducer(getInitialState(), action)
      .loadingItems;


    expect(actual).equals(expected);

  });

  it('should set the loadingUser flag to false on a LOGOUT_SUCCESS dispatch', () => {

    const action = {
      type: LOGOUT_SUCCESS
    };

    const expected = false;
    const actual = reducer(getInitialState(), action)
      .loadingUser;


    expect(actual).equals(expected);

  });

});
