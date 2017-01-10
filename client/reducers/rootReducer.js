import { combineReducers } from 'redux';
import items from './itemReducer';
import user from './userReducer';
import categories from './categoryReducer';
import modifiers from './modifierReducer';
import discounts from './discountReducer';
import taxes from './taxReducer';
import refundReasons from './refundReasonReducer';
import loading from './loadingReducer';

const rootReducer = combineReducers({
  user,
  categories,
  items,
  modifiers,
  discounts,
  taxes,
  refundReasons,
  loading
});

export default rootReducer;
