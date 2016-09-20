import * as actionTypes from "../actions/actionTypes"; //eslint-disable-line no-unused-vars
import initialState from "./initialState";

export default function itemReducer(state = initialState.items, action) {
    switch (action.type) {
        case actionTypes.LOAD_ITEMS_SUCCESS: {
            return action.items.reduce((items, item) => {
                return [...items,
                {...item,
                    checked: false
                     }];
        }, []);
    }
        default: {
        return state;
    }
}
}