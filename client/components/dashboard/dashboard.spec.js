import { shallow } from 'enzyme';
import React from 'react';

import Dashboard from './index';
import MonthlySummary from './monthlySummary';

import { expect } from 'chai';

describe('<Dashboard />', () => {

  it('should contain a <MonthlySummary /> component on the dashboard', () => {

    const expected = 1;
    const wrapper = shallow(<Dashboard />);
    const actual = wrapper.find(MonthlySummary)
      .length;

    expect(actual).equals(expected);

  });

});
