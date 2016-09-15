import * as actionTypes from "./actionTypes";
import { xhrCallFailure } from "./xhrStatusActions"; //eslint-disable-line
import axios from "axios";

export function loginSuccess(user) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user
    };
}


export function loginRequested(user) {
    return {
        type: actionTypes.LOGIN_REQUEST,
        user
    };
}

export function loginRequest(email, password) {
    const user = { email, password };
    return function (dispatch) {
        dispatch(loginRequested(user));
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
            })
            .catch(error => {
                throw (error);
            });
    };
}
