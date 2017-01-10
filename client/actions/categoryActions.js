import * as actionTypes from './actionTypes';
import { xhrCallFailure } from './xhrStatusActions'; //eslint-disable-line

export function loadCategoriesSuccess(categories) {
  return {
    type: actionTypes.LOAD_CATEGORIES_SUCCESS,
    categories
  };
}
