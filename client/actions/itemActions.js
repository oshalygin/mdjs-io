import * as actionTypes from "./actionTypes";
import * as endpoints from "./httpEndpoints";
import {
    loadUserToken
} from "../utilities/localStorage";
import axios from "axios";

export function loadItemsSuccess(items) {
    return {
        type: actionTypes.LOAD_ITEMS_SUCCESS,
        items
    };
}

export function itemCheckedSuccess(item) {
    return {
        type: actionTypes.ITEM_CHECKED,
        item
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

export function itemDeactivated(item) {
    return {
        type: actionTypes.ITEM_DEACTIVATED,
        item
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
    return function (dispatch) {
        dispatch(loadingItemCreationOrUpdates());
        let itemToPersist = {
            ...item
        };
        delete itemToPersist.photoURL;
        delete itemToPersist.file;

        const token = loadUserToken();

        const data = new FormData();

        data.append("item", JSON.stringify(itemToPersist));
        console.log(item.file);
        data.append("file", item.file);

        return axios
            .post("http://localhost:59947/api/dashboard/item",
                data, {
                    headers: {
                        "Content-Type": false,
                        Authorization: token
                    }
                })
            .then((response) => {
                dispatch(itemCreatedOrUpdatedSuccess({...response.data
                }));
                dispatch(loadingItemCreationOrUpdatesSuccess());
            })
            .catch(errorResponse => {
                throw (errorResponse);
            });

    };
}

export function deactivateItem(item) {
    return function (dispatch) {

        let deactivatedItem = {...item,
            isActive: false,
            disabled: true
        };

        dispatch(itemDeactivated(deactivatedItem));

        const token = loadUserToken();
        const endpoint = `${endpoints.ITEM_ENDPOINT}/${deactivatedItem.itemID}`;
        return axios
            .delete(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            .then(() => {
                dispatch(itemDeactivatedSuccess({...deactivatedItem
                }));
            })
            .catch(errorResponse => {
                throw (errorResponse);
            });

    };
}

export function itemChecked(item) {
    const checkedItem = {
        ...item,
        checked: !item.checked
    };
    return function (dispatch) {
        dispatch(itemCheckedSuccess(checkedItem));
    };
}

export function itemImageUpdated(item, file) {
    const updatedImageItem = Object.assign({}, {...item,
        photoURL: file.preview,
        file: file
    });
    return function (dispatch) {
        dispatch(itemPhotoUpdatedSuccess(updatedImageItem));
    };
}