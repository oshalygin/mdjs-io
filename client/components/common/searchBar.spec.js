import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';
import SearchBar from './SearchBar.jsx';

describe('<SearchBar />', () => {
  const defaultProps = {
    user: {},
    userActions: {},
  };

  it('should contain a logout link', () => {
    const expected = 'Log out';

    const wrapper = shallow(<SearchBar.WrappedComponent {...defaultProps} />);
    const actual = wrapper.first('i.fa-sign-out').text();

    expect(actual).toEqual(expected);
  });

  it('navbar contains a clickHandler to toggle the side navigation menu', () => {
    const expected = true;
    const wrapper = shallow(<SearchBar.WrappedComponent {...defaultProps} />);
    const actual = wrapper.find('a').first().props().onClick();

    expect(actual).toEqual(expected);
  });

  it('should properly redirect to the /login route when logout is clicked', () => {
    const updatedProps = {
      ...defaultProps,
      userActions: {
        logout() {},
      },
    };

    const redirectSpy = sinon.spy();
    const history = require('../../utilities/history').default;
    history.push = redirectSpy;

    const expected = true;
    shallow(<SearchBar.WrappedComponent {...updatedProps} />)
      .find('.logout-link')
      .simulate('click');

    const actual = redirectSpy.calledWith('/login');
    expect(actual).toEqual(expected);
  });

  it('should call the logout userAction when clicking the logout link', () => {
    const logoutUserActionSpy = sinon.spy();
    const updatedProps = {
      ...defaultProps,
      userActions: {
        logout: logoutUserActionSpy,
      },
    };

    const redirectSpy = sinon.spy();
    const history = require('../../utilities/history').default;
    history.push = redirectSpy;

    const expected = true;
    shallow(<SearchBar.WrappedComponent {...updatedProps} />)
      .find('.logout-link')
      .simulate('click');

    const actual = logoutUserActionSpy.called;
    expect(actual).toEqual(expected);
  });
});
