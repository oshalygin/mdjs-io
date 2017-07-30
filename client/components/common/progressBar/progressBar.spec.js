import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ProgressBar from './index.js';
import LinearProgress from 'material-ui/LinearProgress';

import colors from '../../../styles/colors';

describe('<ProgressBar />', () => {
  it('should contain a <LinearProgress /> component from Material-UI', () => {
    const expected = 1;

    const wrapper = shallow(<ProgressBar />);
    const actual = wrapper.find(LinearProgress).length;

    expect(actual).equals(expected);
  });

  it('should set the default <LinearProgress /> height to 0.5rems', () => {
    const expected = '0.5rem';

    const wrapper = shallow(<ProgressBar />);
    const actual = wrapper.find(LinearProgress).props().style.height;

    expect(actual).equals(expected);
  });

  it('should set the default ProgressBar color to blue', () => {
    const expected = colors.blue;

    const wrapper = shallow(<ProgressBar />);

    const actual = wrapper.find(LinearProgress).props().color;

    expect(actual).equals(expected);
  });

  it('should set the min value to the passed in prop', () => {
    const expected = '8';
    const wrapper = shallow(<ProgressBar min="8" />);

    const actual = wrapper.find(LinearProgress).props().min;

    expect(actual).equals(expected);
  });
});
