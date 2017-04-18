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
          orderStatusDescription: getOrderStatusDescription(order.orderStatusID)
        };
      });
    }
    default: {
      return state;
    }
  }
}
