// import { loadState } from "./localStorage";
// const initialState = loadState();
import { loginWithToken } from "../actions/userActions";

export function retrieveUser(dispatch) {
    console.log("from here yo");
    console.log(dispatch);
    loginWithToken(dispatch, "3abf44c6-1461-4262-b2da-916ccd90a0fb")();
}

export default {
    user: {},
    loading: {},
    categories: [],
    discounts: [],
    modifiers: [],
    items: [],
    taxes: [],
    refundReasons: []
};