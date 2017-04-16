import { shallow } from 'enzyme';
import TextField from '../common/TextField.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import React from 'react';
import DiscountDetailForm from './DiscountDetailForm.jsx';
import DiscountValueField from './DiscountValueField.jsx';

import { expect } from 'chai';

describe('<DiscountDetailForm />', () => {

  const errors = {
    discountName: false,
    value: false
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
      discountName: '',
      discountTypeID: 0,
      value: 0
    },
    items,
    errors,
    onChange() { }
  };

  it('should contain one text fields on the form', () => {

    const wrapper = shallow(<DiscountDetailForm {...props} />);

    const expected = 1;
    const actual = wrapper.find(TextField).length;

    expect(actual).equals(expected);

  });

  it('should contain one <DiscountValueField /> on the form', () => {

    const wrapper = shallow(<DiscountDetailForm {...props} />);

    const expected = 1;
    const actual = wrapper.find(DiscountValueField).length;

    expect(actual).equals(expected);

  });


  it('should contain a SelectField dropdown which has an "Apply To" property', () => {

    const wrapper = shallow(<DiscountDetailForm {...props} />);

    const expected = 1;
    const actual = wrapper
      .find(SelectField)
      .nodes
      .filter(node => node.props.floatingLabelText === 'Apply To')
      .length;

    expect(actual).equals(expected);

  });

  it('should contain a SelectField dropdown which has an "Value Type" property', () => {

    const wrapper = shallow(<DiscountDetailForm {...props} />);

    const expected = 1;
    const actual = wrapper
      .find(SelectField)
      .nodes
      .filter(node => node.props.floatingLabelText === 'Value Type')
      .length;

    expect(actual).equals(expected);

  });

  it('should still render only a two SelectField controls if the discountOption selected is 0 for applyTypeID', () => {
    const updatedProps = {
      ...props,
      discount: {
        discountID: 0,
        applyTypeID: 0,
        discountName: '',
        discountTypeID: 0,
        value: 0
      }
    };

    const wrapper = shallow(<DiscountDetailForm {...updatedProps} />);

    const expected = 2;
    const actual = wrapper.find(SelectField).length;

    expect(actual).equals(expected);

  });

  it('should render three SelectFields if the discountOption selected is 1 for applyTypeID', () => {
    const updatedProps = {
      ...props,
      discount: {
        discountID: 0,
        applyTypeID: 1,
        discountName: '',
        discountTypeID: 0,
        value: 0
      }
    };

    const wrapper = shallow(<DiscountDetailForm {...updatedProps} />);

    const expected = 3;
    const actual = wrapper.find(SelectField).length;

    expect(actual).equals(expected);

  });

  it('should render the number of matching items as MenuItems to the second SelectFields with applyTypeID of 1', () => {
    const updatedProps = {
      ...props,
      discount: {
        discountID: 0,
        applyTypeID: 1,
        discountName: '',
        discountTypeID: 0,
        value: 0
      }
    };

    const wrapper = shallow(<DiscountDetailForm {...updatedProps} />);

    const expected = 4 + items.length;
    const actual = wrapper.find(MenuItem).length;

    expect(actual).equals(expected);

  });

  it('should contain a material icon "play_for_work" that helps identify the page', () => {

    const wrapper = shallow(<DiscountDetailForm {...props} />);

    const expected = 'play_for_work';
    const actual = wrapper.find('.material-icons').text();

    expect(actual).equals(expected);

  });

});
