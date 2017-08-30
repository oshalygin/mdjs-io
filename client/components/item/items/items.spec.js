/* eslint-disable no-unused-vars */
import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import sinon from 'sinon';

import React from 'react';
import Item from './index';

describe('<Items />', () => {
  const items = [
    {
      itemID: 1,
      name: 'Foo',
      label: 'Foo',
      price: 30.99,
      color: 5,
      photoURL: 'http//foobar.com/images/foo.jpg',
      file: null,
      itemCategoryID: 2,
      isActive: 1,
      priceTypeID: 1,
    },
    {
      itemID: 2,
      name: 'Baz',
      label: 'Baz',
      price: 10.99,
      color: 3,
      photoURL: 'http//foobar.com/images/baz.jpg',
      file: null,
      itemCategoryID: 2,
      isActive: 1,
      priceTypeID: 1,
    },
    {
      itemID: 3,
      name: 'Quux',
      label: 'Quux',
      price: 10.99,
      color: 2,
      photoURL: 'http//foobar.com/images/quux.jpg',
      file: null,
      itemCategoryID: 2,
      isActive: 1,
      priceTypeID: 1,
    },
  ];

  const props = {
    items,
    query: '',
    filter: '',
    itemActions() {},
  };

  it('should contain a button component that is titled "New Item"', () => {
    const expected = 'New Item';
    const wrapper = shallow(<Item.WrappedComponent {...props} />);

    const actual = wrapper.find(RaisedButton).props().label;

    expect(actual).toEqual(expected);
  });

  it('should navigate to the "item" route when navigateToNewItemPage is called', () => {
    const redirectSpy = sinon.spy();
    const history = require('../../../utilities/history').default;
    history.push = redirectSpy;

    const expected = true;
    const wrapper = shallow(<Item.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.navigateToNewItemPage();

    const actual = redirectSpy.calledWith('/dashboard/items/new');

    expect(actual).toEqual(expected);
  });

  it('should dispatch the deactivate action with the passed in id that matches the items in the list', () => {
    const deactivateItemSpy = sinon.stub().returns({
      then(foobar) {
        //eslint-disable-line no-unused-vars
        return {
          catch() {},
        };
      },
    });

    deactivateItemSpy.then = function() {};

    const updatedProps = {
      ...props,
      itemActions: {
        deactivateItem: deactivateItemSpy,
      },
    };

    const expected = true;
    const wrapper = shallow(<Item.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.deactivate(1);

    const actual = deactivateItemSpy.calledWith(items[0]);
    expect(actual).toEqual(expected);
  });

  it('should filter the list to only include the items from the searchCriteria', () => {
    const searchCriteria = 'B';
    const expected = 1;
    const wrapper = shallow(<Item.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria,
      },
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state.items.length;

    expect(actual).toEqual(expected);
  });

  it('should filter the list and match on lowercase as well', () => {
    const searchCriteria = 'b';
    const expected = 1;
    const wrapper = shallow(<Item.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria,
      },
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state.items.length;

    expect(actual).toEqual(expected);
  });

  it('should set the filter object appropriately on the local state', () => {
    const searchCriteria = 'b';
    const expected = searchCriteria;
    const wrapper = shallow(<Item.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria,
      },
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state.filter;

    expect(actual).toEqual(expected);
  });
});
