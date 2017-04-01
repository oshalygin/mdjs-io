/* eslint-disable no-underscore-dangle */
import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import sinon from 'sinon';

import React from 'react';
import Taxes from './index';

import { expect } from 'chai';

describe('<Taxes />', () => {

  const taxes = [
    {
      taxID: 19,
      taxName: 'Texas',
      taxTypeID: 0,
      items: [],
      value: 80,
      lastUpdatedDate: '2017-04-01T13:35:21.583',
      createdDate: '2017-04-01T13:35:21.583',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0
    },
    {
      taxID: 20,
      taxName: 'CA',
      taxTypeID: 0,
      items: [],
      value: 10,
      lastUpdatedDate: '2017-04-01T13:35:21.583',
      createdDate: '2017-04-01T13:35:21.583',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0
    }
  ];

  const props = {
    taxes,
    query: '',
    filter: '',
    taxActions() { }
  };

  it('should contain a button component that is titled "New Category"', () => {

    const expected = 'New Tax';
    const wrapper = shallow(<Taxes.WrappedComponent {...props} />);

    const actual = wrapper.find(RaisedButton).props().label;

    expect(actual).equals(expected);
  });

  it('should navigate to the "tax" route when navigateToNewTaxPage is called', () => {
    const redirectSpy = sinon.spy();
    Taxes.__Rewire__('browserHistory', {
      push: redirectSpy
    });

    const expected = true;
    const wrapper = shallow(<Taxes.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.navigateToNewTaxPage();

    const actual = redirectSpy.calledWith('tax');

    expect(actual).equals(expected);
    Taxes.__ResetDependency__('browserHistory');
  });

  it('should dispatch the deactivate action with the passed in id that matches the tax in the list', () => {

    const deactivatedTaxSpy = sinon.stub().returns({
      then(foobar) { //eslint-disable-line no-unused-vars
        return {
          catch() { }
        };
      }
    });

    deactivatedTaxSpy.then = function () { };

    const updatedProps = {
      ...props,
      taxActions: {
        deactivateTax: deactivatedTaxSpy
      }
    };

    const expected = true;
    const wrapper = shallow(<Taxes.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.deactivate(19);

    const actual = deactivatedTaxSpy.calledWith(taxes[0]);
    expect(actual).equals(expected);

  });

  it('should filter the list to only include the taxes from the searchCriteria', () => {

    const searchCriteria = 'T';
    const expected = 1;
    const wrapper = shallow(<Taxes.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .taxes.length;

    expect(actual).equals(expected);
  });

  it('should filter the list and match on lowercase as well', () => {

    const searchCriteria = 't';
    const expected = 1;
    const wrapper = shallow(<Taxes.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .taxes.length;

    expect(actual).equals(expected);
  });

  it('should set the filter object appropriately on the local state', () => {

    const searchCriteria = 'b';
    const expected = searchCriteria;
    const wrapper = shallow(<Taxes.WrappedComponent {...props} />);

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
