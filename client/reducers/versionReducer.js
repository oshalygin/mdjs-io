/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function versionReducer(state = initialState.version, action) {
  switch (action.type) {
    case actionTypes.LOAD_VERSION_SUCCESS: {
      return action.version;
    }
    default: {
      return state;
    }
  }
}
