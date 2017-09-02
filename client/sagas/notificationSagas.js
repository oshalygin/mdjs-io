import { put, take, fork } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import {
  removeNotificationsSuccess,
  saveNotificationSuccess,
} from '../actions/notificationActions';

export function* save(message) {
  yield put(saveNotificationSuccess({ message }));
}

export function* remove() {
  yield put(removeNotificationsSuccess());
}

/* WATCHERS */
export function* removeNotifications() {
  while (true) {
    yield take(actionTypes.REMOVE_NOTIFICATIONS);
    yield fork(remove);
  }
}

export function* saveNotification() {
  while (true) {
    const { data } = yield take(actionTypes.SAVE_NOTIFICATION);
    yield fork(save, data.message);
  }
}

export default [removeNotifications, saveNotification];
