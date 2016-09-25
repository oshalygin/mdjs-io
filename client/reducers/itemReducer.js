import * as actionTypes from "../actions/actionTypes"; //eslint-disable-line no-unused-vars
import initialState from "./initialState";

export default function itemReducer(state = initialState.items, action) {
    switch (action.type) {
        case actionTypes.LOAD_ITEMS_SUCCESS:
            {
                return action.items.reduce((items, item) => {
                    return [...items, {...item,
                        checked: false
                    }];
                }, []);
            }
        case actionTypes.ITEM_CREATED:
            {
                return [...state, action.item];
            }
        case actionTypes.ITEM_CHECKED:
            {
                let items = [...state];
                let checkedItemIndex = items.findIndex(item => item.itemID === action.item.itemID);
                items.splice(checkedItemIndex, 1, action.item);
                return [...items];
            }
        case actionTypes.ITEM_UPDATED:
            {
                let items = [...state];
                let checkedItemIndex = items.findIndex(item => item.itemID === action.item.itemID);
                items.splice(checkedItemIndex, 1, action.item);
                return [...items];
            }
        default:
            {
                return state;
            }
    }
}