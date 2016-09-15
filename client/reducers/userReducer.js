import * as actionTypes from "../actions/actionTypes"; //eslint-disable-line no-unused-vars
import initialState from "./initialState";

export default function itemReducer(state = initialState.user, action) {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST: {

            break;
        }
        case actionTypes.LOGIN_SUCCESS: {
            console.log(state);
            console.log(action);
            console.log("derp");
        }
        default: {
            return state;
        }
    }
}