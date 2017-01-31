import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm.jsx';
import TextField from '../common/TextField.jsx';
import RaisedButton from 'material-ui/RaisedButton';

describe('<LoginForm />', () => {
  const props = {
    onChange() { },
    login() { }
  };

  it('should display two input fields', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    const expected = 2;

    const actual = wrapper.find(TextField).length;
    expect(actual).equals(expected);
  });

  it('should display a button that states "Log In"', () => {
    const wrapper = shallow(<LoginForm {...props} />);
    const expected = 'Log In';

    const actual = wrapper.find(RaisedButton).props().label;
    expect(actual).equals(expected);
  });
});
