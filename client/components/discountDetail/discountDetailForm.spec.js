import { shallow } from 'enzyme';
import TextField from '../common/TextField.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import React from 'react';
import DiscountDetailForm from './DiscountDetailForm.jsx';

import { expect } from 'chai';

describe('<DiscountDetailForm />', () => {

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
    items,
    errors,
    onChange() { }
  };

  it('should contain two text fields on the form', () => {

    const wrapper = shallow(<DiscountDetailForm {...props} />);

    const expected = 2;
    const actual = wrapper.find(TextField).length;

    expect(actual).equals(expected);

  });


  it('should contain a SelectField dropdown which has an "Apply To" property', () => {

    const wrapper = shallow(<DiscountDetailForm {...props} />);

    const expected = 'Apply To';
    const actual = wrapper.find(SelectField).props()
      .floatingLabelText;

    expect(actual).equals(expected);

  });

  it('the dropdown for "Apply To" has two menu items', () => {

    const wrapper = shallow(<DiscountDetailForm {...props} />);

    const expected = 2;
    const actual = wrapper.find(MenuItem).length;

    expect(actual).equals(expected);

  });

  it('should still render only a single SelectField if the discountOption selected is 0 for applyTypeID', () => {
    const updatedProps = {
      ...props,
      discount: {
        discountID: 0,
        applyTypeID: 0,
        discountName: ''
      }
    };

    const wrapper = shallow(<DiscountDetailForm {...updatedProps} />);

    const expected = 1;
    const actual = wrapper.find(SelectField).length;

    expect(actual).equals(expected);

  });

  it('should render two SelectFields if the discountOption selected is 1 for applyTypeID', () => {
    const updatedProps = {
      ...props,
      discount: {
        discountID: 0,
        applyTypeID: 1,
        discountName: ''
      }
    };

    const wrapper = shallow(<DiscountDetailForm {...updatedProps} />);

    const expected = 2;
    const actual = wrapper.find(SelectField).length;

    expect(actual).equals(expected);

  });

  it('should render the number of matching items as MenuItems to the second SelectFields with applyTypeID of 1', () => {
    const updatedProps = {
      ...props,
      discount: {
        discountID: 0,
        applyTypeID: 1,
        discountName: ''
      }
    };

    const wrapper = shallow(<DiscountDetailForm {...updatedProps} />);

    const expected = 2 + items.length;
    const actual = wrapper.find(MenuItem).length;

    expect(actual).equals(expected);

  });

  it('should contain a material icon "account_balance" that helps identify the page', () => {

    const wrapper = shallow(<DiscountDetailForm {...props} />);

    const expected = 'account_balance';
    const actual = wrapper.find('.material-icons').text();

    expect(actual).equals(expected);

  });

});
