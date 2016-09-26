import * as actionTypes from "./actionTypes";
import * as endpoints from "./httpEndpoints";
import { persistUserToken, removeUserToken } from "../utilities/localStorage";
import { loadCategoriesSuccess } from "./categoryActions";
import { loadDiscountsSuccess } from "./discountActions";
import { loadModifiersSuccess } from "./modifierActions";
import { loadTaxesSuccess } from "./taxActions";
import { loadItemsSuccess } from "./itemActions";
import { loadRefundReasonsSuccess } from "./refundReasonActions";

import axios from "axios";

export function loginSuccess(user) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user
    };
}

export function logoutSuccess() {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    };
}

export function loadingUser() {
    return {
        type: actionTypes.LOADING_USER
    };
}

export function loadedUserSuccess() {
    return {
        type: actionTypes.LOADED_USER_SUCCESS
    };
}

export function loadedUserFailure() {
    return {
        type: actionTypes.LOADED_USER_FAILURE
    };
}

export function login(user) {
    return function (dispatch) {
        dispatch(loadingUser());
        return axios
            .post(endpoints.LOGIN_ENDPOINT,
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
                dispatch(loadDiscountsSuccess(userResponse.data.data.companyData.discounts));
                dispatch(loadItemsSuccess(userResponse.data.data.companyData.items));
                dispatch(loadTaxesSuccess(userResponse.data.data.companyData.taxes));
                dispatch(loadModifiersSuccess(userResponse.data.data.companyData.modifiers));
                dispatch(loadRefundReasonsSuccess(userResponse.data.data.companyData.refundReasons));
                dispatch(loadedUserSuccess());
                persistUserToken(userResponse.data.data.token);
            })
            .catch(error => {
                throw (error);
            });
    };
}

export function loginWithToken(dispatch, tokenKey) {
    return function () {
        dispatch(loadingUser());
        return axios
            .post(endpoints.LOGIN_TOKEN_ENDPOINT,
            {
                token: tokenKey
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(userResponse => {
                dispatch(loginSuccess(userResponse.data.data));
                dispatch(loadCategoriesSuccess(userResponse.data.data.companyData.categories));
                dispatch(loadDiscountsSuccess(userResponse.data.data.companyData.discounts));
                dispatch(loadItemsSuccess(userResponse.data.data.companyData.items));
                dispatch(loadTaxesSuccess(userResponse.data.data.companyData.taxes));
                dispatch(loadModifiersSuccess(userResponse.data.data.companyData.modifiers));
                dispatch(loadRefundReasonsSuccess(userResponse.data.data.companyData.refundReasons));
                dispatch(loadedUserSuccess());
                persistUserToken(userResponse.data.data.token);
            })
            .catch(error => { //eslint-disable-line no-unused-vars
                dispatch(loadedUserFailure());
                throw (error);
            });
    };
}

export function logout() {
    return function (dispatch) {
        removeUserToken();
        dispatch(logoutSuccess());
    };
}