/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function loadingReducer(state = initialState.loading, action) {
  switch (action.type) {
    case actionTypes.REQUEST_LOGGED_IN_USER: {
      return { ...state, loadingUser: true };
    }
    case actionTypes.GET_LOGGED_IN_USER_SUCCESS:
    case actionTypes.GET_LOGGED_IN_USER_ERROR: {
      return { ...state, loadingUser: false, loadingUserLogin: false };
    }
    case actionTypes.LOADING_ITEM_CREATION:
    case actionTypes.LOADING_ITEM_UPDATE: {
      return { ...state, createUpdateItem: true };
    }
    case actionTypes.LOADING_CATEGORY_CREATION:
    case actionTypes.LOADING_CATEGORY_UPDATE: {
      return { ...state, createUpdateCategory: true };
    }
    case actionTypes.LOADING_MODIFIER_CREATION:
    case actionTypes.LOADING_MODIFIER_UPDATE: {
      return { ...state, createUpdateModifier: true };
    }
    case actionTypes.LOADING_TAX_CREATION:
    case actionTypes.LOADING_TAX_UPDATE: {
      return { ...state, createUpdateTax: true };
    }
    case actionTypes.LOADING_ITEM_CREATION_SUCCESS:
    case actionTypes.LOADING_ITEM_UPDATE_SUCCESS:
    case actionTypes.ITEM_CREATION_FAILURE:
    case actionTypes.ITEM_UPDATE_FAILURE: {
      return { ...state, createUpdateItem: false };
    }
    case actionTypes.LOADING_TAX_CREATION_SUCCESS:
    case actionTypes.LOADING_TAX_UPDATE_SUCCESS:
    case actionTypes.TAX_CREATION_FAILURE:
    case actionTypes.TAX_UPDATE_FAILURE: {
      return { ...state, createUpdateTax: false };
    }
    case actionTypes.LOADING_MODIFIER_CREATION_SUCCESS:
    case actionTypes.LOADING_MODIFIER_UPDATE_SUCCESS:
    case actionTypes.MODIFIER_CREATION_FAILURE:
    case actionTypes.MODIFIER_UPDATE_FAILURE: {
      return { ...state, createUpdateModifier: false };
    }
    case actionTypes.LOADING_CATEGORY_CREATION_SUCCESS:
    case actionTypes.LOADING_CATEGORY_UPDATE_SUCCESS:
    case actionTypes.CATEGORY_CREATION_FAILURE:
    case actionTypes.CATEGORY_UPDATE_FAILURE: {
      return { ...state, createUpdateCategory: false };
    }
    case actionTypes.LOADED_USER_SUCCESS: {
      return { ...state, loadingUser: false };
    }
    case actionTypes.LOADED_USER_FAILURE:
    case actionTypes.LOGOUT_SUCCESS: {
      return { ...state, loadingUser: false };
    }
    case actionTypes.ITEM_DEACTIVATED: {
      return { ...state, loadingItems: true };
    }
    case actionTypes.MODIFIER_DEACTIVATED: {
      return { ...state, loadingModifiers: true };
    }
    case actionTypes.CATEGORY_DEACTIVATED: {
      return { ...state, loadingCategories: true };
    }
    case actionTypes.TAX_DEACTIVATED: {
      return { ...state, loadingTaxes: true };
    }
    case actionTypes.ITEM_DEACTIVATED_SUCCESS: {
      return { ...state, loadingItems: false };
    }
    case actionTypes.MODIFIER_DEACTIVATED_SUCCESS: {
      return { ...state, loadingModifiers: false };
    }
    case actionTypes.CATEGORY_DEACTIVATED_SUCCESS: {
      return { ...state, loadingCategories: false };
    }
    case actionTypes.TAX_DEACTIVATED_SUCCESS: {
      return { ...state, loadingTaxes: false };
    }
    case actionTypes.LOADING_ORDERS: {
      return { ...state, loadingOrders: true };
    }
    case actionTypes.LOADING_ORDER_DETAIL: {
      return { ...state, loadingOrderDetail: true };
    }
    case actionTypes.LOAD_ORDER_DETAIL_SUCCESS: {
      return { ...state, loadingOrderDetail: false };
    }
    case actionTypes.LOAD_ORDERS_SUCCESS: {
      return { ...state, loadingOrders: false };
    }
    case actionTypes.LOADING_MONTHLY_SUMMARY: {
      return { ...state, loadingMonthlySummary: true };
    }
    case actionTypes.LOAD_MONTHLY_SUMMARY_SUCCESS: {
      return { ...state, loadingMonthlySummary: false };
    }
    case actionTypes.REQUEST_LOGIN: {
      return { ...state, loadingUserLogin: true };
    }
    case actionTypes.LOGIN_ERROR: {
      return { ...state, loadingUserLogin: false };
    }
    default: {
      return state;
    }
  }
}
