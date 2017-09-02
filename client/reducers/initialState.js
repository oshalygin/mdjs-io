import { loadUserToken } from '../utilities/localStorage';
import { loginWithToken } from '../actions/userActions';

export function retrieveUser(dispatch, callback) {
  const token = loadUserToken();
  if (!token) {
    callback('No user token retrieved from localStorage');
    return;
  }

  loginWithToken(dispatch, token)
    .then(() => {
      callback();
    })
    .catch(error => {
      callback(error);
    });
}

export default {
  user: {},
  loading: {
    loadingUser: true,
    loadingUserLogin: false,
    loadingOrders: true,
    loadingMonthlySummary: true,
    loadingRegistration: false,
  },
  configuration: {},
  categories: [],
  discounts: [],
  modifiers: [],
  items: [],
  taxes: [],
  orders: {
    orderAverage: 0,
    yesterdaysOrders: [],
    todaysOrders: [],
    orderList: [],
    monthlySummary: [],
  },
  orderDetail: {},
  refundReasons: [],
  version: '',
  notification: '',
};
