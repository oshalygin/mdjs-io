import { shallow } from 'enzyme';

import React from 'react';
import OrderList from './OrderList.jsx';
import OrderListCard from './OrderListCard.jsx';

import { expect } from 'chai';

describe('<OrderList />', () => {
  const props = {
    orders: [
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
    ],
    deactivate() {},
    children: [],
  };

  it('should contain a column with the "OrderID" heading', () => {
    const expected = 'OrderID';

    const wrapper = shallow(<OrderList {...props} />);
    const actual = wrapper.find('.first-section').text();

    expect(actual).equals(expected);
  });

  it('should contain a column with the "Date" heading', () => {
    const expected = 'Date';

    const wrapper = shallow(<OrderList {...props} />);
    const actual = wrapper.find('.second-section').text();

    expect(actual).equals(expected);
  });

  it('should contain a column with the "Discounts" heading', () => {
    const expected = 'Discounts';

    const wrapper = shallow(<OrderList {...props} />);
    const actual = wrapper.find('.third-section').text();

    expect(actual).equals(expected);
  });

  it('should contain a column with the "Taxes" heading', () => {
    const expected = 'Taxes';

    const wrapper = shallow(<OrderList {...props} />);
    const actual = wrapper.find('.fourth-section').text();

    expect(actual).equals(expected);
  });

  it('should contain a column with the "Total" heading', () => {
    const expected = 'Total';

    const wrapper = shallow(<OrderList {...props} />);
    const actual = wrapper.find('.fifth-section').text();

    expect(actual).equals(expected);
  });

  it('should contain a column with the "Status" heading', () => {
    const expected = 'Status';

    const wrapper = shallow(<OrderList {...props} />);
    const actual = wrapper.find('.sixth-section').text();

    expect(actual).equals(expected);
  });

  it('should list the number of <OrderListCard /> that match the total number of orders', () => {
    const expected = props.orders.length;

    const wrapper = shallow(<OrderList {...props} />);
    const actual = wrapper.find(OrderListCard).length;

    expect(actual).equals(expected);
  });
});
