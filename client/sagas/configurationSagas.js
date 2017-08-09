import { put, call, take, fork } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  getConfigurationSuccess,
  getConfigurationError,
} from '../actions/configurationActions';

import api from '../utilities/api';

import { CONFIGURATION_ENDPOINT } from '../utilities/endpoints';

export function* getConfiguration() {
  try {
    const response = yield call(api.get, CONFIGURATION_ENDPOINT);
    const data = response.data;
    yield put(getConfigurationSuccess(data));
  } catch (error) {
    yield put(getConfigurationError());
  }
}

/* WATCHERS */

export function* retrieveConfiguration() {
  while (true) {
    yield take(actionTypes.REQUEST_APPLICATION_CONFIGURATION);
    yield fork(getConfiguration);
  }
}

export default [retrieveConfiguration];
