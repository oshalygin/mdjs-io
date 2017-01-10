/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function categoryReducer(state = initialState.discounts, action) {
  switch (action.type) {
    case actionTypes.LOAD_DISCOUNTS_SUCCESS: {
      return [...action.discounts];
    }
    default: {
      return state;
    }
  }
}
