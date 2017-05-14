import axios from 'axios';
import * as actionTypes from './actionTypes';

import { getHeaders } from '../utilities/requestUtilities';

import { ORDERS_ENDPOINT } from '../utilities/endpoints';
import { loadUserToken } from '../utilities/localStorage';
import { getDateFromRequestUrl } from '../utilities/dateTimeUtilities';
import { mapOrderSummary, orderAverage, flattenOrders } from '../utilities/ordersUtility';

export function loadOrdersSuccess(orders) {
  return {
    type: actionTypes.LOAD_ORDERS_SUCCESS,
    orders
  };
}

export function loadOrderAverageSuccess(average) {
  return {
    type: actionTypes.LOAD_ORDER_AVERAGE_SUCCESS,
    average
  };
}

export function loadMonthlySummarySuccess(data) {
  return {
    type: actionTypes.LOAD_MONTHLY_SUMMARY_SUCCESS,
    data
  };
}

export function loadOrderDetailSuccess(order) {
  return {
    type: actionTypes.LOAD_ORDER_DETAIL_SUCCESS,
    order
  };
}

export function hideOrderDetailSuccess(orderID) {
  return {
    type: actionTypes.HIDE_ORDER_DETAIL,
    orderID
  };
}

export function loadingOrders() {
  return {
    type: actionTypes.LOADING_ORDERS
  };
}

export function loadingMonthlySummary() {
  return {
    type: actionTypes.LOADING_MONTHLY_SUMMARY
  };
}

export function loadingOrderDetail(orderID) {
  return {
    type: actionTypes.LOADING_ORDER_DETAIL,
    orderID
  };
}

export function loadingOrdersFailure() {
  return {
    type: actionTypes.LOADING_ORDERS_FAILURE
  };
}

export function loadingMonthlySummaryFailure() {
  return {
    type: actionTypes.LOADING_MONTHLY_SUMMARY_FAILURE
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

    dispatch(loadingOrderDetail(orderId));

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

export function hideOrderDetail(orderID) {
  return async function (dispatch) {

    try {
      dispatch(hideOrderDetailSuccess(orderID));
    } catch (error) {
      throw (error);
    }
  };
}

export function getMonthlySummary(months) {
  return async function (dispatch) {

    dispatch(loadingMonthlySummary());

    try {

      const token = loadUserToken();
      const headers = getHeaders(token);

      let promises = [];

      months.forEach(month => {
        const startDate = `${month.monthDisplayValue}-1-${month.year}`;
        const endDate = month.monthValue < 11 ?
          `${month.monthDisplayValue + 1}-1-${month.year}` :
          `1-1-${month.year + 1}`;

        const endpoint = `${ORDERS_ENDPOINT}?startDate=${startDate}&endDate=${endDate}`;
        promises = [...promises, axios.get(endpoint, headers)];
      });

      await axios.all(promises).then((results) => {

        const data = results.map((orders) => {

          const dateString = getDateFromRequestUrl(orders.request.responseURL);
          const orderData = orders.data;
          const monthSummary = mapOrderSummary(orderData, dateString);

          return monthSummary;

        });

        const orders = flattenOrders(results);
        
        const average = orderAverage(orders);
        
        dispatch(loadMonthlySummarySuccess(data));
        dispatch(loadOrderAverageSuccess(average));

      });

    } catch (error) {
      dispatch(loadingMonthlySummaryFailure());
      throw (error);
    }
  };
}
