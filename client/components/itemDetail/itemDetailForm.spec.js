/* eslint-disable no-underscore-dangle */
import { shallow } from 'enzyme';
import TextField from '../common/TextField.jsx';
import SelectList from '../common/SelectList.jsx';
import ItemImage from './ItemImage.jsx';

import React from 'react';
import ItemDetailForm from './ItemDetailForm.jsx';

import { expect } from 'chai';

describe('<ItemDetailForm />', () => {
  const errors = {
    name: false,
    label: false,
    price: false
  };
  const props = {
    item: {
      itemID: 0,
      name: '',
      label: '',
      price: 0,
      color: 0,
      photoURL: '',
      file: null,
      itemCategoryID: 0,
      isActive: 1,
      priceTypeID: 0
    },
    errors,
    onChange() { },
    onDrop() { }
  };

  it('should contain three text fields on the form', () => {

    const wrapper = shallow(<ItemDetailForm {...props} />);

    const expected = 3;
    const actual = wrapper.find(TextField).length;


    expect(actual).equals(expected);

  });

  it('should render an ItemImage component', () => {

    const wrapper = shallow(<ItemDetailForm {...props} />);

    const expected = 1;
    const actual = wrapper.find(ItemImage).length;

    expect(actual).equals(expected);

  });

  it('should render a SelectList component', () => {

    const wrapper = shallow(<ItemDetailForm {...props} />);

    const expected = 1;
    const actual = wrapper.find(SelectList).length;

    expect(actual).equals(expected);

  });

  it('should render 4 list items on the SelectListComponent', () => {

    const wrapper = shallow(<ItemDetailForm {...props} />);

    const expected = 4;
    const actual = wrapper.find(SelectList).props().children.length;

    expect(actual).equals(expected);

  });

  it('should set the itemPriceType based on the itemPriceTypeID', () => {

    const wrapper = shallow(<ItemDetailForm {...props} />);

    const expected = { name: 'priceTypeID', label: 'Each', value: 0 };
    const actual = wrapper.find(SelectList).props().value;

    expect(actual).deep.equals(expected);

  });

});
