/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function categoryReducer(state = initialState.categories, action) {
  switch (action.type) {
    case actionTypes.LOAD_CATEGORIES_SUCCESS: {
      return [...action.categories];
    }
    default: {
      return state;
    }
  }
}
