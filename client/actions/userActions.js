import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOADING_USER,
  LOADED_USER_SUCCESS,
  LOADED_USER_FAILURE

} from './actionTypes';
import {
  LOGIN_ENDPOINT,
  LOGIN_TOKEN_ENDPOINT
} from './httpEndpoints';
import { getJsonHeaders } from '../utilities/requestUtilities';
import { persistUserToken, removeUserToken } from '../utilities/localStorage';
import { loadCategoriesSuccess } from './categoryActions';
import { loadDiscountsSuccess } from './discountActions';
import { loadModifiersSuccess } from './modifierActions';
import { loadTaxesSuccess } from './taxActions';
import { loadItemsSuccess } from './itemActions';
import { loadRefundReasonsSuccess } from './refundReasonActions';

import axios from 'axios';

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function loadingUser() {
  return {
    type: LOADING_USER
  };
}

export function loadedUserSuccess() {
  return {
    type: LOADED_USER_SUCCESS
  };
}

export function loadedUserFailure() {
  return {
    type: LOADED_USER_FAILURE
  };
}

export function login(user) {
  return function (dispatch) {
    dispatch(loadingUser());
    return axios
      .post(LOGIN_ENDPOINT,
      {
        email: user.email,
        password: user.password
      },
      getJsonHeaders())
      .then(userResponse => {
        if (!userResponse.data.success) {
          throw (userResponse.data.message);
        }
        dispatch(loginSuccess(userResponse.data.data));
        dispatch(loadCategoriesSuccess(userResponse.data.data.companyData.categories));
        dispatch(loadDiscountsSuccess(userResponse.data.data.companyData.discounts));
        dispatch(loadItemsSuccess(userResponse.data.data.companyData.items));
        dispatch(loadTaxesSuccess(userResponse.data.data.companyData.taxes));
        dispatch(loadModifiersSuccess(userResponse.data.data.companyData.modifiers));
        dispatch(loadRefundReasonsSuccess(userResponse.data.data.companyData.refundReasons));
        dispatch(loadedUserSuccess());
        persistUserToken(userResponse.data.data.token);
      })
      .catch(error => {
        dispatch(loadedUserFailure());
        throw (error);
      });
  };
}

export function loginWithToken(dispatch, tokenKey) {
  return function () {
    dispatch(loadingUser());
    return axios
      .post(LOGIN_TOKEN_ENDPOINT,
      {
        token: tokenKey
      },
      getJsonHeaders())
      .then(userResponse => {
        dispatch(loginSuccess(userResponse.data.data));
        dispatch(loadCategoriesSuccess(userResponse.data.data.companyData.categories));
        dispatch(loadDiscountsSuccess(userResponse.data.data.companyData.discounts));
        dispatch(loadItemsSuccess(userResponse.data.data.companyData.items));
        dispatch(loadTaxesSuccess(userResponse.data.data.companyData.taxes));
        dispatch(loadModifiersSuccess(userResponse.data.data.companyData.modifiers));
        dispatch(loadRefundReasonsSuccess(userResponse.data.data.companyData.refundReasons));
        dispatch(loadedUserSuccess());
        persistUserToken(userResponse.data.data.token);
      })
      .catch((error) => {
        dispatch(loadedUserFailure());
        throw (error);
      });
  };
}

export function loginValidationErrors() {
  return async function (dispatch) {
    dispatch(loadedUserFailure());
  };
}

export function logout() {
  return async function (dispatch) {
    removeUserToken();
    dispatch(logoutSuccess());
  };
}
