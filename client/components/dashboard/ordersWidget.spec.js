import { shallow } from 'enzyme';
import React from 'react';

import OrdersWidget from './OrdersWidget.jsx';
import Pill from '../common/pill';
import colors from '../../styles/colors';

describe('<OrdersWidget />', () => {
  const props = {
    yesterdaysOrders: 1500,
    currentOrders: 1304,
  };

  it('should contain a "arrow_downward" material-icon when the current sales are less than yesterdays sales', () => {
    const expected = 'arrow_downward';
    const wrapper = shallow(<OrdersWidget {...props} />);
    const actual = wrapper.find('.material-icons').text();

    expect(actual).toEqual(expected);
  });

  it('should contain a "arrow_upward" material-icon when the current sales are greater than yesterdays sales', () => {
    const updatedProps = {
      yesterdaysOrders: 1100,
      currentOrders: 1304,
    };

    const expected = 'arrow_upward';
    const wrapper = shallow(<OrdersWidget {...updatedProps} />);
    const actual = wrapper.find('.material-icons').text();

    expect(actual).toEqual(expected);
  });

  it('should contain a <Pill /> component with a label of "Today"', () => {
    const expected = 'Today';
    const wrapper = shallow(<OrdersWidget {...props} />);
    const actual = wrapper.find(Pill).props().label;

    expect(actual).toEqual(expected);
  });

  it('should contain a heading of "Orders"', () => {
    const expected = 'Orders';
    const wrapper = shallow(<OrdersWidget {...props} />);
    const actual = wrapper.find('.widget-title').text();

    expect(actual).toEqual(expected);
  });

  it('should set the percentage difference accordingly as "14%"', () => {
    const expected = '14%';
    const wrapper = shallow(<OrdersWidget {...props} />);
    const actual = wrapper.find('.percent-change-subtext').text();

    expect(actual).toEqual(expected);
  });

  it('should set the order count accordingly as "1304"', () => {
    const expected = '1304';
    const wrapper = shallow(<OrdersWidget {...props} />);
    const actual = wrapper.find('.widget-content-value').text();

    expect(actual).toEqual(expected);
  });

  it('should set the color of the trending arrow to the error color if the trend is down', () => {
    const expected = colors.error;
    const wrapper = shallow(<OrdersWidget {...props} />);
    const actual = wrapper.find('.trending-arrow').props().style.color;

    expect(actual).toEqual(expected);
  });

  it('should set the color of the trending arrow to green if the trend is up', () => {
    const updatedProps = {
      yesterdaysOrders: 1100,
      currentOrders: 1304,
    };

    const expected = colors.green;
    const wrapper = shallow(<OrdersWidget {...updatedProps} />);
    const actual = wrapper.find('.trending-arrow').props().style.color;

    expect(actual).toEqual(expected);
  });
});
