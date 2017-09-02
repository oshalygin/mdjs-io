/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function notificationReducer(
  state = initialState.notification,
  action,
) {
  switch (action.type) {
    case actionTypes.SAVE_NOTIFICATION_SUCCESS: {
      return action.data.message;
    }
    case actionTypes.REMOVE_NOTIFICATIONS: {
      return '';
    }
    default: {
      return state;
    }
  }
}
