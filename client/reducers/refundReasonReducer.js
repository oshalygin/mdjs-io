/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function refundReasonReducer(
  state = initialState.refundReasons,
  action,
) {
  switch (action.type) {
    case actionTypes.LOAD_REFUNDREASONS_SUCCESS: {
      return [...action.refundReasons];
    }
    default: {
      return state;
    }
  }
}
