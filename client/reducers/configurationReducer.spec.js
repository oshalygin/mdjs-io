import { expect } from 'chai';
import * as actionTypes from '../actions/actionTypes';
import reducer from './configurationReducer';

describe('Reducer - Configuration', () => {
  const getInitialState = () => {
    return {
      configuration: {},
    };
  };

  const configuration = {
    googleMapsApiKey: 'some-api-key',
  };

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {
    const action = {
      type: 'UNKNOWN',
    };
    const expected = getInitialState();
    const actual = reducer(getInitialState(), action);

    expect(actual).deep.equals(expected);
  });

  it('should set the configuration state to the retrieved object on a successful action dispatch', () => {
    const action = {
      type: actionTypes.GET_CONFIGURATION_SUCCESS,
      data: configuration,
    };
    const currentState = {};
    const expected = configuration;

    const actual = reducer(currentState, action);

    expect(actual).deep.equals(expected);
  });
});
