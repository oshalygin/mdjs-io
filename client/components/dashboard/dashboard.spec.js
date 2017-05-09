import { shallow } from 'enzyme';
import React from 'react';

import Dashboard from './index';
import MonthlySummary from './monthlySummary';
import SalesWidget from './SalesWidget.jsx';

import { expect } from 'chai';

describe('<Dashboard />', () => {

  it('should contain a <MonthlySummary /> component on the dashboard', () => {

    const expected = 1;
    const wrapper = shallow(<Dashboard />);
    const actual = wrapper.find(MonthlySummary)
      .length;

    expect(actual).equals(expected);

  });

  it('should contain a <SalesWidget /> component on the dashboard', () => {

    const expected = 1;
    const wrapper = shallow(<Dashboard />);
    const actual = wrapper.find(SalesWidget)
      .length;

    expect(actual).equals(expected);

  });

});
