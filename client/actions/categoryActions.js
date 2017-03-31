import axios from 'axios';

import { getHeaders } from '../utilities/requestUtilities';
import * as actionTypes from './actionTypes';
import { CATEGORIES_ENDPOINT } from '../utilities/endpoints';
import { loadUserToken } from '../utilities/localStorage';

export function loadCategoriesSuccess(categories) {
  return {
    type: actionTypes.LOAD_CATEGORIES_SUCCESS,
    categories
  };
}

export function categoryDeactivated() {
  return {
    type: actionTypes.CATEGORY_DEACTIVATED
  };
}

export function categoryDeactivatedSuccess(category) {
  return {
    type: actionTypes.CATEGORY_DEACTIVATED_SUCCESS,
    category
  };
}

export function loadingCategoryCreationSuccess() {
  return {
    type: actionTypes.LOADING_CATEGORY_CREATION_SUCCESS
  };
}


export function loadingCategoryCreation() {
  return {
    type: actionTypes.LOADING_CATEGORY_CREATION
  };
}

export function categoryCreatedSuccess(category) {

  return {
    type: actionTypes.CATEGORY_CREATED,
    category
  };
}

export function categoryCreationFailure() {
  return {
    type: actionTypes.CATEGORY_CREATION_FAILURE
  };
}

export function loadingCategoryUpdate() {
  return {
    type: actionTypes.LOADING_CATEGORY_UPDATE
  };
}

export function categoryUpdatedSuccess(category) {
  return {
    type: actionTypes.CATEGORY_UPDATED,
    category
  };
}

export function loadingCategoryUpdateSuccess() {
  return {
    type: actionTypes.LOADING_CATEGORY_UPDATE_SUCCESS
  };
}

export function categoryUpdateFailure() {
  return {
    type: actionTypes.CATEGORY_UPDATE_FAILURE
  };
}


export function createCategory(category) {
  return async function (dispatch) {

    dispatch(loadingCategoryCreation());

    try {

      const token = loadUserToken();
      
      const headers = getHeaders(token);
      const createdCategoryResponse = await axios.post(CATEGORIES_ENDPOINT, category, headers);
      const createdCategory = createdCategoryResponse.data;

      dispatch(categoryCreatedSuccess(createdCategory));
      dispatch(loadingCategoryCreationSuccess());

    } catch (error) {
      dispatch(categoryCreationFailure());
      throw (error);
    }
  };
}

export function updateCategory(category) {
  return async function (dispatch) {

    dispatch(loadingCategoryUpdate());

    try {
      
      const token = loadUserToken();
      const headers = getHeaders(token);
      const endpoint = `${CATEGORIES_ENDPOINT}/${category.categoryID}`;

      const updatedCategoryResponse = await axios.put(endpoint, category, headers);
      const updatedCategory = updatedCategoryResponse.data;

      dispatch(categoryUpdatedSuccess(updatedCategory));
      dispatch(loadingCategoryUpdateSuccess());

    } catch (error) {
      dispatch(categoryUpdateFailure());
      throw (error);
    }
  };
}

export function deactivateCategory(category) {
  return async function (dispatch) {

    const deactivatedCategory = {
      ...category,
      isActive: false,
      disabled: true
    };

    dispatch(categoryDeactivated());

    const token = loadUserToken();
    const endpoint = `${CATEGORIES_ENDPOINT}/${deactivatedCategory.categoryID}`;

    try {
      const headers = getHeaders(token);
      await axios.delete(endpoint, headers);

      dispatch(categoryDeactivatedSuccess(deactivatedCategory));

    } catch (error) {
      throw (error);
    }

  };
}
