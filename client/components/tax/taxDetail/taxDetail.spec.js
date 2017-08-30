import React from 'react';
import { shallow } from 'enzyme';
import TaxDetail, { mapStateToProps } from './index';
import Spinner from '../../common/spinner';
import sinon from 'sinon';

describe('<TaxDetail />', () => {
  const errors = {
    taxName: false,
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
    tax: {
      taxID: 0,
      taxName: '',
    },
    taxHeading: 'New Tax',
    loading: {
      createUpdateTax: false,
    },
    errors,
    items,
    taxActions: {},
  };

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
      facilityID: 0,
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
      facilityID: 0,
    },
  ];

  it('should render the component with the taxDetail heading of "New Tax"', () => {
    const expected = 'New Tax';
    const wrapper = shallow(<TaxDetail.WrappedComponent {...props} />);

    const actual = wrapper.find('h5').props().children;

    expect(actual).toEqual(expected);
  });

  it('should return the heading as "New Tax" if the passed in props is null', () => {
    const state = {
      taxes,
    };
    const ownProps = {
      match: {
        params: {
          id: null,
        },
      },
    };

    const expected = 'New Tax';
    const actual = mapStateToProps(state, ownProps).taxHeading;

    expect(actual).toEqual(expected);
  });

  it('should return the heading as "Update Tax" if the passed in id prop matches the state categories', () => {
    const state = {
      taxes,
    };
    const ownProps = {
      match: {
        params: {
          id: 19,
        },
      },
    };

    const expected = 'Update Tax';
    const actual = mapStateToProps(state, ownProps).taxHeading;

    expect(actual).toEqual(expected);
  });

  it('should return the existing tax properties if the passed in id prop matches the state taxes', () => {
    const state = {
      taxes,
    };
    const ownProps = {
      match: {
        params: {
          id: 19,
        },
      },
    };

    const expected = taxes[0];
    const actual = mapStateToProps(state, ownProps).tax;

    expect(actual).toEqual(expected);
  });

  it('should return the an empty tax if the passed in id prop is null', () => {
    const state = {
      taxes,
    };
    const ownProps = {
      match: {
        params: {
          id: null,
        },
      },
    };

    const expected = props.category;
    const actual = mapStateToProps(state, ownProps).category;

    expect(actual).toEqual(expected);
  });

  it('should render a spinner if the "createUpdateTax" loading flag is set', () => {
    const updatedProps = {
      ...props,
      loading: {
        createUpdateTax: true,
      },
    };

    const expected = 1;
    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const actual = wrapper.find(Spinner).length;

    expect(actual).toEqual(expected);
  });

  it('should navigate back to the "taxes" page if the back button is clicked', () => {
    const redirectSpy = sinon.spy();
    const history = require('../../../utilities/history').default;
    history.push = redirectSpy;

    const expected = true;
    const wrapper = shallow(<TaxDetail.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.redirect();

    const actual = redirectSpy.calledWith('/dashboard/taxes');

    expect(actual).toEqual(expected);
  });

  it('should set the new state of the tax based on the form field that was changed', () => {
    const updatedProps = {
      ...props,
      tax: taxes[0],
    };

    const expected = 'Foobar';

    const event = {
      target: {
        name: 'taxName',
        value: 'Foobar',
      },
    };

    const index = null;
    const payload = null;

    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onChange(event, index, payload);
    const actual = instance.state.tax.taxName;

    expect(actual).toEqual(expected);
  });

  it('should set the items property to the payload array if its an array', () => {
    const updatedProps = {
      ...props,
      tax: taxes[0],
    };

    const event = {};

    const index = null;
    const payload = [1, 3, 79];
    const expected = payload;

    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onChange(event, index, payload);
    const actual = instance.state.tax.items;

    expect(actual).toEqual(expected);
  });

  it('should set the items property to the payload property value if it is passed in', () => {
    const updatedProps = {
      ...props,
      tax: taxes[0],
    };

    const event = {};

    const index = null;
    const payload = {
      name: 'taxTypeID',
      value: 0,
    };

    const expected = 0;

    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onChange(event, index, payload);
    const actual = instance.state.tax.taxTypeID;

    expect(actual).toEqual(expected);
  });

  it('should set the notifications to false if closeNotification is called', () => {
    const expected = false;

    const wrapper = shallow(<TaxDetail.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.setState({ notification: true });

    instance.closeNotification();
    const actual = instance.state.notification;

    expect(actual).toEqual(expected);
  });

  it('should call "updateTax" with the category that was passed in to onSave', () => {
    const redirectSpy = sinon.spy();
    const history = require('../../../utilities/history').default;
    history.push = redirectSpy;

    const createTaxSpy = sinon.stub().returns({
      then() {
        return {
          catch() {},
        };
      },
    });

    createTaxSpy.then = function() {};

    const updatedProps = {
      ...props,
      tax: taxes[0],
      taxActions: {
        updateTax: createTaxSpy,
      },
    };

    const expected = true;
    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onSave();

    const actual = createTaxSpy.calledWith(taxes[0]);

    expect(actual).toEqual(expected);
  });

  it('should return false if the tax taxName is empty when calling formIsValid', () => {
    const updatedProps = {
      ...props,
      tax: taxes[0],
    };

    const expected = false;
    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.tax.taxName = '';
    const actual = instance.formIsValid();
    instance.state.tax.taxName = 'Foo'; //reset back to the original state.
    expect(actual).toEqual(expected);
  });

  it('should return false from formIsValid if the taxTypeID value is not set', () => {
    const updatedProps = {
      ...props,
      tax: {
        taxName: 'Foobar',
        value: 30,
      },
    };

    const expected = false;
    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.tax.taxName = 'Foobar';
    const actual = instance.formIsValid();
    expect(actual).toEqual(expected);
  });

  it('should return false from formIsValid if the taxTypeID is greater than 0 and the items array is empty', () => {
    const updatedProps = {
      ...props,
      tax: {
        taxName: 'Foobar',
        value: 30,
        taxTypeID: 1,
        items: [],
      },
    };

    const expected = false;
    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.tax.taxName = 'Foobar';
    const actual = instance.formIsValid();
    expect(actual).toEqual(expected);
  });

  it('should return false if there are validation errors calling formIsValid', () => {
    const updatedProps = {
      ...props,
      tax: taxes[0],
    };

    const errorState = {
      ...errors,
      taxName: true,
    };

    const expected = false;
    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.errors = errorState;
    const actual = instance.formIsValid();
    instance.state.errors = errors; //reset back to the original state.

    expect(actual).toEqual(expected);
  });

  it('should set the error object property taxName to false if it passes the regex test', () => {
    const updatedProps = {
      ...props,
      tax: taxes[0],
    };

    const property = 'taxName';
    const value = 'Foobaz';

    const expected = false;
    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.taxName;

    expect(actual).toEqual(expected);
  });

  it('should set the error object property taxName to whitespace if it DOES NOT pass the regex test', () => {
    const updatedProps = {
      ...props,
      tax: taxes[0],
    };

    const property = 'taxName';
    const value = '1234';

    const expected = ' ';
    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.taxName;

    expect(actual).toEqual(expected);
  });

  it('should set the error object property price to false if it passes the regex test', () => {
    const updatedProps = {
      ...props,
      tax: taxes[0],
    };

    const property = 'price';
    const value = 13.55;

    const expected = false;
    const wrapper = shallow(<TaxDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.price;

    expect(actual).toEqual(expected);
  });
});
