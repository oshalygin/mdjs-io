import { put, call, take, fork } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {
  getLoggedInUserSuccess,
  getLoggedInUserError,
} from '../actions/userActions';
import { loadCategoriesSuccess } from '../actions/categoryActions';
import { loadDiscountsSuccess } from '../actions/discountActions';
import { loadModifiersSuccess } from '../actions/modifierActions';
import { loadTaxesSuccess } from '../actions/taxActions';
import { loadItemsSuccess } from '../actions/itemActions';
import { loadRefundReasonsSuccess } from '../actions/refundReasonActions';

import api from '../utilities/api';
import {
  loadUserToken,
  persistUserToken,
  removeUserToken,
} from '../utilities/localStorage';

import { ACCOUNT_ENDPOINT } from '../utilities/endpoints';

export function* getLoggedInUser() {
  try {
    const token = yield call(loadUserToken);

    const endpoint = `${ACCOUNT_ENDPOINT}?token=${token}`;
    const response = yield call(api.get, endpoint);

    const data = response.data;

    yield put(loadCategoriesSuccess(data.companyData.categories));
    yield put(loadDiscountsSuccess(data.companyData.discounts));
    yield put(loadItemsSuccess(data.companyData.items));
    yield put(loadTaxesSuccess(data.companyData.taxes));
    yield put(loadModifiersSuccess(data.companyData.modifiers));
    yield put(loadRefundReasonsSuccess(data.companyData.refundReasons));
    yield call(persistUserToken, data.token);

    yield put(getLoggedInUserSuccess(data));
  } catch (error) {
    yield call(removeUserToken());
    yield put(getLoggedInUserError());
  }
}

/* WATCHERS */

export function* retrieveLoggedInUser() {
  while (true) {
    yield take(actionTypes.REQUEST_LOGGED_IN_USER);
    yield fork(getLoggedInUser);
  }
}

export default [retrieveLoggedInUser];
