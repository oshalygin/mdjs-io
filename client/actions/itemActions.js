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

export function itemPhotoUpdatedSuccess(item) {
  return {
    type: actionTypes.ITEM_PREVIEW_UPDATED,
    item
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

export function itemCreatedOrUpdatedSuccess(item) {
  return {
    type: actionTypes.ITEM_CREATED_OR_UPDATED,
    item
  };
}

export function loadingItemCreationOrUpdatesSuccess() {
  return {
    type: actionTypes.LOADING_ITEM_CREATED_OR_UPDATED_SUCCESS
  };
}

export function loadingItemCreationOrUpdates() {
  return {
    type: actionTypes.LOADING_ITEM_CREATED_OR_UPDATED
  };
}

export function createOrUpdateItem(item) {
  return async function (dispatch) {

    dispatch(loadingItemCreationOrUpdates());

    try {
      const itemToPersist = { ...item };
      delete itemToPersist.photoURL;
      delete itemToPersist.file;

      const token = loadUserToken();
      const data = new FormData();
      data.append('item', JSON.stringify(itemToPersist));
      data.append('file', item.file);

      const headers = getHeaders(token);
      const createdOrUpdatedItemResponse = await axios.post(ITEM_ENDPOINT, data, headers);
      const createdOrUpdatedItem = createdOrUpdatedItemResponse.data;

      dispatch(itemCreatedOrUpdatedSuccess({ ...createdOrUpdatedItem }));
      dispatch(loadingItemCreationOrUpdatesSuccess());

    } catch (error) {
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
      await axios
        .delete(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        });

      dispatch(itemDeactivatedSuccess(deactivatedItem));

    } catch (error) {
      throw (error);
    }

  };
}
