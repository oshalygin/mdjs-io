import { loadUserToken } from "./localStorage";
import { loginWithToken } from "../actions/userActions";


export function retrieveUser(dispatch, callback) {
    const token = loadUserToken();
    loginWithToken(dispatch, token)()
        .then(() => {
            callback();
        })
        .catch((error) => {
            callback(error);
        });
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