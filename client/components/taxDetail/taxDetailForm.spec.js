import { shallow } from 'enzyme';
import TextField from '../common/TextField.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import React from 'react';
import TaxDetailForm from './TaxDetailForm.jsx';

import { expect } from 'chai';

describe('<TaxDetailForm />', () => {

  const errors = {
    taxName: false
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
    tax: {
      taxID: 0,
      taxName: ''
    },
    items,
    errors,
    onChange() { }
  };

  it('should contain two text fields on the form', () => {

    const wrapper = shallow(<TaxDetailForm {...props} />);

    const expected = 2;
    const actual = wrapper.find(TextField).length;

    expect(actual).equals(expected);

  });


  it('should contain a SelectField dropdown which has an "Apply To" property', () => {

    const wrapper = shallow(<TaxDetailForm {...props} />);

    const expected = 'Apply To';
    const actual = wrapper.find(SelectField).props()
      .floatingLabelText;

    expect(actual).equals(expected);

  });

  it('the dropdown for "Apply To" has two menu items', () => {

    const wrapper = shallow(<TaxDetailForm {...props} />);

    const expected = 2;
    const actual = wrapper.find(MenuItem).length;
      
    expect(actual).equals(expected);

  });

  it('should still render only a single SelectField if the taxOption selected is 0 for taxTypeID', () => {
    const updatedProps = {
      ...props,
      tax: {
        taxID: 0,
        taxTypeID: 0,
        taxName: ''
      }
    };

    const wrapper = shallow(<TaxDetailForm {...updatedProps} />);

    const expected = 1;
    const actual = wrapper.find(SelectField).length;

    expect(actual).equals(expected);

  });

  it('should render two SelectFields if the taxOption selected is 1 for taxTypeID', () => {
    const updatedProps = {
      ...props,
      tax: {
        taxID: 0,
        taxTypeID: 1,
        taxName: ''
      }
    };

    const wrapper = shallow(<TaxDetailForm {...updatedProps} />);

    const expected = 2;
    const actual = wrapper.find(SelectField).length;

    expect(actual).equals(expected);

  });

  it('should render the number of matching items as MenuItems to the second SelectFields with taxTypeID of 1', () => {
    const updatedProps = {
      ...props,
      tax: {
        taxID: 0,
        taxTypeID: 1,
        taxName: ''
      }
    };

    const wrapper = shallow(<TaxDetailForm {...updatedProps} />);

    const expected = 2 + items.length;
    const actual = wrapper.find(MenuItem).length;

    expect(actual).equals(expected);

  });

  it('should contain a material icon "account_balance" that helps identify the page', () => {
    
    const wrapper = shallow(<TaxDetailForm {...props} />);

    const expected = 'account_balance';
    const actual = wrapper.find('.material-icons').text();

    expect(actual).equals(expected);

  });

});
