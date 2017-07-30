import { shallow } from 'enzyme';

import React from 'react';
import Orders, { mapStateToProps } from './index';
import Spinner from '../common/spinner/';

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
      totalTip: 0.0,
    },
    {
      orderID: 942,
      total: 20.8725,
      createdDate: '2017-04-15T22:50:54',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 18.975,
      totalTax: 1.8975,
      totalTip: 0.0,
    },
    {
      orderID: 941,
      total: 6.6,
      createdDate: '2017-04-15T22:28:41',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 6.0,
      totalTax: 0.6,
      totalTip: 0.0,
    },
    {
      orderID: 940,
      total: 0.0,
      createdDate: '2017-04-15T22:01:02',
      orderStatusID: 110,
      orderStatusDescription: 'Refunded',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 0.0,
      totalTax: 0.0,
      totalTip: 0.0,
    },
    {
      orderID: 939,
      total: 0.0,
      createdDate: '2017-04-15T21:15:07',
      orderStatusID: 110,
      orderStatusDescription: 'Refunded',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 0.0,
      totalTax: 0.0,
      totalTip: 0.0,
    },
    {
      orderID: 928,
      total: 0.0,
      createdDate: '2017-04-15T15:07:37',
      orderStatusID: 110,
      orderStatusDescription: 'Refunded',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 0.0,
      totalTax: 0.0,
      totalTip: 0.0,
    },
    {
      orderID: 907,
      total: 9.878,
      createdDate: '2017-04-14T15:54:42',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 8.98,
      totalTax: 0.898,
      totalTip: 0.0,
    },
  ];

  const props = {
    orders,
    query: '',
    filter: '',
    orderActions: {
      getAllOrders() {},
    },
  };

  it('should filter the list to only include the orders from the order status searchCriteria', () => {
    const searchCriteria = 'F';
    const expected = 7;
    const wrapper = shallow(<Orders.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria,
      },
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state.orders.length;

    expect(actual).equals(expected);
  });

  it('should filter the list and match on lowercase as well', () => {
    const searchCriteria = 't';
    const expected = 0;
    const wrapper = shallow(<Orders.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria,
      },
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state.orders.length;

    expect(actual).equals(expected);
  });

  it('should set the filter object appropriately on the local state', () => {
    const searchCriteria = 'b';
    const expected = searchCriteria;
    const wrapper = shallow(<Orders.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria,
      },
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state.filter;

    expect(actual).equals(expected);
  });

  it('should map loading to false for every order object', () => {
    const expected = true;
    const state = {
      orders: {
        orderList: orders,
      },
      orderDetail: {},
      loading: {
        loadingOrders: false,
      },
    };

    const mappedOrders = mapStateToProps(state).orders;

    const actual = mappedOrders.every(order => !order.loading);
    expect(actual).equals(expected);
  });

  it('should set the notification property to false if closeNotification is called', () => {
    const expected = false;

    const instance = shallow(<Orders.WrappedComponent {...props} />).instance();

    instance.closeNotification();
    const actual = instance.state.notification;

    expect(actual).equals(expected);
  });

  it('should set the notification property to true if displayNotification is called', () => {
    const expected = true;

    const instance = shallow(<Orders.WrappedComponent {...props} />).instance();

    instance.displayNotification();
    const actual = instance.state.notification;
    instance.closeNotification();

    expect(actual).equals(expected);
  });

  it('should set the notification message to the value that the message was called with', () => {
    const message = 'something went wrong';
    const expected = message;

    const instance = shallow(<Orders.WrappedComponent {...props} />).instance();

    instance.displayNotification(message);
    const actual = instance.state.notificationMessage;
    instance.closeNotification();

    expect(actual).equals(expected);
  });

  it('should NOT display the spinner if the loading prop is false', () => {
    const expected = 0;
    const updatedProps = { ...props, loading: false };

    const wrapper = shallow(<Orders.WrappedComponent {...updatedProps} />);

    const actual = wrapper.find(Spinner).length;

    expect(actual).equals(expected);
  });

  it('should display the spinner if the loading prop is true', () => {
    const expected = 1;
    const updatedProps = { ...props, loading: true };

    const wrapper = shallow(<Orders.WrappedComponent {...updatedProps} />);

    const actual = wrapper.find(Spinner).length;

    expect(actual).equals(expected);
  });
});
