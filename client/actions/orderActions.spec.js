/* eslint-disable max-nested-callbacks */
import { getAllOrders, getOrderDetails, hideOrderDetail } from './orderActions';
import {
  LOAD_ORDERS_SUCCESS,
  LOADING_ORDERS,
  LOADING_ORDERS_FAILURE,
  LOADING_ORDER_DETAIL,
  LOAD_ORDER_DETAIL_SUCCESS,
  LOADING_ORDER_DETAIL_FAILURE,
  HIDE_ORDER_DETAIL
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

  const orderDetail = {
    orderDetail: {
      companyID: 1,
      orderID: 1,
      createdBy: 1,
      createdDate: '2016-07-10T10:05:29.403',
      customer: null,
      customerID: 0,
      customerName: '',
      dueDate: null,
      email: '',
      giftCards: null,
      items: [
        {
          orderID: 4,
          orderItemID: 11,
          quantity: 1,
          item: {
            itemID: 0,
            itemCategoryID: 0,
            name: 'Custom Item',
            label: '',
            color: 0,
            count: 0,
            addedCount: 0,
            barcode: '',
            photoURL: '',
            price: 65,
            priceTypeID: 0,
            isShowPhoto: false,
            isTrackInventory: true,
            sku: '',
            modifiers: [],
            itemFlags: 0,
            file: null,
            lastUpdatedDate: '0001-01-01T00:00:00',
            createdDate: '0001-01-01T00:00:00',
            lastUpdatedBy: 0,
            createdBy: 0,
            isActive: false,
            companyID: 0,
            facilityID: 0
          },
          totalSub: 65,
          totalDiscount: 0,
          totalTax: 0,
          total: 65,
          orderItemStatusID: 110,
          notes: '',
          modifierList: [],
          taxList: [],
          discountList: []
        }
      ],
      latitude: 0,
      longitude: 0,
      notes: '',
      orderStatusDescription: 'Refunded',
      orderStatusID: 110,
      orderTypeID: 0,
      phoneNumber: '',
      total: 0,
      totalDiscount: 0,
      totalSub: 0,
      totalTax: 0,
      totalTip: 0,
      transactions: [
        {
          transactionID: 4,
          transactionTypeID: 1,
          transactionStatusID: 4,
          signatureURL: '',
          orderID: 4,
          totalAmount: 65,
          tipAmount: 0,
          taxAmount: 0,
          ipAddress: '',
          creditCardDetail: null,
          parentTransactionID: 0,
          response: null,
          parentTransaction: null,
          gatewayID: 0,
          createdDate: '2016-07-10T10:05:29.547',
          createdBy: 1
        },
        {
          transactionID: 965,
          transactionTypeID: 10,
          transactionStatusID: 1,
          signatureURL: '',
          orderID: 4,
          totalAmount: 65,
          tipAmount: 0,
          taxAmount: 0,
          ipAddress: '',
          creditCardDetail: null,
          parentTransactionID: 4,
          response: null,
          parentTransaction: {
            transactionID: 4,
            transactionTypeID: 1,
            transactionStatusID: 4,
            signatureURL: '',
            orderID: 4,
            totalAmount: 65,
            tipAmount: 0,
            taxAmount: 0,
            ipAddress: '',
            creditCardDetail: null,
            parentTransactionID: 0,
            response: null,
            parentTransaction: null,
            gatewayID: 0,
            createdDate: '2016-07-10T10:05:29.547',
            createdBy: 1
          },
          gatewayID: 0,
          createdDate: '2017-04-16T17:41:40.367',
          createdBy: 1
        }
      ]
    }
  };

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
      response: orders
    });

    return store.dispatch(getAllOrders())
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_ORDER_DETAIL" action on a getOrderDetails(orderId) call', () => {

    const expected = LOADING_ORDER_DETAIL;

    const orderId = 1;
    const orderDetailEndpoint = `${ORDERS_ENDPOINT}/${orderId}`;
    moxios.stubRequest(orderDetailEndpoint, {
      status: 200,
      response: orderDetail
    });

    return store.dispatch(getOrderDetails(orderId))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOAD_ORDER_DETAIL_SUCCESS" action on a getOrderDetails(orderId) call', () => {

    const expected = LOAD_ORDER_DETAIL_SUCCESS;

    const orderId = 1;
    const orderDetailEndpoint = `${ORDERS_ENDPOINT}/${orderId}`;
    moxios.stubRequest(orderDetailEndpoint, {
      status: 200,
      response: orderDetail
    });

    return store.dispatch(getOrderDetails(orderId))
      .then(() => {
        const actual = store.getActions()[1].type;
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_ORDER_DETAIL_FAILURE" action on a getOrderDetails(orderId) call', () => {

    const expected = LOADING_ORDER_DETAIL_FAILURE;

    const orderId = 1;
    const orderDetailEndpoint = `${ORDERS_ENDPOINT}/${orderId}`;
    moxios.stubRequest(orderDetailEndpoint, {
      status: 500,
      response: {}
    });

    return store.dispatch(getOrderDetails(orderId))
      .catch(() => {
        const actual = store.getActions()[1].type;
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

  it('should dispatch the "HIDE_ORDER_DETAIL" action on a call to hideOrderDetail', () => {

    const expected = HIDE_ORDER_DETAIL;

    return store.dispatch(hideOrderDetail())
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

});
