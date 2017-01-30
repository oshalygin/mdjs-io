/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import sinon from 'sinon';

import React from 'react';
import Item from './index';

import { expect } from 'chai';

describe('<Item />', () => {

  const props = {
    items: []
  };

  it('should contain a button component that is titled "New Item"', () => {

    const expected = 'New Item';
    const wrapper = shallow(<Item.WrappedComponent {...props} />);

    const actual = wrapper.find(RaisedButton).props().label;

    expect(actual).equals(expected);
  });

  it('should navigate to the "item" route when navigateToNewItemPage is called', () => {
    const redirectSpy = sinon.spy();
    Item.__Rewire__('browserHistory', {
      push: redirectSpy
    });

    const expected = true;
    const wrapper = shallow(<Item.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.navigateToNewItemPage();

    const actual = redirectSpy.calledWith('item');

    expect(actual).equals(expected);
    Item.__ResetDependency__('browserHistory');
  });

});
