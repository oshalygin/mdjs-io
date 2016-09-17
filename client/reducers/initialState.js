import { loadUserToken } from "./localStorage";
const token = loadUserToken();
import { loginWithToken } from "../actions/userActions";

export function retrieveUser(dispatch) {
    loginWithToken(dispatch, token)();
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