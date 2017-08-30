import React from 'react';
import { shallow } from 'enzyme';

import RegistrationForm from './RegistrationForm.jsx';
import Spinner from '../common/spinner';
import Version from '../common/version';
import Snackbar from '../common/snackbar';

import Registration from './index';

describe('<Registration />', () => {
  const props = {
    loading: {
      loadingUser: false,
    },
    user: {},
  };

  it('should contain a heading with a className of "logo-name"', () => {
    const expected = 'logo-name logo-name';
    const wrapper = shallow(<Registration.WrappedComponent {...props} />);

    const actual = wrapper.find('h1').props().className;

    expect(actual).toEqual(expected);
  });

  it('should display the RegistrationForm component when the loadingUser flag is false', () => {
    const expected = 1;
    const wrapper = shallow(<Registration.WrappedComponent {...props} />);

    const actual = wrapper.find(RegistrationForm).length;

    expect(actual).toEqual(expected);
  });

  it('should display the Spinner component when the loadingUser flag is true', () => {
    const loading = {
      loadingUser: true,
    };
    const updatedProps = { ...props, loading };
    const expected = 1;
    const wrapper = shallow(
      <Registration.WrappedComponent {...updatedProps} />,
    );

    const actual = wrapper.find(Spinner).length;
    expect(actual).toEqual(expected);
  });

  it('should contain a version component', () => {
    const expected = 1;
    const wrapper = shallow(<Registration.WrappedComponent {...props} />);

    const actual = wrapper.find(Version).length;
    expect(actual).toEqual(expected);
  });

  it('should contain a <Snackbar /> component', () => {
    const expected = 1;
    const wrapper = shallow(<Registration.WrappedComponent {...props} />);

    const actual = wrapper.find(Snackbar).length;
    expect(actual).toEqual(expected);
  });

  it('should turn off the notification when calling closeNotification', () => {
    const expected = false;
    const instance = shallow(
      <Registration.WrappedComponent {...props} />,
    ).instance();

    instance.setState({ notification: true });
    instance.closeNotification();

    const actual = instance.state.notification;
    expect(actual).toEqual(expected);
  });

  it('should display the heading text as "Processing Registration" when the loading state is true', () => {
    const expected = 'Processing Registration';
    const wrapper = shallow(<Registration.WrappedComponent {...props} />);

    const actual = wrapper.find('h3').text();
    expect(actual).toEqual(expected);
  });

  it('should display the heading text as "Registration" when the loading state is false', () => {
    const updatedProps = {
      ...props,
      loading: false,
    };

    const expected = 'Registration';
    const wrapper = shallow(
      <Registration.WrappedComponent {...updatedProps} />,
    );

    const actual = wrapper.find('h3').text();
    expect(actual).toEqual(expected);
  });
});
