import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SquareSpinner from './SquareSpinner.jsx';

describe('<SquareSpinner />', () => {
  it('should contain a spinner with a class of spinner', () => {
    const wrapper = shallow(<SquareSpinner />);
    const expected = 'spinner';

    const actual = wrapper.first().props().className;
    expect(actual).equals(expected);
  });

  it('should not be displayed if the hidden prop is passed in', () => {
    const props = {
      hidden: true,
    };

    const wrapper = shallow(<SquareSpinner {...props} />);
    const expected = 'none';

    const actual = wrapper.first().props().style.display;

    expect(actual).equals(expected);
  });

  it('should have the initial display if the prop passed in is false', () => {
    const props = {
      hidden: false,
    };

    const wrapper = shallow(<SquareSpinner {...props} />);
    const expected = 'initial';

    const actual = wrapper.first().props().style.display;

    expect(actual).equals(expected);
  });
});
