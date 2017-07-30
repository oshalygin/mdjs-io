import axios from 'axios';
import { getHeaders } from '../utilities/requestUtilities';
import * as actionTypes from './actionTypes';
import { TAXES_ENDPOINT } from '../utilities/endpoints';
import { loadUserToken } from '../utilities/localStorage';

export function loadTaxesSuccess(taxes) {
  return {
    type: actionTypes.LOAD_TAXES_SUCCESS,
    taxes,
  };
}

export function taxDeactivated() {
  return {
    type: actionTypes.TAX_DEACTIVATED,
  };
}

export function taxDeactivatedSuccess(tax) {
  return {
    type: actionTypes.TAX_DEACTIVATED_SUCCESS,
    tax,
  };
}

export function loadingTaxCreationSuccess() {
  return {
    type: actionTypes.LOADING_TAX_CREATION_SUCCESS,
  };
}

export function loadingTaxCreation() {
  return {
    type: actionTypes.LOADING_TAX_CREATION,
  };
}

export function taxCreatedSuccess(tax) {
  return {
    type: actionTypes.TAX_CREATED,
    tax,
  };
}

export function taxCreationFailure() {
  return {
    type: actionTypes.TAX_CREATION_FAILURE,
  };
}

export function loadingTaxUpdate() {
  return {
    type: actionTypes.LOADING_TAX_UPDATE,
  };
}

export function taxUpdatedSuccess(tax) {
  return {
    type: actionTypes.TAX_UPDATED,
    tax,
  };
}

export function loadingTaxUpdateSuccess() {
  return {
    type: actionTypes.LOADING_TAX_UPDATE_SUCCESS,
  };
}

export function taxUpdateFailure() {
  return {
    type: actionTypes.TAX_UPDATE_FAILURE,
  };
}

export function createTax(tax) {
  return async function(dispatch) {
    dispatch(loadingTaxCreation());

    try {
      const token = loadUserToken();

      const headers = getHeaders(token);
      const createdTaxResponse = await axios.post(TAXES_ENDPOINT, tax, headers);
      const createdTax = createdTaxResponse.data;

      dispatch(taxCreatedSuccess(createdTax));
      dispatch(loadingTaxCreationSuccess());
    } catch (error) {
      dispatch(taxCreationFailure());
      throw error;
    }
  };
}

export function updateTax(tax) {
  return async function(dispatch) {
    dispatch(loadingTaxUpdate());

    try {
      const token = loadUserToken();
      const headers = getHeaders(token);
      const endpoint = `${TAXES_ENDPOINT}/${tax.taxID}`;

      const updatedTaxResponse = await axios.put(endpoint, tax, headers);
      const updatedTax = updatedTaxResponse.data;

      dispatch(taxUpdatedSuccess(updatedTax));
      dispatch(loadingTaxUpdateSuccess());
    } catch (error) {
      dispatch(taxUpdateFailure());
      throw error;
    }
  };
}

export function deactivateTax(tax) {
  return async function(dispatch) {
    const deactivatedTax = {
      ...tax,
      isActive: false,
      disabled: true,
    };

    dispatch(taxDeactivated());

    const token = loadUserToken();
    const endpoint = `${TAXES_ENDPOINT}/${deactivatedTax.taxID}`;

    try {
      const headers = getHeaders(token);
      await axios.delete(endpoint, headers);

      dispatch(taxDeactivatedSuccess(deactivatedTax));
    } catch (error) {
      throw error;
    }
  };
}
