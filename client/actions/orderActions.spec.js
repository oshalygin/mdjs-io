/* eslint-disable max-nested-callbacks */
import { getAllOrders } from './orderActions';
import {
  LOAD_ORDERS_SUCCESS,
  LOADING_ORDERS,
  LOADING_ORDERS_FAILURE
} from './actionTypes';
import {
  ORDERS_ENDPOINT
} from '../utilities/endpoints';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';

describe('Order Actions', () => {

  let store;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    store = mockStore({});
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const orders = [
    {
      orderID: 954,
      total: 10.99,
      createdDate: '2017-04-17T12:11:52.207',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 9.99,
      totalTax: 1.0,
      totalTip: 0.0
    }, {
      orderID: 942,
      total: 20.8725,
      createdDate: '2017-04-15T22:50:54',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 18.975,
      totalTax: 1.8975,
      totalTip: 0.0
    }, {
      orderID: 941,
      total: 6.6,
      createdDate: '2017-04-15T22:28:41',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 6.0,
      totalTax: 0.6,
      totalTip: 0.0
    }, {
      orderID: 940, total: 0.0,
      createdDate: '2017-04-15T22:01:02',
      orderStatusID: 110,
      orderStatusDescription: 'Refunded',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 0.0,
      totalTax: 0.0,
      totalTip: 0.0
    }, {
      orderID: 939,
      total: 0.0,
      createdDate: '2017-04-15T21:15:07',
      orderStatusID: 110,
      orderStatusDescription: 'Refunded',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 0.0,
      totalTax: 0.0,
      totalTip: 0.0
    }, {
      orderID: 928,
      total: 0.0,
      createdDate: '2017-04-15T15:07:37',
      orderStatusID: 110,
      orderStatusDescription: 'Refunded',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 0.0,
      totalTax: 0.0,
      totalTip: 0.0
    }, {
      orderID: 907,
      total: 9.878,
      createdDate: '2017-04-14T15:54:42',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 8.98,
      totalTax: 0.898,
      totalTip: 0.0
    }];

  it('should dispatch the "LOADING_ORDERS" action on a getAllOrders() call', () => {

    const expected = LOADING_ORDERS;
    moxios.stubRequest(ORDERS_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(getAllOrders())
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOAD_ORDERS_SUCCESS" action on a completed getAllOrders() call', () => {

    const expected = LOAD_ORDERS_SUCCESS;
    moxios.stubRequest(ORDERS_ENDPOINT, {
      status: 200,
      response: orders
    });

    return store.dispatch(getAllOrders())
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_ORDERS_FAILURE" action on a failed getAllOrders() call', () => {

    const expected = LOADING_ORDERS_FAILURE;

    moxios.stubRequest(ORDERS_ENDPOINT, {
      status: 500,
      response: {}
    });

    return store.dispatch(getAllOrders())
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

});
