import React from 'react';
import { shallow } from 'enzyme';

import Dashboard, { mapStateToProps } from './index';
import MonthlySummary from './monthlySummary';
import SalesWidget from './SalesWidget.jsx';

import { expect } from 'chai';

describe('<Dashboard />', () => {
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
      transactionTypeID: 3,
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
      transactionTypeID: 3,
      totalDiscount: 0.0,
      totalSub: 8.98,
      totalTax: 0.898,
      totalTip: 0.0,
    },
  ];

  it('should contain a <MonthlySummary /> component on the dashboard', () => {
    const expected = 1;
    const wrapper = shallow(<Dashboard.WrappedComponent />);
    const actual = wrapper.find(MonthlySummary).length;

    expect(actual).equals(expected);
  });

  it('should contain a <SalesWidget /> component on the dashboard', () => {
    const expected = 1;
    const wrapper = shallow(<Dashboard.WrappedComponent />);
    const actual = wrapper.find(SalesWidget).length;

    expect(actual).equals(expected);
  });

  it('should map the sales amount accordingly in mapStateToProps for yesterdaysSales', () => {
    const expected = 48.3405;

    const state = {
      orders: {
        yesterdaysOrders: orders,
        todaysOrders: [],
      },
    };

    const actual = mapStateToProps(state).yesterdaysSales;

    expect(actual).equals(expected);
  });

  it('should map the sales amount accordingly in mapStateToProps for todaysSales', () => {
    const expected = 48.3405;

    const state = {
      orders: {
        yesterdaysOrders: [],
        todaysOrders: orders,
      },
    };

    const actual = mapStateToProps(state).todaysSales;

    expect(actual).equals(expected);
  });

  it('should map the count accordingly in mapStateToProps for todaysCount', () => {
    const expected = 7;

    const state = {
      orders: {
        yesterdaysOrders: [],
        todaysOrders: orders,
      },
    };

    const actual = mapStateToProps(state).todaysCount;

    expect(actual).equals(expected);
  });

  it('should map the count accordingly in mapStateToProps for yesterdaysCount', () => {
    const expected = 7;

    const state = {
      orders: {
        yesterdaysOrders: orders,
        todaysOrders: [],
      },
    };

    const actual = mapStateToProps(state).yesterdaysCount;

    expect(actual).equals(expected);
  });

  it('should map the cash transaction sales amount accordingly in mapStateToProps for todaysCashTransactionSales', () => {
    const expected = 31.86;

    const state = {
      orders: {
        yesterdaysOrders: [],
        todaysOrders: orders,
      },
    };

    const actual = Number(
      mapStateToProps(state).todaysCashTransactionSales.toFixed(2),
    );

    expect(actual).equals(expected);
  });

  it('should map the credit card transaction sales amount accordingly in mapStateToProps for todaysCreditCardTransactionSales', () => {
    const expected = 16.48;

    const state = {
      orders: {
        yesterdaysOrders: [],
        todaysOrders: orders,
      },
    };

    const actual = Number(
      mapStateToProps(state).todaysCreditCardTransactionSales.toFixed(2),
    );

    expect(actual).equals(expected);
  });
});
