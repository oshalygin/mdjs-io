import * as actionTypes from "./actionTypes";
import { xhrCallFailure } from "./xhrStatusActions"; //eslint-disable-line

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

export function updateItemsSuccess(item) {
    return {
        type: actionTypes.UPDATE_ITEM_SUCCESS,
        item
    };
}

export function updateItem(item) {
    return function (dispatch) {
        dispatch(updateItemsSuccess(item));
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
