import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm.jsx';
import TextField from '../common/TextField.jsx';
import RaisedButton from 'material-ui/RaisedButton';

describe('<LoginForm />', () => {
  const props = {
    errors: {},
    onChange() {},
    login() {},
  };

  it('should display two input fields', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    const expected = 2;

    const actual = wrapper.find(TextField).length;
    expect(actual).toEqual(expected);
  });

  it('should display a button that states "Log In"', () => {
    const expected = 1;

    const wrapper = shallow(<LoginForm {...props} />);
    const actual = wrapper
      .find(RaisedButton)
      .nodes.filter(node => node.props.label === 'Log In').length;

    expect(actual).toEqual(expected);
  });

  it('should display a button that states "Register"', () => {
    const expected = 1;

    const wrapper = shallow(<LoginForm {...props} />);
    const actual = wrapper
      .find(RaisedButton)
      .nodes.filter(node => node.props.label === 'Register').length;

    expect(actual).toEqual(expected);
  });

  it('should set the display to none on the form if the hidden prop is passed in as true', () => {
    const updatedProps = {
      ...props,
      hidden: true,
    };

    const wrapper = shallow(<LoginForm {...updatedProps} />);
    const expected = 'none';

    const actual = wrapper.first().props().style.display;
    expect(actual).toEqual(expected);
  });

  it('should set the display to initial on the form if the hidden prop is passed in as true', () => {
    const updatedProps = {
      ...props,
      hidden: false,
    };

    const wrapper = shallow(<LoginForm {...updatedProps} />);
    const expected = 'initial';

    const actual = wrapper.first().props().style.display;
    expect(actual).toEqual(expected);
  });

  it('should display the error text if the errors prop is passed in as true', () => {
    const updatedProps = {
      ...props,
      errors: {
        server: 'Invalid email address or password',
      },
    };

    const wrapper = shallow(<LoginForm {...updatedProps} />);
    const expected = 'initial';

    const actual = wrapper.find('.error-text').props().style.display;
    expect(actual).toEqual(expected);
  });

  it('should display the error text of "Invalid email address or password" for generic errors', () => {
    const updatedProps = {
      ...props,
      errors: {
        server: 'Invalid email address or password',
      },
    };

    const wrapper = shallow(<LoginForm {...updatedProps} />);
    const expected = 'Invalid email address or password';

    const actual = wrapper.find('.error-text').text();
    expect(actual).toEqual(expected);
  });
});
