/* eslint-disable no-unused-vars */
import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import sinon from 'sinon';

import React from 'react';
import Categories from './index';

jest.dontMock('react-router');
import { expect } from 'chai';

describe('<Categories />', () => {
  const categories = [
    {
      categoryID: 37,
      categoryName: 'foo',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-27T17:54:03.22',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-27T17:54:03.22',
    },
    {
      categoryID: 40,
      categoryName: 'bar',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-27T17:54:03.22',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-27T17:54:03.22',
    },
  ];

  const props = {
    categories,
    query: '',
    filter: '',
    categoryActions() {},
  };

  it('should contain a button component that is titled "New Category"', () => {
    const expected = 'New Category';
    const wrapper = shallow(<Categories.WrappedComponent {...props} />);

    const actual = wrapper.find(RaisedButton).props().label;

    expect(actual).equals(expected);
  });

  it('should navigate to the "category" route when navigateToNewCategoryPage is called', () => {
    const redirectSpy = sinon.spy();
    const history = require('../../../utilities/history').default;
    history.push = redirectSpy;

    const expected = true;
    const wrapper = shallow(<Categories.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.navigateToNewCategoryPage();

    const actual = redirectSpy.calledWith('/dashboard/categories/new');

    expect(actual).equals(expected);
  });

  it('should dispatch the deactivate action with the passed in id that matches the categories in the list', () => {
    const triggerCategoryDeletionSpy = sinon.stub().returns({
      then(foobar) {
        //eslint-disable-line no-unused-vars
        return {
          catch() {},
        };
      },
    });

    triggerCategoryDeletionSpy.then = function() {};

    const updatedProps = {
      ...props,
      categoryActions: {
        triggerCategoryDeletion: triggerCategoryDeletionSpy,
      },
    };

    const expected = true;
    const wrapper = shallow(<Categories.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.deactivate(37);

    const actual = triggerCategoryDeletionSpy.calledWith(categories[0]);
    expect(actual).equals(expected);
  });

  it('should filter the list to only include the categories from the searchCriteria', () => {
    const searchCriteria = 'B';
    const expected = 1;
    const wrapper = shallow(<Categories.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria,
      },
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state.categories.length;

    expect(actual).equals(expected);
  });

  it('should filter the list and match on lowercase as well', () => {
    const searchCriteria = 'b';
    const expected = 1;
    const wrapper = shallow(<Categories.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria,
      },
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state.categories.length;

    expect(actual).equals(expected);
  });

  it('should set the filter object appropriately on the local state', () => {
    const searchCriteria = 'b';
    const expected = searchCriteria;
    const wrapper = shallow(<Categories.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria,
      },
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state.filter;

    expect(actual).equals(expected);
  });
});
