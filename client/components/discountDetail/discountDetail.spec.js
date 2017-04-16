/* eslint-disable no-underscore-dangle */
import React from 'react';
import { shallow } from 'enzyme';
import DiscountDetail, { mapStateToProps } from './index';
import Spinner from '../common/spinner';
import sinon from 'sinon';

import { expect } from 'chai';

describe('<DiscountDetail />', () => {

  const errors = {
    discountName: false
  };

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
      priceTypeID: 1
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
      priceTypeID: 1
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
      priceTypeID: 1
    }
  ];

  const props = {
    discount: {
      discountID: 0,
      discountName: ''
    },
    discountHeading: 'New Discount',
    loading: {
      createUpdateDiscount: false
    },
    errors,
    items,
    discountActions: {}
  };

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

  it('should render the component with the discount detail heading of "New Discount"', () => {

    const expected = 'New Discount';
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...props} />);

    const actual = wrapper.find('h5')
      .props().children;

    expect(actual).equals(expected);
  });

  it('should return the heading as "New Discount" if the passed in props is null', () => {

    const state = {
      discounts
    };
    const ownProps = {
      params: {
        id: null
      }
    };

    const expected = 'New Discount';
    const actual = mapStateToProps(state, ownProps)
      .discountHeading;

    expect(actual).equals(expected);

  });

  it('should return the heading as "Update Discount" if the passed in id prop matches the state categories', () => {

    const state = {
      discounts
    };
    const ownProps = {
      params: {
        id: 31
      }
    };

    const expected = 'Update Discount';
    const actual = mapStateToProps(state, ownProps)
      .discountHeading;

    expect(actual).equals(expected);

  });

  it('should return the existing discount properties if the passed in id prop matches the state discounts', () => {

    const state = {
      discounts
    };
    const ownProps = {
      params: {
        id: 31
      }
    };

    const expected = discounts[0];
    const actual = mapStateToProps(state, ownProps)
      .discount;

    expect(actual).deep.equals(expected);
  });

  it('should return the an empty discount if the passed in id prop is null', () => {

    const state = {
      discounts
    };
    const ownProps = {
      params: {
        id: null
      }
    };

    const expected = {
      discountID: 0,
      discountName: '',
      value: 0,
      discountTypeID: 0,
      items: []
    };

    const actual = mapStateToProps(state, ownProps)
      .discount;
    
    expect(actual).deep.equals(expected);
  });

  it('should render a spinner if the "createUpdateDiscount" loading flag is set', () => {

    const updatedProps = {
      ...props,
      loading: {
        createUpdateDiscount: true
      }
    };

    const expected = 1;
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const actual = wrapper.find(Spinner)
      .length;

    expect(actual).equals(expected);
  });

  it('should navigate back to the "discounts" page if the back button is clicked', () => {

    const redirectSpy = sinon.spy();
    DiscountDetail.__Rewire__('browserHistory', {
      push: redirectSpy
    });

    const expected = true;
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.redirect();

    const actual = redirectSpy.calledWith('discounts');

    expect(actual).equals(expected);
    DiscountDetail.__ResetDependency__('browserHistory');

  });

  it('should set the new state of the discount based on the form field that was changed', () => {

    const updatedProps = {
      ...props,
      discount: discounts[0]
    };

    const expected = 'Foobar';

    const event = {
      target: {
        name: 'discountName',
        value: 'Foobar'
      }
    };

    const index = null;
    const payload = null;

    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onChange(event, index, payload);
    const actual = instance.state
      .discount
      .discountName;

    expect(actual).deep.equals(expected);
  });

  it('should set the items property to the payload array if its an array', () => {

    const updatedProps = {
      ...props,
      discount: discounts[0]
    };

    const event = {};

    const index = null;
    const payload = [1, 3, 79];
    const expected = payload;

    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onChange(event, index, payload);
    const actual = instance.state
      .discount
      .items;

    expect(actual).deep.equals(expected);
  });

  it('should set the items property to the payload property value if it is passed in', () => {

    const updatedProps = {
      ...props,
      discount: discounts[0]
    };

    const event = {};

    const index = null;
    const payload = {
      name: 'applyTypeID',
      value: 0
    };

    const expected = 0;

    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onChange(event, index, payload);
    const actual = instance.state
      .discount
      .applyTypeID;

    expect(actual).deep.equals(expected);
  });

  it('should set the notifications to false if closeNotification is called', () => {

    const expected = false;

    const wrapper = shallow(<DiscountDetail.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.setState({ notification: true });

    instance.closeNotification();
    const actual = instance.state
      .notification;

    expect(actual).deep.equals(expected);
  });

  it('should call "updateDiscount" with the category that was passed in to onSave', () => {
    const redirectSpy = sinon.spy();
    DiscountDetail.__Rewire__('browserHistory', {
      push: redirectSpy
    });

    const updateDiscountSpy = sinon.stub().returns({
      then(foobar) { //eslint-disable-line no-unused-vars
        return {
          catch() { }
        };
      }
    });

    updateDiscountSpy.then = function () { };

    const updatedProps = {
      ...props,
      discount: discounts[0],
      discountActions: {
        updateDiscount: updateDiscountSpy
      }
    };

    const expected = true;
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onSave();

    const actual = updateDiscountSpy.calledWith(discounts[0]);

    expect(actual).equals(expected);
    DiscountDetail.__ResetDependency__('browserHistory');
  });

  it('should return false if the discount discountName is empty when calling formIsValid', () => {

    const updatedProps = {
      ...props,
      discount: discounts[0]
    };

    const expected = false;
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.discount.discountName = '';
    const actual = instance.formIsValid();
    instance.state.discount.discountName = 'Foo'; //reset back to the original state.
    expect(actual).equals(expected);
  });

  it('should return false from formIsValid if the applyTypeID value is not set', () => {

    const updatedProps = {
      ...props,
      discount: {
        discountName: 'Foobar',
        value: 30
      }
    };

    const expected = false;
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.discount.discountName = 'Foobar';
    const actual = instance.formIsValid();
    expect(actual).equals(expected);
  });

  it('should return false from formIsValid if the applyTypeID is greater than 0 and the items array is empty', () => {

    const updatedProps = {
      ...props,
      discount: {
        discountName: 'Foobar',
        value: 30,
        applyTypeID: 1,
        items: []
      }
    };

    const expected = false;
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.discount.discountName = 'Foobar';
    const actual = instance.formIsValid();
    expect(actual).equals(expected);
  });

  it('should return false if there are validation errors calling formIsValid', () => {

    const updatedProps = {
      ...props,
      discount: discounts[0]
    };

    const errorState = {
      ...errors,
      discountName: true
    };

    const expected = false;
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.errors = errorState;
    const actual = instance.formIsValid();
    instance.state.errors = errors; //reset back to the original state.

    expect(actual).equals(expected);
  });

  it('should set the error object property discountName to false if it passes the regex test', () => {

    const updatedProps = {
      ...props,
      discount: discounts[0]
    };

    const property = 'discountName';
    const value = 'Foobaz';

    const expected = false;
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.discountName;

    expect(actual).equals(expected);
  });

  it('should set the error object property discountName to whitespace if it DOES NOT pass the regex test', () => {

    const updatedProps = {
      ...props,
      discount: discounts[0]
    };

    const property = 'discountName';
    const value = '1234';

    const expected = ' ';
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.discountName;

    expect(actual).equals(expected);
  });

  it('should set the error object property price to false if it passes the regex test', () => {

    const updatedProps = {
      ...props,
      discount: discounts[0]
    };

    const property = 'price';
    const value = 13.55;

    const expected = false;
    const wrapper = shallow(<DiscountDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.price;

    expect(actual).equals(expected);
  });

});
