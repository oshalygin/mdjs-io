import React from 'react';
import { shallow } from 'enzyme';

import Spinner from './index.js';
import CircularProgress from 'material-ui/CircularProgress';

describe('<Spinner />', () => {
  it('should contain a circular spinner component from Material-UI', () => {
    const wrapper = shallow(<Spinner />);
    const expected = 1;

    const actual = wrapper.find(CircularProgress).length;
    expect(actual).toEqual(expected);
  });

  it('should set the default spinner thickness to 5 if nothing is passed in as props', () => {
    const wrapper = shallow(<Spinner />);
    const expected = 5;

    const actual = wrapper.find(CircularProgress).props().thickness;

    expect(actual).toEqual(expected);
  });

  it('should set the default spinner size to 80 if nothing is passed in as props', () => {
    const wrapper = shallow(<Spinner />);
    const expected = 80;

    const actual = wrapper.find(CircularProgress).props().size;

    expect(actual).toEqual(expected);
  });

  it('should set the thickness to the passed in prop', () => {
    const wrapper = shallow(<Spinner thickness="8" />);
    const expected = '8';

    const actual = wrapper.find(CircularProgress).props().thickness;

    expect(actual).toEqual(expected);
  });

  it('should not be displayed if the hidden prop is passed in', () => {
    const props = {
      hidden: true,
    };

    const wrapper = shallow(<Spinner {...props} />);
    const expected = 'none';

    const actual = wrapper.find(CircularProgress).props().style.display;

    expect(actual).toEqual(expected);
  });

  it('should have the initial display if the prop passed in is false', () => {
    const props = {
      hidden: false,
    };

    const wrapper = shallow(<Spinner {...props} />);
    const expected = 'initial';

    const actual = wrapper.find(CircularProgress).props().style.display;

    expect(actual).toEqual(expected);
  });
});
