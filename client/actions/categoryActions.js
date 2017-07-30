import * as actionTypes from './actionTypes';

export const loadCategoriesSuccess = categories => ({
  type: actionTypes.LOAD_CATEGORIES_SUCCESS,
  categories,
});

export const categoryDeactivated = () => ({
  type: actionTypes.CATEGORY_DEACTIVATED,
});

export const categoryDeactivatedSuccess = category => ({
  type: actionTypes.CATEGORY_DEACTIVATED_SUCCESS,
  category,
});

export const categoryDeactivatedFailure = () => ({
  type: actionTypes.CATEGORY_DEACTIVATED_FAILURE,
});

export const loadingCategoryCreationSuccess = () => ({
  type: actionTypes.LOADING_CATEGORY_CREATION_SUCCESS,
});

export const loadingCategoryCreation = () => ({
  type: actionTypes.LOADING_CATEGORY_CREATION,
});

export const triggerCategoryCreation = data => ({
  type: actionTypes.TRIGGER_CATEGORY_CREATION,
  data,
});

export const triggerCategoryUpdate = data => ({
  type: actionTypes.TRIGGER_CATEGORY_UPDATE,
  data,
});

export const triggerCategoryDeletion = data => ({
  type: actionTypes.TRIGGER_CATEGORY_DELETE,
  data,
});

export const categoryCreatedSuccess = category => ({
  type: actionTypes.CATEGORY_CREATED,
  category,
});

export const categoryCreationFailure = () => ({
  type: actionTypes.CATEGORY_CREATION_FAILURE,
});

export const loadingCategoryUpdate = () => ({
  type: actionTypes.LOADING_CATEGORY_UPDATE,
});

export const categoryUpdatedSuccess = category => ({
  type: actionTypes.CATEGORY_UPDATED,
  category,
});

export const loadingCategoryUpdateSuccess = () => ({
  type: actionTypes.LOADING_CATEGORY_UPDATE_SUCCESS,
});

export const categoryUpdateFailure = () => ({
  type: actionTypes.CATEGORY_UPDATE_FAILURE,
});
