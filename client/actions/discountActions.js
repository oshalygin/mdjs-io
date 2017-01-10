import * as actionTypes from './actionTypes';
import { xhrCallFailure } from './xhrStatusActions'; //eslint-disable-line

export function loadDiscountsSuccess(discounts) {
  return {
    type: actionTypes.LOAD_DISCOUNTS_SUCCESS,
    discounts
  };
}
