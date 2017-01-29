/* eslint-disable no-unused-vars */
import { shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import Dashboard from './index';

import {expect} from 'chai';

describe('<Dashboard />', () => {

  it('Main dashboard page includes a heading of "Welcome to the Merchant Dashboard"', () => {

    const expected = 'Welcome to the Merchant Dashboard';
    const wrapper = shallow(<Dashboard />);
    const actual = wrapper.find('h1').props().children;

    expect(actual).equals(expected);

  });

});
