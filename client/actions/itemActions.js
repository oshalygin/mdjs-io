import * as actionTypes from "./actionTypes";
import { xhrCallFailure } from "./xhrStatusActions";
import axios from "axios";

export function loadItemsSuccess(items) {
    return {
        type: actionTypes.LOAD_ITEMS_SUCCESS,
        items
    };
}

export function updateItemsSuccess(item) {
    return {
        type: actionTypes.UPDATE_ITEM_SUCCESS,
        item
    };
}

export function loadItems() {
    return function (dispatch) {
        return axios.get("/api/item")
            .then(items => {
                dispatch(loadItemsSuccess(items.data));
            })
            .catch(error => {
                dispatch(xhrCallFailure);
                throw (error);
            });
    };
}

export function updateItem(item) {
    return function (dispatch) {
        dispatch(updateItemsSuccess(item));
    };
}


