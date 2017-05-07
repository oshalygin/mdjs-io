import { shallow } from 'enzyme';
import React from 'react';

import MonthlySummary from './index';
import MonthlyChart from './MonthlyChart.jsx';

import { expect } from 'chai';

describe('<MonthlySummary />', () => {

  const props = {
    data: [],
    orderActions: {}
  };

  it('should set the title heading to "Monthly Sales Volume"', () => {

    const expected = 'Monthly Sales Volume';
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find('.title-heading')
      .text();

    expect(actual).equals(expected);

  });

  it('should set the title subheading to "Number of orders"', () => {

    const expected = 'Number of orders';
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find('.title-subheading')
      .text();

    expect(actual).equals(expected);

  });

  it('should contain a <MonthlyChart /> component', () => {

    const expected = 1;
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find(MonthlyChart)
      .length;

    expect(actual).equals(expected);

  });

});
