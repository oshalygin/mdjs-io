import { browserHistory } from 'react-router';
import { put, call, take, fork } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as categoryActions from '../actions/categoryActions';

import api from '../utilities/api';
import { CATEGORIES_ENDPOINT } from '../utilities/endpoints';

export function* createCategory(category) {

  yield put(categoryActions.loadingCategoryCreation());

  try {

    const response = yield call(api.post, CATEGORIES_ENDPOINT, category);
    const data = response.data;

    yield put(categoryActions.categoryCreatedSuccess(data));
    yield put(categoryActions.loadingCategoryCreationSuccess());
    browserHistory.push('categories');

  } catch (error) {
    yield put(categoryActions.categoryCreationFailure());
  }
}

export function* updateCategory(category) {

  yield put(categoryActions.loadingCategoryUpdate());

  try {
    const endpoint = `${CATEGORIES_ENDPOINT}/${category.categoryID}`;

    const response = yield call(api.put, endpoint, category);
    const data = response.data;

    yield put(categoryActions.categoryUpdatedSuccess(data));
    yield put(categoryActions.loadingCategoryUpdateSuccess());
    browserHistory.push('categories');

  } catch (error) {
    yield put(categoryActions.categoryUpdateFailure());
  }
}


export function* deleteCategory(category) {

  const deactivatedCategory = {
    ...category,
    isActive: false,
    disabled: true
  };

  yield put(categoryActions.categoryDeactivated());

  try {
    const endpoint = `${CATEGORIES_ENDPOINT}/${deactivatedCategory.categoryID}`;  
    yield call(api.delete, endpoint);

    yield put(categoryActions.categoryDeactivatedSuccess(deactivatedCategory));

  } catch (error) {
    yield put(categoryActions.categoryDeactivatedFailure());
  }

}

/* WATCHERS */

export function* categoryCreation() {
  while (true) {
    const action = yield take(actionTypes.TRIGGER_CATEGORY_CREATION);
    yield fork(createCategory, action.data);
  }
}

export function* categoryUpdates() {
  while (true) {
    const action = yield take(actionTypes.TRIGGER_CATEGORY_UPDATE);
    yield fork(updateCategory, action.data);
  }
}

export function* categoryDeletion() {
  while (true) {
    const action = yield take(actionTypes.TRIGGER_CATEGORY_DELETE);
    yield fork(deleteCategory, action.data);
  }
}

export default [
  categoryCreation,
  categoryUpdates,
  categoryDeletion
];
