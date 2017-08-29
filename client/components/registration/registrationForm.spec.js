import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import RegistrationForm from './RegistrationForm.jsx';
import TextField from '../common/TextField.jsx';
import RaisedButton from 'material-ui/RaisedButton';

describe('<RegistrationForm />', () => {
  const props = {
    errors: {},
    onChange() {},
    login() {},
  };

  it('should display seven input fields', () => {
    const wrapper = shallow(<RegistrationForm {...props} />);
    const expected = 7;

    const actual = wrapper.find(TextField).length;
    expect(actual).equals(expected);
  });

  it('should display a button that states "Register"', () => {
    const wrapper = shallow(<RegistrationForm {...props} />);
    const expected = 'Register';

    const actual = wrapper.find(RaisedButton).props().label;
    expect(actual).equals(expected);
  });

  it('should set the display to none on the form if the hidden prop is passed in as true', () => {
    const updatedProps = {
      ...props,
      hidden: true,
    };

    const wrapper = shallow(<RegistrationForm {...updatedProps} />);
    const expected = 'none';

    const actual = wrapper.first().props().style.display;

    expect(actual).equals(expected);
  });

  it('should set the display to initial on the form if the server error prop is passed in as true', () => {
    const updatedProps = {
      ...props,
      errors: {
        server: true,
      },
    };

    const wrapper = shallow(<RegistrationForm {...updatedProps} />);
    const expected = 'initial';

    const actual = wrapper.first().props().style.display;

    expect(actual).equals(expected);
  });

  it('should not display the error text if the server errors state is false', () => {
    const updatedProps = {
      ...props,
      errors: {
        server: false,
      },
    };

    const wrapper = shallow(<RegistrationForm {...updatedProps} />);
    const expected = 'none';

    const actual = wrapper.find('.error-text').props().style.display;
    expect(actual).equals(expected);
  });

  it('should display the text, "Cannot register, please try again later" if the error text is visible', () => {
    const updatedProps = {
      ...props,
      errors: {
        server: true,
      },
    };

    const expected = 'Cannot register, please try again later';
    const wrapper = shallow(<RegistrationForm {...updatedProps} />);

    const actual = wrapper.find('.error-text').text();
    expect(actual).equals(expected);
  });
});
