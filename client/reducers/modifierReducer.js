/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function modifierReducer(state = initialState.modifiers, action) {
  switch (action.type) {
    case actionTypes.LOAD_MODIFIERS_SUCCESS: {
      return [...action.modifiers];
    }
    default: {
      return state;
    }
  }
}
