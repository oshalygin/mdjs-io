import { shallow } from 'enzyme';
import React from 'react';

import InventoryWidget from './InventoryWidget.jsx';
import Pill from '../common/pill';

import { expect } from 'chai';

describe('<InventoryWidget />', () => {
  const props = {
    yesterdaysSales: 1500,
    currentSales: 1304,
  };

  it('should contain a <Pill /> component with a label of "Today"', () => {
    const expected = 'Today';
    const wrapper = shallow(<InventoryWidget {...props} />);
    const actual = wrapper.find(Pill).props().label;

    expect(actual).equals(expected);
  });

  it('should contain a heading of "Inventory"', () => {
    const expected = 'Inventory';
    const wrapper = shallow(<InventoryWidget {...props} />);
    const actual = wrapper.find('.widget-title').text();

    expect(actual).equals(expected);
  });
});
