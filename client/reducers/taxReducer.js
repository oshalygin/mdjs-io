import * as actionTypes from "../actions/actionTypes"; //eslint-disable-line no-unused-vars
import initialState from "./initialState";

export default function taxReducer(state = initialState.taxes, action) {
    switch (action.type) {
        case actionTypes.LOAD_TAXES_SUCCESS: {
            return [...action.taxes];
        }
        default: {
            return state;
        }
    }
}