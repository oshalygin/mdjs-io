/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';
import { getOrderStatusDescription } from '../utilities/ordersUtility';

export default function orderReducer(state = initialState.orders, action) {
  switch (action.type) {
    case actionTypes.LOAD_ORDERS_SUCCESS: {
      const orderList = action.orders.map(order => {
        return {
          ...order,
          orderStatusDescription: getOrderStatusDescription(order.orderStatusID),
          expanded: false
        };
      });

      return { ...state, orderList };
    }
    case actionTypes.LOADING_ORDER_DETAIL: {
      const orderList = state.orderList.map(order => {

        return {
          ...order,
          expanded: order.orderID === action.orderID
        };

      });

      return { ...state, orderList };
    }
    case actionTypes.HIDE_ORDER_DETAIL: {
      const orderList = state.orderList.map(order => {
        if (order.orderID !== action.orderID) {
          return order;
        }

        return {
          ...order,
          expanded: false
        };

      });

      return { ...state, orderList };
    }
    case actionTypes.LOAD_MONTHLY_SUMMARY_SUCCESS: {
      return {
        ...state,
        monthlySummary: action.data
      };
    }
    case actionTypes.LOAD_ORDER_AVERAGE_SUCCESS: {
      return {
        ...state,
        orderAverage: action.average
      };
    }  
    default: {
      return state;
    }
  }
}
