import { shallow } from 'enzyme';
import React from 'react';

import MonthlyChart from './MonthlyChart';
import { ResponsiveContainer, AreaChart } from 'recharts';

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

});
