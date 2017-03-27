import axios from 'axios';

import { getHeaders } from '../utilities/requestUtilities';
import * as actionTypes from './actionTypes';
import { ITEM_ENDPOINT } from '../utilities/endpoints';
import { loadUserToken } from '../utilities/localStorage';


export function loadItemsSuccess(items) {
  return {
    type: actionTypes.LOAD_ITEMS_SUCCESS,
    items
  };
}

export function itemDeactivatedSuccess(item) {
  return {
    type: actionTypes.ITEM_DEACTIVATED_SUCCESS,
    item
  };
}

export function itemDeactivated() {
  return {
    type: actionTypes.ITEM_DEACTIVATED
  };
}

export function itemUpdatedSuccess(item) {
  return {
    type: actionTypes.ITEM_UPDATED,
    item
  };
}

export function itemCreatedSuccess(item) {

  return {
    type: actionTypes.ITEM_CREATED,
    item
  };
}

export function loadingItemCreation() {
  return {
    type: actionTypes.LOADING_ITEM_CREATION
  };
}

export function loadingItemCreationSuccess() {
  return {
    type: actionTypes.LOADING_ITEM_CREATION_SUCCESS
  };
}

export function loadingItemUpdate() {
  return {
    type: actionTypes.LOADING_ITEM_UPDATE
  };
}

export function loadingItemUpdateSuccess() {
  return {
    type: actionTypes.LOADING_ITEM_UPDATE_SUCCESS
  };
}

export function itemUpdateFailure() {
  return {
    type: actionTypes.ITEM_UPDATE_FAILURE
  };
}

export function itemCreatedFailure() {
  return {
    type: actionTypes.ITEM_CREATION_FAILURE
  };
}

export function createItem(item) {
  return async function (dispatch) {

    dispatch(loadingItemCreation());

    try {
      const itemToPersist = { ...item };
      delete itemToPersist.photoURL;
      delete itemToPersist.file;

      const token = loadUserToken();
      const data = new FormData();
      data.append('item', JSON.stringify(itemToPersist));
      data.append('file', item.file);

      const headers = getHeaders(token);
      const createdItemResponse = await axios.post(ITEM_ENDPOINT, data, headers);
      const createdItem = createdItemResponse.data;

      dispatch(itemCreatedSuccess(createdItem));
      dispatch(loadingItemCreationSuccess());

    } catch (error) {
      dispatch(itemCreatedFailure());
      throw (error);
    }
  };
}

export function updateItem(item) {
  return async function (dispatch) {

    dispatch(loadingItemUpdate());

    try {
      const itemToPersist = { ...item };
      delete itemToPersist.file;

      const data = new FormData();
      data.append('item', JSON.stringify(itemToPersist));

      if (item.file) {
        delete itemToPersist.photoURL;
        data.append('file', item.file);
      }

      const token = loadUserToken();
      const headers = getHeaders(token);
      const updatedItemResponse = await axios.put(ITEM_ENDPOINT, data, headers);
      const updatedItem = updatedItemResponse.data;

      dispatch(itemUpdatedSuccess(updatedItem));
      dispatch(loadingItemUpdateSuccess());

    } catch (error) {
      dispatch(itemUpdateFailure());
      throw (error);
    }
  };
}

export function deactivateItem(item) {
  return async function (dispatch) {

    const deactivatedItem = {
      ...item,
      isActive: false,
      disabled: true
    };

    dispatch(itemDeactivated());

    const token = loadUserToken();
    const endpoint = `${ITEM_ENDPOINT}/${deactivatedItem.itemID}`;

    try {
      const headers = getHeaders(token);
      await axios.delete(endpoint, headers);

      dispatch(itemDeactivatedSuccess(deactivatedItem));

    } catch (error) {
      throw (error);
    }

  };
}
