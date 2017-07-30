import { shallow } from 'enzyme';
import React from 'react';

import TransactionsWidget from './TransactionsWidget.jsx';
import Pill from '../common/pill';

import { expect } from 'chai';

describe('<TransactionsWidget />', () => {
  const props = {
    creditCardTransactions: 1500,
    cashTransactions: 1304,
  };

  it('should contain a title of "Transactions"', () => {
    const expected = 'Transactions';
    const wrapper = shallow(<TransactionsWidget {...props} />);
    const actual = wrapper.find('.widget-title').text();

    expect(actual).equals(expected);
  });

  it('should display the credit card transactions value as "$ 1,500"', () => {
    const expected = '$ 1,500';
    const wrapper = shallow(<TransactionsWidget {...props} />);
    const actual = wrapper
      .find('.transaction-widget-content-value')
      .at(0)
      .text();

    expect(actual).equals(expected);
  });

  it('should display the cash transactions value as "$ 1,304"', () => {
    const expected = '$ 1,304';
    const wrapper = shallow(<TransactionsWidget {...props} />);
    const actual = wrapper
      .find('.transaction-widget-content-value')
      .at(1)
      .text();

    expect(actual).equals(expected);
  });

  it('should display the credit card transaction percentage as "53% Credit Card"', () => {
    const expected = '53% Credit Card';
    const wrapper = shallow(<TransactionsWidget {...props} />);
    const actual = wrapper.find('.transaction-content-subtext').at(0).text();

    expect(actual).equals(expected);
  });

  it('should display the cash transaction percentage as "47% Cash"', () => {
    const expected = '47% Cash';
    const wrapper = shallow(<TransactionsWidget {...props} />);
    const actual = wrapper.find('.transaction-content-subtext').at(1).text();

    expect(actual).equals(expected);
  });

  it('should contain a <Pill /> component with a label of "Today"', () => {
    const expected = 'Today';
    const wrapper = shallow(<TransactionsWidget {...props} />);
    const actual = wrapper.find(Pill).props().label;

    expect(actual).equals(expected);
  });
});
