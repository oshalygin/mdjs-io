import * as actionTypes from "./actionTypes";
import {loadCategoriesSuccess} from "./categoryActions";
import { xhrCallFailure } from "./xhrStatusActions"; //eslint-disable-line
import axios from "axios";

export function loginSuccess(user) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user
    };
}

export function login(user) {
    return function (dispatch) {
        return axios
            .post("http://localhost:82/api/dashboard/security",
            {
                email: user.email,
                password: user.password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(userResponse => {
                if (!userResponse.data.success) {
                    throw (userResponse.data.message);
                }
                dispatch(loginSuccess(userResponse.data.data));
                dispatch(loadCategoriesSuccess(userResponse.data.data.companyData.categories));
            })
            .catch(error => {
                throw (error);
            });
    };
}
