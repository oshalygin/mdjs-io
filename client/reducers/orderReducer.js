/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';
import { getOrderStatusDescription } from '../utilities/orderStatusUtility';

export default function orderReducer(state = initialState.orders, action) {
  switch (action.type) {
    case actionTypes.LOAD_ORDERS_SUCCESS: {
      return action.orders.map(order => {
        return {
          ...order,
          orderStatusDescription: getOrderStatusDescription(order.orderStatusID),
          expanded: false
        };
      });
    }
    case actionTypes.LOADING_ORDER_DETAIL: {
      return state.map(order => {

        return {
          ...order,
          expanded: order.orderID === action.orderID
        };

      });
    }
    case actionTypes.HIDE_ORDER_DETAIL: {
      return state.map(order => {
        if (order.orderID !== action.orderID) {
          return order;
        }

        return {
          ...order,
          expanded: false
        };

      });
    }
    default: {
      return state;
    }
  }
}
