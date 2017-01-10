import * as actionTypes from './actionTypes';
import { xhrCallFailure } from './xhrStatusActions'; //eslint-disable-line

export function loadTaxesSuccess(taxes) {
  return {
    type: actionTypes.LOAD_TAXES_SUCCESS,
    taxes
  };
}
