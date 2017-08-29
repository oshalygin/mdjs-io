import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOADING_USER,
  LOADED_USER_SUCCESS,
  LOADED_USER_FAILURE,
  REQUEST_LOGGED_IN_USER,
  GET_LOGGED_IN_USER_ERROR,
  GET_LOGGED_IN_USER_SUCCESS,
  REQUEST_LOGIN,
  LOGIN_ERROR,
} from './actionTypes';
import { ACCOUNT_ENDPOINT } from '../utilities/endpoints.js';
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
    user,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function loadingUser() {
  return {
    type: LOADING_USER,
  };
}

export const retrieveLoggedInUser = () => ({
  type: REQUEST_LOGGED_IN_USER,
});

export const userLogin = data => ({
  type: REQUEST_LOGIN,
  data,
});

export const userLoginValidationErrors = () => ({
  type: LOGIN_ERROR,
});

export function getLoggedInUserError() {
  return {
    type: GET_LOGGED_IN_USER_ERROR,
  };
}

export const getLoggedInUserSuccess = data => ({
  type: GET_LOGGED_IN_USER_SUCCESS,
  data,
});

export function loadedUserSuccess() {
  return {
    type: LOADED_USER_SUCCESS,
  };
}

export function loadedUserFailure() {
  return {
    type: LOADED_USER_FAILURE,
  };
}

export async function loginWithToken(dispatch, tokenKey) {
  dispatch(loadingUser());

  try {
    const headers = getJsonHeaders();
    const endpoint = `${ACCOUNT_ENDPOINT}?token=${tokenKey}`;

    const userAccountResponse = await axios.get(endpoint, headers);

    dispatch(loginSuccess(userAccountResponse.data));
    dispatch(
      loadCategoriesSuccess(userAccountResponse.data.companyData.categories),
    );
    dispatch(
      loadDiscountsSuccess(userAccountResponse.data.companyData.discounts),
    );
    dispatch(loadItemsSuccess(userAccountResponse.data.companyData.items));
    dispatch(loadTaxesSuccess(userAccountResponse.data.companyData.taxes));
    dispatch(
      loadModifiersSuccess(userAccountResponse.data.companyData.modifiers),
    );
    dispatch(
      loadRefundReasonsSuccess(
        userAccountResponse.data.companyData.refundReasons,
      ),
    );
    dispatch(loadedUserSuccess());
    persistUserToken(userAccountResponse.data.token);
  } catch (error) {
    removeUserToken();
    dispatch(loadedUserFailure());
    throw error;
  }
}

export function login(user) {
  return async function(dispatch) {
    dispatch(loadingUser());
    try {
      const headers = getJsonHeaders();
      const accountResponse = await axios.post(
        ACCOUNT_ENDPOINT,
        {
          username: user.email,
          password: user.password,
        },
        headers,
      );

      const token = accountResponse.data.token;

      persistUserToken(token);
      await loginWithToken(dispatch, token);
    } catch (error) {
      dispatch(loadedUserFailure());
      throw error;
    }
  };
}

export function loginValidationErrors() {
  return async function(dispatch) {
    dispatch(loadedUserFailure());
  };
}

export function logout() {
  return async function(dispatch) {
    removeUserToken();
    dispatch(logoutSuccess());
  };
}
