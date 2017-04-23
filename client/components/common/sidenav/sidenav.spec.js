import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import SideNav from './index';
import SideBarUser from './SideBarUser.jsx';

jest.dontMock('react-router');
import { expect } from 'chai';

describe('<SideNav />', () => {

  const defaultProps = {
    user: {
      firstName: 'Oleg',
      lastName: 'Shalygin',
      role: 1
    },
    userActions: {},
    pathName: 'dashboard'
  };

  it('should contain SideBarUser component', () => {
    const expected = 1;

    const wrapper = shallow(<SideNav.WrappedComponent {...defaultProps} />);
    const actual = wrapper.find(SideBarUser).length;

    expect(actual).to.equal(expected);
  });

  it('should properly redirect to the /login route when logout is clicked', () => {

    const updatedProps = {
      ...defaultProps,
      userActions: {
        logout() { }
      }
    };

    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const expected = true;
    const instance = shallow(<SideNav.WrappedComponent {...updatedProps} />)
      .instance();
    instance.logout();


    const actual = redirectSpy.calledWith('login');
    expect(actual).to.equal(expected);
    
  });

  it('should call the logout userAction when clicking the logout link', () => {

    const logoutUserActionSpy = sinon.spy();
    const updatedProps = {
      ...defaultProps,
      userActions: {
        logout: logoutUserActionSpy
      }
    };

    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const expected = true;
    const instance = shallow(<SideNav.WrappedComponent {...updatedProps} />)
      .instance();
    instance.logout();

    const actual = logoutUserActionSpy.called;
    expect(actual).to.equal(expected);
  });

});
