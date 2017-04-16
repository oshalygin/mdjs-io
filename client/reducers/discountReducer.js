/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function categoryReducer(state = initialState.discounts, action) {
  switch (action.type) {
    case actionTypes.LOAD_DISCOUNTS_SUCCESS: {
      return [...action.discounts];
    }
    case actionTypes.DISCOUNT_CREATED:
    case actionTypes.DISCOUNT_UPDATED:
      {
        const discounts = [...state];
        const currentDiscountIndex = discounts.findIndex(discount => discount.discountID === action.discount.discountID);

        if (currentDiscountIndex === -1) {
          return [...state, action.discount];
        } else { //eslint-disable-line no-else-return
          discounts.splice(currentDiscountIndex, 1, action.discount);
          return [...discounts];
        }
      }
    case actionTypes.DISCOUNT_DEACTIVATED_SUCCESS:
      {
        return state
          .filter(discount => discount.discountID !== action.discount.discountID);
      }  
    default: {
      return state;
    }
  }
}
