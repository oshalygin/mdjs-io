import { shallow } from 'enzyme';

import React from 'react';
import Orders from './index';

import { expect } from 'chai';

describe('<Orders />', () => {

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


  const props = {
    orders,
    query: '',
    filter: '',
    orderActions: {
      getAllOrders() { }
    }
  };

  it('should filter the list to only include the orders from the order status searchCriteria', () => {

    const searchCriteria = 'F';
    const expected = 7;
    const wrapper = shallow(<Orders.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .orders.length;

    expect(actual).equals(expected);
  });

  it('should filter the list and match on lowercase as well', () => {

    const searchCriteria = 't';
    const expected = 0;
    const wrapper = shallow(<Orders.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .orders.length;

    expect(actual).equals(expected);
  });

  it('should set the filter object appropriately on the local state', () => {

    const searchCriteria = 'b';
    const expected = searchCriteria;
    const wrapper = shallow(<Orders.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .filter;

    expect(actual).equals(expected);
  });

});
