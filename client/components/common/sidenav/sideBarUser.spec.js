import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';
import { expect } from 'chai';

import SideBarUser from './SideBarUser.jsx';

describe('<SideBarUser />', () => {

  const defaultProps = {
    firstName: 'Oleg',
    lastName: 'Shalygin',
    roleId: 1,
    logout() { }
  };

  it('should contain a logout link', () => {
    const expected = 'Logout';

    const wrapper = shallow(<SideBarUser {...defaultProps} />);
    const actual = wrapper
      .find('.logout-link-side-nav')
      .text();

    expect(actual).to.equal(expected);
  });

  it('should call the logout callback when clicking the logout link', () => {
    
    const expected = true;
    const logoutSpy = sinon.spy();

    const updatedProps = {
      ...defaultProps,
      logout: logoutSpy
    };
        
    const wrapper = shallow(<SideBarUser {...updatedProps} />);
    wrapper.find('a.logout-link-side-nav')
      .simulate('click');
    
    const actual = logoutSpy.called;

    expect(actual).to.equal(expected);
  });

  it('should persist the first and last name to the name component', () => {
    const expected = `${defaultProps.firstName} ${defaultProps.lastName}`;

    const wrapper = shallow(<SideBarUser {...defaultProps} />);
    const actual = wrapper
      .find('strong.font-bold')
      .text();

    expect(actual).to.equal(expected);
  });

  it('should set the title to Owner if the roleId is 1', () => {
    const expected = 'Owner ';

    const wrapper = shallow(<SideBarUser {...defaultProps} />);
    const actual = wrapper
      .find('span.text-muted')
      .text();

    expect(actual).to.equal(expected);
  });

  it('should set the title to Administrator if the roleId is 2', () => {
    const expected = 'Administrator ';

    const updatedProps = {
      ...defaultProps,
      roleId: 2
    };

    const wrapper = shallow(<SideBarUser {...updatedProps} />);
    const actual = wrapper
      .find('span.text-muted')
      .text();

    expect(actual).to.equal(expected);
  });

  it('should set the title to User if the roleId is 3', () => {
    const expected = 'User ';

    const updatedProps = {
      ...defaultProps,
      roleId: 3
    };

    const wrapper = shallow(<SideBarUser {...updatedProps} />);
    const actual = wrapper
      .find('span.text-muted')
      .text();

    expect(actual).to.equal(expected);
  });

  it('should set the title to User if the roleId is empty', () => {
    const expected = 'User ';

    const updatedProps = {
      ...defaultProps,
      roleId: null
    };

    const wrapper = shallow(<SideBarUser {...updatedProps} />);
    const actual = wrapper
      .find('span.text-muted')
      .text();

    expect(actual).to.equal(expected);
  });


});
