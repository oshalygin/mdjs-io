import * as actionTypes from "../actions/actionTypes"; //eslint-disable-line no-unused-vars
import initialState from "./initialState";

export default function itemReducer(state = initialState.items, action) {
    switch (action.type) {

        default: {
                return state;
        }
    }
}