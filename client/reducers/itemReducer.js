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
        case actionTypes.ITEM_CREATED_OR_UPDATED:
            {
                let items = [...state];
                let currentItemIndex = items.findIndex(item => item.itemID === action.item.itemID);

                if (currentItemIndex === -1) {
                    return [...state, action.item];
                } else { //eslint-disable-line no-else-return
                    items.splice(currentItemIndex, 1, action.item);
                    return [...items];
                }
            }
        case actionTypes.ITEM_DEACTIVATED:
            {
                let items = [...state];
                let deactivatedItemIndex = items.findIndex(item => item.itemID === action.item.itemID);
                items.splice(deactivatedItemIndex, 1, action.item);
                return [...items];
            }
        case actionTypes.ITEM_CHECKED:
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