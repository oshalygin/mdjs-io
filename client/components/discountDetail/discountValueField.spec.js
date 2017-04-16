import { shallow } from 'enzyme';
import TextField from '../common/TextField.jsx';

import React from 'react';
import DiscountValueField from './DiscountValueField.jsx';

import { expect } from 'chai';

describe('<DiscountValueField />', () => {

  const props = {
    isPercent: false,
    errorText: false,
    style: {},
    floatingLabelText: 'value',
    value: null,
    name: 'abcd',
    fullWidth: false,
    onChange() { }
  };

  it('should contain only one TextField', () => {

    const wrapper = shallow(<DiscountValueField {...props} />);

    const expected = 1;
    const actual = wrapper.find(TextField).length;

    expect(actual).equals(expected);

  });


  it('should render a component with a % symbol if isPercent is true', () => {

    const updatedProps = {
      ...props,
      isPercent: true
    };

    const wrapper = shallow(<DiscountValueField {...updatedProps} />);

    const expected = '%';
    const actual = wrapper.find('.percent-text').text();

    expect(actual).equals(expected);

  });

  it('should render a component with a $ symbol if isPercent is false', () => {

    const updatedProps = {
      ...props,
      isPercent: false
    };

    const wrapper = shallow(<DiscountValueField {...updatedProps} />);

    const expected = '$';
    const actual = wrapper.find('.currency-text').text();

    expect(actual).equals(expected);

  });

  it('should properly set the name on the TextField from props', () => {

    const updatedProps = {
      ...props,
      name: 'valueTypeID'
    };

    const wrapper = shallow(<DiscountValueField {...updatedProps} />);

    const expected = 'valueTypeID';
    const actual = wrapper.find(TextField)
      .props()
      .name;

    expect(actual).equals(expected);

  });

  it('should properly set the value on the TextField from props', () => {

    const updatedProps = {
      ...props,
      value: 5
    };

    const wrapper = shallow(<DiscountValueField {...updatedProps} />);

    const expected = 5;
    const actual = wrapper.find(TextField)
      .props()
      .value;

    expect(actual).equals(expected);

  });

  it('should properly set the floatingLabelText on the TextField from props', () => {

    const updatedProps = {
      ...props,
      value: 'value'
    };

    const wrapper = shallow(<DiscountValueField {...updatedProps} />);

    const expected = 'value';
    const actual = wrapper.find(TextField)
      .props()
      .floatingLabelText;

    expect(actual).equals(expected);

  });

  it('should properly set the style on the TextField from props', () => {

    const updatedProps = {
      ...props,
      style: { color: 'blue' }
    };

    const wrapper = shallow(<DiscountValueField {...updatedProps} />);

    const expected = { color: 'blue' };
    const actual = wrapper.find(TextField)
      .props()
      .style;

    expect(actual).deep.equals(expected);

  });

});
