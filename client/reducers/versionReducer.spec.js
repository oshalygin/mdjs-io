/* eslint-disable indent */

import { expect } from 'chai';
import { LOAD_VERSION_SUCCESS } from '../actions/actionTypes';
import reducer from './versionReducer';

describe('Reducer - Version', () => {
  const getInitialState = () => {
    return '';
  };

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {
    const action = {
      type: 'UNKNOWN',
    };

    const expected = getInitialState();
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).to.deep.equal(expected);
  });

  it('should set the version to the version value when LOAD_VERSION_SUCCESS dispatches', () => {
    const action = {
      type: LOAD_VERSION_SUCCESS,
      version: '1.8.8',
    };

    const expected = '1.8.8';
    const actual = reducer(getInitialState(), action);

    expect(actual).equals(expected);
  });
});
