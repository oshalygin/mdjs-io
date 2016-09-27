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

        const token = loadUserToken();
        return axios
            .post(endpoints.ITEM_ENDPOINT, {
                ...item
            }, {
                headers: {
                    "Content-Type": "application/json",
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
                // dispatch(loadingItemCreationOrUpdatesSuccess());
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