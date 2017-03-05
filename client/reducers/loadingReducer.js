/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function loadingReducer(state = initialState.loading, action) {
  switch (action.type) {
    case actionTypes.LOADING_USER:
      {
        return {
          ...state,
          loadingUser: true
        };
      }
    case actionTypes.LOADING_ITEM_CREATED_OR_UPDATED:
      {
        return {
          ...state,
          createUpdateItem: true
        };
      }
    case actionTypes.LOADING_ITEM_CREATED_OR_UPDATED_SUCCESS:
      {
        return {
          ...state,
          createUpdateItem: false
        };
      }
    case actionTypes.LOADED_USER_SUCCESS:
      {
        return {
          ...state,
          loadingUser: false
        };
      }
    case actionTypes.LOADED_USER_FAILURE:
      {
        return {
          ...state,
          loadingUser: false
        };
      }
    case actionTypes.ITEM_DEACTIVATED:
      {
        return {
          ...state,
          loadingItems: true
        };
      }
    case actionTypes.ITEM_DEACTIVATED_SUCCESS:
      {
        return {
          ...state,
          loadingItems: false
        };
      }
    default:
      {
        return state;
      }
  }
}
