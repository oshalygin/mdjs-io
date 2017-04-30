import { combineReducers } from 'redux';
import items from './itemReducer';
import user from './userReducer';
import categories from './categoryReducer';
import modifiers from './modifierReducer';
import discounts from './discountReducer';
import taxes from './taxReducer';
import orders from './orderReducer';
import orderDetail from './orderDetailReducer';
import refundReasons from './refundReasonReducer';
import loading from './loadingReducer';
import version from './versionReducer';

const rootReducer = combineReducers({
  user,
  categories,
  items,
  modifiers,
  discounts,
  taxes,
  orders,
  orderDetail,
  refundReasons,
  loading,
  version
});

export default rootReducer;
