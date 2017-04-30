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

export function loadOrderDetailSuccess(order) {
  return {
    type: actionTypes.LOAD_ORDER_DETAIL_SUCCESS,
    order
  };
}

export function hideOrderDetailSuccess() {
  return {
    type: actionTypes.HIDE_ORDER_DETAIL
  };
}

export function loadingOrders() {
  return {
    type: actionTypes.LOADING_ORDERS
  };
}

export function loadingOrderDetail() {
  return {
    type: actionTypes.LOADING_ORDER_DETAIL
  };
}

export function loadingOrdersFailure() {
  return {
    type: actionTypes.LOADING_ORDERS_FAILURE
  };
}

export function loadOrderDetailFailure() {
  return {
    type: actionTypes.LOADING_ORDER_DETAIL_FAILURE
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

    } catch (error) {
      dispatch(loadingOrdersFailure());
      throw (error);
    }
  };
}

export function getOrderDetails(orderId) {
  return async function (dispatch) {

    dispatch(loadingOrderDetail());

    try {

      const token = loadUserToken();
      const headers = getHeaders(token);
      const endpoint = `${ORDERS_ENDPOINT}/${orderId}`;

      const response = await axios.get(endpoint, headers);
      const order = response.data;

      dispatch(loadOrderDetailSuccess(order));

    } catch (error) {
      dispatch(loadOrderDetailFailure());
      throw (error);
    }
  };
}

export function hideOrderDetail() {
  return async function (dispatch) {

    try {
      dispatch(hideOrderDetailSuccess());
    } catch (error) {
      throw (error);
    }

  };
}
