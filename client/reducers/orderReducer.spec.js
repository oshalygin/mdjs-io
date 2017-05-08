import { expect } from 'chai';
import * as actionTypes from '../actions/actionTypes';
import reducer from './orderReducer';

describe('Reducer - Orders', () => {

  const getInitialState = () => {
    return {
      orderList: [],
      monthlySummary: []
    };
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

  const monthlySummary = [
    {
      monthDisplayName: 'Jan',
      monthValue: 0,
      orderCount: 3,
      year: 2017,
      total: 50.44,
      totalDiscount: 0,
      totalTax: 0,
      totalTip: 0
    },
    {
      monthDisplayName: 'Feb',
      monthValue: 0,
      orderCount: 1,
      year: 2017,
      total: 10.44,
      totalDiscount: 0,
      totalTax: 0,
      totalTip: 0
    }];

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {

    const action = {
      type: 'UNKNOWN'
    };

    const expected = getInitialState();
    const actual = reducer(getInitialState(), action); //eslint-disable-line no-undefined

    expect(actual).to.deep.equal(expected);
  });

  it('should hydrate the state with all of the orders in the action', () => {

    const action = {
      type: actionTypes.LOAD_ORDERS_SUCCESS,
      orders
    };

    const orderList = orders.map(order => {
      return {
        ...order,
        expanded: false
      };
    });

    const expected = {
      orderList,
      monthlySummary: []
    };

    const actual = reducer(undefined, action); //eslint-disable-line no-undefined
    expect(actual).deep.equals(expected);

  });

  it('should set the expanded flag to true on the order that has the same orderID as the detail', () => {

    const selectedOrder = orders[0];
    const action = {
      type: actionTypes.LOADING_ORDER_DETAIL,
      orderID: 954
    };

    const orderList = orders.map(order => {
      return {
        ...order,
        expanded: false
      };
    });

    const state = {
      orderList,
      monthlySummary: []
    };

    const expected = true;
    const actual = reducer(state, action)
      .orderList
      .find(order => order.orderID === selectedOrder.orderID)
      .expanded;

    expect(actual).deep.equals(expected);

  });

  it('should set the expanded flag to false if the orderID does not match the orders', () => {

    const action = {
      type: actionTypes.HIDE_ORDER_DETAIL,
      orderID: 70
    };

    const orderList = orders.map(order => {
      return {
        ...order,
        expanded: false
      };
    });

    const state = {
      orderList,
      monthlySummary: []
    };

    const expected = true;
    const actual = reducer(state, action)
      .orderList
      .every(order => !order.expanded);

    expect(actual).deep.equals(expected);

  });

  it('should leave the order untouched with the expanded flag to true if the orderID does match the order', () => {

    const action = {
      type: actionTypes.HIDE_ORDER_DETAIL,
      orderID: 70
    };

    const orderList = orders.map(order => {
      return {
        ...order,
        expanded: true
      };
    });

    const state = {
      orderList,
      monthlySummary: []
    };

    const expected = true;
    const actual = reducer(state, action)
      .orderList[0].expanded;


    expect(actual).deep.equals(expected);

  });

  it('should set the monthlySummary property in the reducer accordingly with the data from the dispatch', () => {

    const action = {
      type: actionTypes.LOAD_MONTHLY_SUMMARY_SUCCESS,
      data: monthlySummary
    };

    const state = {
      orderList: [],
      monthlySummary: []
    };

    const expected = monthlySummary;
    const actual = reducer(state, action)
      .monthlySummary;

    expect(actual).deep.equals(expected);

  });

});
