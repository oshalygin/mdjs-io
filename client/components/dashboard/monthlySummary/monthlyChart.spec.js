import { shallow } from 'enzyme';
import React from 'react';

import MonthlyChart, { currencyFormatter } from './MonthlyChart';
import { ResponsiveContainer, Area, AreaChart } from 'recharts';

import { expect } from 'chai';

describe('<MonthlyChart />', () => {

  const props = {
    data: []
  };

  it('should contain a root <ResponsiveContainer /> component which wraps the chart', () => {

    const expected = 1;
    const wrapper = shallow(<MonthlyChart {...props} />);
    const actual = wrapper.find(ResponsiveContainer)
      .length;

    expect(actual).equals(expected);

  });

  it('should set the data from props to the <AreaChart /> component', () => {

    const expected = props.data;
    const wrapper = shallow(<MonthlyChart {...props} />);
    const actual = wrapper.find(AreaChart)
      .props()
      .data;

    expect(actual).equals(expected);

  });

  it('should contain two <Area /> components', () => {

    const expected = 2;
    const wrapper = shallow(<MonthlyChart {...props} />);
    const actual = wrapper.find(Area)
      .length;

    expect(actual).equals(expected);
    
  });

  it('should perform a pass through and display the number value in the local currency when calling currencyFormatter', () => {

    const number = 1000;
    const expected = '$ 1,000.00';
    const actual = currencyFormatter(number);

    expect(actual).equals(expected);

  });

});
