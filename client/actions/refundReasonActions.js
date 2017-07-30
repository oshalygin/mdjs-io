import * as actionTypes from './actionTypes';
import { xhrCallFailure } from './xhrStatusActions'; //eslint-disable-line

export function loadRefundReasonsSuccess(refundReasons) {
  return {
    type: actionTypes.LOAD_REFUNDREASONS_SUCCESS,
    refundReasons,
  };
}
