import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import sinon from 'sinon';

import React from 'react';
import Discounts from './index';

jest.dontMock('react-router');
import { expect } from 'chai';

describe('<Discounts />', () => {

  const discounts = [
    {
      discountID: 31,
      discountTypeID: 0,
      discountName: 'Neighbor Discount',
      value: 10,
      applyTypeID: 0,
      items: [],
      lastUpdatedDate: '2017-04-13T21:33:36.087',
      createdDate: '2017-04-13T21:33:36.087',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0
    },
    {
      discountID: 32,
      discountTypeID: 1,
      discountName: 'Best Friend',
      value: 5,
      applyTypeID: 0,
      items: [],
      lastUpdatedDate: '2017-04-13T21:44:51.023',
      createdDate: '2017-04-13T21:44:51.023',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0
    }
  ];

  const props = {
    discounts,
    query: '',
    filter: '',
    discountActions() { }
  };

  it('should contain a button component that is titled "New Discount"', () => {

    const expected = 'New Discount';
    const wrapper = shallow(<Discounts.WrappedComponent {...props} />);

    const actual = wrapper.find(RaisedButton).props().label;

    expect(actual).equals(expected);
  });

  it('should navigate to the "discount" route when navigateToNewDiscountPage is called', () => {
    
    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const expected = true;
    const wrapper = shallow(<Discounts.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.navigateToNewDiscountPage();

    const actual = redirectSpy.calledWith('discount');

    expect(actual).equals(expected);
  });

  it('should dispatch the deactivate action with the passed in id that matches the discount in the list', () => {

    const deactivatedDiscountSpy = sinon.stub().returns({
      then(foobar) { //eslint-disable-line no-unused-vars
        return {
          catch() { }
        };
      }
    });

    deactivatedDiscountSpy.then = function () { };

    const updatedProps = {
      ...props,
      discountActions: {
        deactivateDiscount: deactivatedDiscountSpy
      }
    };

    const expected = true;
    const wrapper = shallow(<Discounts.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.deactivate(31);

    const actual = deactivatedDiscountSpy.calledWith(discounts[0]);
    expect(actual).equals(expected);

  });

  it('should filter the list to only include the discounts from the searchCriteria', () => {

    const searchCriteria = 'T';
    const expected = 2;
    const wrapper = shallow(<Discounts.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .discounts.length;

    expect(actual).equals(expected);
  });

  it('should filter the list and match on lowercase as well', () => {

    const searchCriteria = 't';
    const expected = 2;
    const wrapper = shallow(<Discounts.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .discounts.length;

    expect(actual).equals(expected);
  });

  it('should set the filter object appropriately on the local state', () => {

    const searchCriteria = 'b';
    const expected = searchCriteria;
    const wrapper = shallow(<Discounts.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .filter;

    expect(actual).equals(expected);
  });

});
