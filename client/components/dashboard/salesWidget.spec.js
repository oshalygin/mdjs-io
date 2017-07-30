import { shallow } from 'enzyme';
import React from 'react';

import SalesWidget from './SalesWidget.jsx';
import Pill from '../common/pill';
import colors from '../../styles/colors';

import { expect } from 'chai';

describe('<SalesWidget />', () => {
  const props = {
    yesterdaysSales: 1500,
    currentSales: 1304,
  };

  it('should contain a "arrow_downward" material-icon when the current sales are less than yesterdays sales', () => {
    const expected = 'arrow_downward';
    const wrapper = shallow(<SalesWidget {...props} />);
    const actual = wrapper.find('.material-icons').text();

    expect(actual).equals(expected);
  });

  it('should contain a "arrow_upward" material-icon when the current sales are greater than yesterdays sales', () => {
    const updatedProps = {
      yesterdaysSales: 1100,
      currentSales: 1304,
    };

    const expected = 'arrow_upward';
    const wrapper = shallow(<SalesWidget {...updatedProps} />);
    const actual = wrapper.find('.material-icons').text();

    expect(actual).equals(expected);
  });

  it('should contain a <Pill /> component with a label of "Today"', () => {
    const expected = 'Today';
    const wrapper = shallow(<SalesWidget {...props} />);
    const actual = wrapper.find(Pill).props().label;

    expect(actual).equals(expected);
  });

  it('should contain a heading of "Sales"', () => {
    const expected = 'Sales';
    const wrapper = shallow(<SalesWidget {...props} />);
    const actual = wrapper.find('.widget-title').text();

    expect(actual).equals(expected);
  });

  it('should set the percentage difference accordingly as "14%"', () => {
    const expected = '14%';
    const wrapper = shallow(<SalesWidget {...props} />);
    const actual = wrapper.find('.percent-change-subtext').text();

    expect(actual).equals(expected);
  });

  it('should set the sales volume value accordingly as "$ 1,304"', () => {
    const expected = '$ 1,304';
    const wrapper = shallow(<SalesWidget {...props} />);
    const actual = wrapper.find('.widget-content-value').text();

    expect(actual).equals(expected);
  });

  it('should set the color of the trending arrow to the error color if the trend is down', () => {
    const expected = colors.error;
    const wrapper = shallow(<SalesWidget {...props} />);
    const actual = wrapper.find('.trending-arrow').props().style.color;

    expect(actual).equals(expected);
  });

  it('should set the color of the trending arrow to green if the trend is up', () => {
    const updatedProps = {
      yesterdaysSales: 1100,
      currentSales: 1304,
    };

    const expected = colors.green;
    const wrapper = shallow(<SalesWidget {...updatedProps} />);
    const actual = wrapper.find('.trending-arrow').props().style.color;

    expect(actual).equals(expected);
  });
});
