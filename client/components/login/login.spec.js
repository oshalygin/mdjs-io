import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm.jsx';
import Spinner from '../common/spinner';
import Version from '../common/version';
import Snackbar from '../common/snackbar';
import sinon from 'sinon';

import Login from './index';

jest.dontMock('react-router');
import { expect } from 'chai';

describe('<Login />', () => {

  const props = {
    loading: {
      loadingUser: false
    },
    user: {}
  };

  it('should contain a heading with a className of "logo-name"', () => {

    const expected = 'logo-name';
    const wrapper = shallow(<Login.WrappedComponent {...props} />);

    const actual = wrapper.find('h1').props().className;

    expect(actual).equals(expected);
  });

  it('should display the LoginForm component when the loadingUser flag is false', () => {

    const expected = 1;
    const wrapper = shallow(<Login.WrappedComponent {...props} />);

    const actual = wrapper.find(LoginForm).length;

    expect(actual).equals(expected);
  });

  it('should display the Spinner component when the loadingUser flag is true', () => {
    const loading = {
      loadingUser: true
    };
    const updatedProps = { ...props, loading };
    const expected = 1;
    const wrapper = shallow(<Login.WrappedComponent {...updatedProps} />);

    const actual = wrapper.find(Spinner).length;

    expect(actual).equals(expected);
  });

  it('should contain a version component', () => {

    const expected = 1;
    const wrapper = shallow(<Login.WrappedComponent {...props} />);

    const actual = wrapper.find(Version).length;

    expect(actual).equals(expected);
  });

  it('should contain a <Snackbar /> component', () => {

    const expected = 1;
    const wrapper = shallow(<Login.WrappedComponent {...props} />);

    const actual = wrapper.find(Snackbar).length;

    expect(actual).equals(expected);
  });

  it('should turn off the notification when calling closeNotification', () => {

    const expected = false;
    const instance = shallow(<Login.WrappedComponent {...props} />)
      .instance();

    instance.setState({ notification: true });
    instance.closeNotification();

    const actual = instance.state.notification;

    expect(actual).equals(expected);
  });

  it('should redirect to the dashboard if the redirect function is called', () => {

    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const expected = false;
    const instance = shallow(<Login.WrappedComponent {...props} />)
      .instance();

    instance.redirect();

    const actual = instance.state.notification;

    expect(actual).equals(expected);
  });

});
