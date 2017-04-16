import axios from 'axios';
import { getHeaders } from '../utilities/requestUtilities';
import * as actionTypes from './actionTypes';
import { DISCOUNTS_ENDPOINT } from '../utilities/endpoints';
import { loadUserToken } from '../utilities/localStorage';

export function loadDiscountsSuccess(discounts) {
  return {
    type: actionTypes.LOAD_DISCOUNTS_SUCCESS,
    discounts
  };
}

export function discountDeactivated() {
  return {
    type: actionTypes.DISCOUNT_DEACTIVATED
  };
}

export function discountDeactivatedSuccess(discount) {
  return {
    type: actionTypes.DISCOUNT_DEACTIVATED_SUCCESS,
    discount
  };
}

export function loadingDiscountCreationSuccess() {
  return {
    type: actionTypes.LOADING_DISCOUNT_CREATION_SUCCESS
  };
}

export function loadingDiscountCreation() {
  return {
    type: actionTypes.LOADING_DISCOUNT_CREATION
  };
}

export function discountCreatedSuccess(discount) {

  return {
    type: actionTypes.DISCOUNT_CREATED,
    discount
  };
}

export function discountCreationFailure() {
  return {
    type: actionTypes.DISCOUNT_CREATION_FAILURE
  };
}

export function loadingDiscountUpdate() {
  return {
    type: actionTypes.LOADING_DISCOUNT_UPDATE
  };
}

export function discountUpdatedSuccess(discount) {
  return {
    type: actionTypes.DISCOUNT_UPDATED,
    discount
  };
}

export function loadingDiscountUpdateSuccess() {
  return {
    type: actionTypes.LOADING_DISCOUNT_UPDATE_SUCCESS
  };
}

export function discountUpdateFailure() {
  return {
    type: actionTypes.DISCOUNT_UPDATE_FAILURE
  };
}

export function createDiscount(discount) {
  return async function (dispatch) {

    dispatch(loadingDiscountCreation());

    try {

      const token = loadUserToken();

      const headers = getHeaders(token);
      const createdDiscountResponse = await axios.post(DISCOUNTS_ENDPOINT, discount, headers);
      const createdDiscount = createdDiscountResponse.data;

      dispatch(discountCreatedSuccess(createdDiscount));
      dispatch(loadingDiscountCreationSuccess());

    } catch (error) {
      dispatch(discountCreationFailure());
      throw (error);
    }
  };
}

export function updateDiscount(discount) {
  return async function (dispatch) {

    dispatch(loadingDiscountUpdate());

    try {

      const token = loadUserToken();
      const headers = getHeaders(token);
      const endpoint = `${DISCOUNTS_ENDPOINT}/${discount.discountID}`;

      const updatedDiscountResponse = await axios.put(endpoint, discount, headers);
      const updatedDiscount = updatedDiscountResponse.data;

      dispatch(discountUpdatedSuccess(updatedDiscount));
      dispatch(loadingDiscountUpdateSuccess());

    } catch (error) {
      dispatch(discountUpdateFailure());
      throw (error);
    }
  };
}

export function deactivateDiscount(discount) {
  return async function (dispatch) {

    const deactivatedDiscount = {
      ...discount,
      isActive: false,
      disabled: true
    };

    dispatch(discountDeactivated());

    const token = loadUserToken();
    const endpoint = `${DISCOUNTS_ENDPOINT}/${deactivatedDiscount.discountID}`;

    try {
      const headers = getHeaders(token);
      await axios.delete(endpoint, headers);

      dispatch(discountDeactivatedSuccess(deactivatedDiscount));

    } catch (error) {
      throw (error);
    }

  };
}
