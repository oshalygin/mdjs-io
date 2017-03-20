/* eslint-disable no-underscore-dangle */
import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';
import { expect } from 'chai';

import SearchBar from './SearchBar.jsx';

describe('<SearchBar />', () => {

  const defaultProps = {
    user: {},
    userActions: {}
  };

  it('should contain a logout link', () => {
    const expected = 'Log out';

    const wrapper = shallow(<SearchBar.WrappedComponent {...defaultProps} />);
    const actual = wrapper.first('i.fa-sign-out').text();

    expect(actual).to.equal(expected);
  });

  it('navbar contains a clickHandler to toggle the side navigation menu', () => {

    const expected = true;    
    const wrapper = shallow(<SearchBar.WrappedComponent {...defaultProps} />);
    const actual = wrapper.find('a').first()
      .props()
      .onClick();

    expect(actual).equals(expected);
  });

  it('should properly redirect to the /login route when logout is clicked', () => {

    const updatedProps = {
      ...defaultProps,
      userActions: {
        logout() { }
      }
    };

    const redirectSpy = sinon.spy();
    SearchBar.__Rewire__('browserHistory', {
      push: redirectSpy
    });

    const expected = true;
    shallow(<SearchBar.WrappedComponent {...updatedProps} />)
      .find('.logout-link')
      .simulate('click');


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
    SearchBar.__Rewire__('browserHistory', {
      push: redirectSpy
    });

    const expected = true;
    shallow(<SearchBar.WrappedComponent {...updatedProps} />)
      .find('.logout-link')
      .simulate('click');


    const actual = logoutUserActionSpy.called;
    expect(actual).to.equal(expected);
  });

});
