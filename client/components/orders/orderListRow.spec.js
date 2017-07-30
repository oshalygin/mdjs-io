import { shallow } from 'enzyme';

import React from 'react';
import OrderListRow from './OrderListRow.jsx';

import { expect } from 'chai';

describe('<OrderListRow />', () => {
  const props = {
    order: {
      orderID: 907,
      total: 9.87,
      createdDate: '2017-04-14T15:54:42',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 8.98,
      totalTax: 0.89,
      totalTip: 0.0,
    },
    children: [],
  };

  it('should list the status description within the sixth section', () => {
    const expected = 'Fulfilled';

    const wrapper = shallow(<OrderListRow {...props} />);
    const actual = wrapper.find('.sixth-section').text();

    expect(actual).equals(expected);
  });

  it('should list the total amount with the locale', () => {
    const expected = '$ 9.87';

    const wrapper = shallow(<OrderListRow {...props} />);
    const actual = wrapper.find('.fifth-section').text();

    expect(actual).equals(expected);
  });

  it('should list the tax total amount with the locale', () => {
    const expected = '$ 0.89';

    const wrapper = shallow(<OrderListRow {...props} />);
    const actual = wrapper.find('.fourth-section').text();

    expect(actual).equals(expected);
  });
});
