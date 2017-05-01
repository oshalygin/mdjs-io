/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';
import { getOrderStatusDescription } from '../utilities/orderStatusUtility';

export default function orderReducer(state = initialState.orderDetail, action) {
  switch (action.type) {
    case actionTypes.LOAD_ORDER_DETAIL_SUCCESS: {
      return {
        ...action.order,
        orderStatusDescription: getOrderStatusDescription(action.order.orderStatusID)
      };
    }
    default: {
      return state;
    }
  }
}
