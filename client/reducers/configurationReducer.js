/* eslint-disable indent */
import initialState from './initialState';
import * as actionTypes from '../actions/actionTypes.js';

export default function configurationReducer(
  state = initialState.configuration,
  action,
) {
  switch (action.type) {
    case actionTypes.GET_CONFIGURATION_SUCCESS: {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
