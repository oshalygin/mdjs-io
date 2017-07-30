/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function taxReducer(state = initialState.taxes, action) {
  switch (action.type) {
    case actionTypes.LOAD_TAXES_SUCCESS: {
      return [...action.taxes];
    }
    case actionTypes.TAX_CREATED:
    case actionTypes.TAX_UPDATED: {
      const taxes = [...state];
      const currentTaxIndex = taxes.findIndex(
        tax => tax.taxID === action.tax.taxID,
      );

      if (currentTaxIndex === -1) {
        return [...state, action.tax];
      }
      //eslint-disable-line no-else-return
      taxes.splice(currentTaxIndex, 1, action.tax);
      return [...taxes];
    }
    case actionTypes.TAX_DEACTIVATED_SUCCESS: {
      return state.filter(tax => tax.taxID !== action.tax.taxID);
    }
    default: {
      return state;
    }
  }
}
