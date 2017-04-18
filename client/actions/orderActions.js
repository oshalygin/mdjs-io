import axios from 'axios';
import { getHeaders } from '../utilities/requestUtilities';
import * as actionTypes from './actionTypes';
import { ORDERS_ENDPOINT } from '../utilities/endpoints';
import { loadUserToken } from '../utilities/localStorage';

export function loadOrdersSuccess(orders) {
  return {
    type: actionTypes.LOAD_ORDERS_SUCCESS,
    orders
  };
}

export function loadingOrders() {
  return {
    type: actionTypes.LOADING_ORDERS
  };
}

export function loadingOrdersSuccess() {
  return {
    type: actionTypes.LOADING_ORDERS_SUCCESS
  };
}

export function loadingOrdersFailure() {
  return {
    type: actionTypes.LOADING_ORDERS_FAILURE
  };
}

export function getAllOrders() {
  return async function (dispatch) {

    dispatch(loadingOrders());

    try {

      const token = loadUserToken();
      const headers = getHeaders(token);
      const endpoint = ORDERS_ENDPOINT;

      const ordersResponse = await axios.get(endpoint, headers);
      const orders = ordersResponse.data;

      dispatch(loadOrdersSuccess(orders));
      dispatch(loadingOrdersSuccess());

    } catch (error) {
      dispatch(loadingOrdersFailure());
      throw (error);
    }
  };
}
