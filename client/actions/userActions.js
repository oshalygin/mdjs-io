import * as actionTypes from "./actionTypes";
import {loadCategoriesSuccess} from "./categoryActions";
import {loadDiscountsSuccess} from "./discountActions";
import {loadModifiersSuccess} from "./modifierActions";
import {loadTaxesSuccess} from "./taxActions";
import {loadItemsSuccess} from "./itemActions";
import {loadRefundReasonsSuccess} from "./refundReasonActions";

import { xhrCallFailure } from "./xhrStatusActions"; //eslint-disable-line
import axios from "axios";

export function loginSuccess(user) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        user
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

export function login(user) {
    return function (dispatch) {
        dispatch(loadingUser());
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
                dispatch(loadDiscountsSuccess(userResponse.data.data.companyData.discounts));
                dispatch(loadItemsSuccess(userResponse.data.data.companyData.items));
                dispatch(loadTaxesSuccess(userResponse.data.data.companyData.taxes));
                dispatch(loadModifiersSuccess(userResponse.data.data.companyData.modifiers));
                dispatch(loadRefundReasonsSuccess(userResponse.data.data.companyData.refundReasons));
                dispatch(loadedUserSuccess());
            })
            .catch(error => {
                throw (error);
            });
    };
}
