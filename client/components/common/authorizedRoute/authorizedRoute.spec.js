import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { shallow } from 'enzyme';
import { expect } from 'chai';

import AuthorizedRoute from './index';
import Spinner from '../spinner';

describe('<AuthorizedRoute />', () => {
  const props = {
    loading: true,
    user: {},
  };

  it('should be wrapped in a <Route /> component from react-router', () => {
    const expected = 1;

    const wrapper = shallow(<AuthorizedRoute.WrappedComponent {...props} />);
    const actual = wrapper.find(Route).length;

    expect(actual).to.equal(expected);
  });

  it('should set the render props to contain a <Spinner /> component if loading is true', () => {
    const expected = 1;

    const wrapper = shallow(<AuthorizedRoute.WrappedComponent {...props} />);
    const actual = shallow(wrapper.find(Route).props().render()).find(Spinner)
      .length;

    expect(actual).to.equal(expected);
  });

  it('should set the render props to contain a <Redirect /> to login if loggedIn is false', () => {
    const expected = 1;
    const updatedProps = {
      ...props,
      loading: false,
    };
    const wrapper = shallow(
      <AuthorizedRoute.WrappedComponent {...updatedProps} />,
    );
    const actual = shallow(wrapper.find(Route).props().render()).find(Redirect)
      .length;

    expect(actual).to.equal(expected);
  });

  it('should set the render props to contain the passed in component if loggedIn is true', () => {
    const expected = 1;

    const updatedProps = {
      ...props,
      loading: false,
      user: { firstName: 'Oleg', lastName: 'Shalygin' },
      Component: Spinner,
    };
    const wrapper = shallow(
      <AuthorizedRoute.WrappedComponent {...updatedProps} />,
    );
    const actual = shallow(wrapper.first().props().render()).find(
      updatedProps.Component,
    ).length;

    expect(actual).to.equal(expected);
  });
});
