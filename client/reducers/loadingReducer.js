import * as actionTypes from "../actions/actionTypes"; //eslint-disable-line no-unused-vars
import initialState from "./initialState";

export default function loadingReducer(state = initialState.loading, action) {
    switch (action.type) {
        case actionTypes.LOADING_USER: {
            return {...state, loadingUser: true };
        }
        case actionTypes.LOADED_USER_SUCCESS: {
            return {...state, loadingUser: false };
        }
        default: {
            return state;
        }
    }
}