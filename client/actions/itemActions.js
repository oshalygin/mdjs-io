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

export function savingItem() {
    return {
        type: actionTypes.ITEM_SAVING
    };
}

export function itemCreatedSuccess(item) {
    return {
        type: actionTypes.ITEM_CREATED,
        item
    };
}

export function loadingCreatingItemSuccess() {
    return {
        type: actionTypes.LOADING_CREATING_ITEM_SUCCESS
    };
}

export function updateItemsSuccess(item) {
    return {
        type: actionTypes.ITEM_UPDATED,
        item
    };
}

export function updateItem(item) {
    return function (dispatch) {
        dispatch(updateItemsSuccess(item));
    };
}

export function createItem(item) {
    return function (dispatch) {

        const token = loadUserToken();
        return axios.post(endpoints.ITEM_ENDPOINT, {
                ...item
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            .then((response) => {
                dispatch(itemCreatedSuccess(response.data));
                dispatch(loadingCreatingItemSuccess());
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