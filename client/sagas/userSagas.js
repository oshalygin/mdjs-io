import { put, call, take, fork } from 'redux-saga/effects';
import history from '../utilities/history';

import * as actionTypes from '../actions/actionTypes';

import {
  retrieveLoggedInUser,
  getLoggedInUserSuccess,
  getLoggedInUserError,
  userLoginValidationErrors,
  logoutSuccess,
} from '../actions/userActions';
import { saveNotification } from '../actions/notificationActions';

import { loadCategoriesSuccess } from '../actions/categoryActions';
import { loadDiscountsSuccess } from '../actions/discountActions';
import { loadModifiersSuccess } from '../actions/modifierActions';
import { loadTaxesSuccess } from '../actions/taxActions';
import { loadItemsSuccess } from '../actions/itemActions';
import { loadRefundReasonsSuccess } from '../actions/refundReasonActions';

import api from '../utilities/api';
import accountUtilities from '../utilities/accountUtilities';
import { ACCOUNT_ENDPOINT } from '../utilities/endpoints';

export function* getLoggedInUser() {
  try {
    const token = yield call(accountUtilities.loadToken);
    if (!token) {
      yield call(accountUtilities.removeToken);
      yield put(getLoggedInUserError());
      yield call(history.push, '/login');
    } else {
      const response = yield call(api.get, ACCOUNT_ENDPOINT);
      const data = response.data;

      yield put(loadCategoriesSuccess(data.companyData.categories));
      yield put(loadDiscountsSuccess(data.companyData.discounts));
      yield put(loadItemsSuccess(data.companyData.items));
      yield put(loadTaxesSuccess(data.companyData.taxes));
      yield put(loadModifiersSuccess(data.companyData.modifiers));
      yield put(loadRefundReasonsSuccess(data.companyData.refundReasons));

      yield put(getLoggedInUserSuccess(data));
      yield call(history.push, '/dashboard');
    }
  } catch (error) {
    yield call(history.push, '/login');
    yield call(accountUtilities.removeToken);
    yield put(getLoggedInUserError());
  }
}

export function* login(loginPostData) {
  try {
    yield call(api.post, ACCOUNT_ENDPOINT, {
      username: loginPostData.email,
      password: loginPostData.password,
    });

    yield put(retrieveLoggedInUser());
  } catch (error) {
    yield put(userLoginValidationErrors());

    const message =
      error.response && error.response.data
        ? error.response.data
        : 'Could not login';

    yield put(saveNotification({ message }));
  }
}

export function* logout() {
  yield call(accountUtilities.removeToken);
  yield put(logoutSuccess());
}

/* WATCHERS */

export function* retrieveUserWithToken() {
  while (true) {
    yield take(actionTypes.REQUEST_LOGGED_IN_USER);
    yield fork(getLoggedInUser);
  }
}

export function* loginUser() {
  while (true) {
    const action = yield take(actionTypes.REQUEST_LOGIN);
    yield fork(login, action.data);
  }
}

export function* logoutUser() {
  while (true) {
    const action = yield take(actionTypes.REQUEST_LOGOUT);
    yield fork(logout, action.data);
  }
}

export default [retrieveUserWithToken, loginUser, logoutUser];
