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
    case actionTypes.LOADING_ITEM_CREATION:
    case actionTypes.LOADING_ITEM_UPDATE:
      {
        return {
          ...state,
          createUpdateItem: true
        };
      }
    case actionTypes.LOADING_CATEGORY_CREATION:
    case actionTypes.LOADING_CATEGORY_UPDATE:
      {
        return {
          ...state,
          createUpdateCategory: true
        };
      }
    case actionTypes.LOADING_ITEM_CREATION_SUCCESS:
    case actionTypes.LOADING_ITEM_UPDATE_SUCCESS:
    case actionTypes.ITEM_CREATION_FAILURE:
    case actionTypes.ITEM_UPDATE_FAILURE:
      {
        return {
          ...state,
          createUpdateItem: false
        };
      }
    case actionTypes.LOADING_CATEGORY_CREATION_SUCCESS:
    case actionTypes.LOADING_CATEGORY_UPDATE_SUCCESS:
    case actionTypes.CATEGORY_CREATION_FAILURE:
    case actionTypes.CATEGORY_UPDATE_FAILURE:
      {
        return {
          ...state,
          createUpdateCategory: false
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
    case actionTypes.LOGOUT_SUCCESS:
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
    case actionTypes.CATEGORY_DEACTIVATED:
      {
        return {
          ...state,
          loadingCategories: true
        };
      }
    case actionTypes.ITEM_DEACTIVATED_SUCCESS:
      {
        return {
          ...state,
          loadingItems: false
        };
      }
    case actionTypes.CATEGORY_DEACTIVATED_SUCCESS:
      {
        return {
          ...state,
          loadingCategories: false
        };
      }
    default:
      {
        return state;
      }
  }
}
