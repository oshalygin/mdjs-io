import React from 'react';
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
    expect(actual).toEqual(expected);
  });

  it('should display a button that states "Register"', () => {
    const expected = 1;

    const wrapper = shallow(<RegistrationForm {...props} />);
    const actual = wrapper
      .find(RaisedButton)
      .nodes.filter(node => node.props.label === 'register').length;

    expect(actual).toEqual(expected);
  });

  it('should display a button that states "Login"', () => {
    const expected = 1;

    const wrapper = shallow(<RegistrationForm {...props} />);
    const actual = wrapper
      .find(RaisedButton)
      .nodes.filter(node => node.props.label === 'login').length;

    expect(actual).toEqual(expected);
  });

  it('should set the display to none on the form if the hidden prop is passed in as true', () => {
    const updatedProps = {
      ...props,
      hidden: true,
    };

    const wrapper = shallow(<RegistrationForm {...updatedProps} />);
    const expected = 'none';

    const actual = wrapper.first().props().style.display;

    expect(actual).toEqual(expected);
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

    expect(actual).toEqual(expected);
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
    expect(actual).toEqual(expected);
  });

  it('should display the text, "Cannot register, please try again later" if the error text is visible', () => {
    const updatedProps = {
      ...props,
      errors: {
        server: 'Cannot register, please try again later',
      },
    };

    const expected = 'Cannot register, please try again later';
    const wrapper = shallow(<RegistrationForm {...updatedProps} />);

    const actual = wrapper.find('.error-text').text();
    expect(actual).toEqual(expected);
  });
});
