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

export function itemActiveStateToggledSuccess(item) {
    return {
        type: actionTypes.ITEM_ACITE_STATE_TOGGLED,
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
        return axios.post(endpoints.ITEM_ENDPOINT, {
                ...item
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            })
            .then((response) => {
                dispatch(itemCreatedOrUpdatedSuccess({ ...response.data }));
                dispatch(loadingItemCreationOrUpdatesSuccess());
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

export function itemActivated(item) {
    const toggledItem = {
        ...item,
        isActive: !item.isActive
    };
    return function (dispatch) {
        dispatch(itemActiveStateToggledSuccess(toggledItem));
    };
}