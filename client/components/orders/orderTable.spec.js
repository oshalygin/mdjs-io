import { shallow } from 'enzyme';
import { TableHeaderColumn, TableHeader } from 'material-ui/Table';
import OrderTableRow from './OrderTableRow.jsx';

import React from 'react';
import OrderTable from './OrderTable.jsx';

import { expect } from 'chai';

describe('<OrderTable />', () => {

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
      }],
    deactivate() { },
    children: []
  };

  it('should contain (7) Headers that identify the order', () => {

    const expected = 7;

    const wrapper = shallow(<OrderTable {...props} />);
    const actual = wrapper.find(TableHeaderColumn).length;

    expect(actual).equals(expected);

  });

  it('should set the displaySelectAll to false on the table to not render the checkboxes', () => {

    const expected = false;

    const wrapper = shallow(<OrderTable {...props} />);
    const actual = wrapper.find(TableHeader).props().displaySelectAll;

    expect(actual).equals(expected);

  });

  it('should render an equivalent number of rows to the number of orders in props', () => {

    const expected = props.orders.length;

    const wrapper = shallow(<OrderTable {...props} />);
    const actual = wrapper.find(OrderTableRow).length;

    expect(actual).equals(expected);

  });

});
