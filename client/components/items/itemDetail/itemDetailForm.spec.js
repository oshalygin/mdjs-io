import { shallow } from 'enzyme';
import TextField from '../../common/TextField.jsx';
import SelectList from '../../common/SelectList.jsx';
import ItemImage from './ItemImage.jsx';

import React from 'react';
import ItemDetailForm, { getModifierLabel } from './ItemDetailForm.jsx';

import { expect } from 'chai';

describe('<ItemDetailForm />', () => {
  const errors = {
    name: false,
    label: false,
    price: false,
  };

  const categories = [
    {
      categoryID: 1,
      categoryName: 'Foo',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-31T01:09:34.3905613-07:00',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00',
    },
    {
      categoryID: 2,
      categoryName: 'Qux',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-31T01:09:34.3905613-07:00',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00',
    },
    {
      categoryID: 3,
      categoryName: 'Bar',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-31T01:09:34.3905613-07:00',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00',
    },
  ];

  const modifiers = [
    {
      modifierID: 3,
      modifierName: 'test',
      modifierPrice: 30.99,
      items: [85],
      lastUpdatedDate: '2017-03-27T17:58:37.11',
      createdDate: '2016-12-12T22:16:55.28',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
    {
      modifierID: 12,
      modifierName: 'Foobar',
      modifierPrice: 79,
      items: [],
      lastUpdatedDate: '2017-04-01T00:43:08.577',
      createdDate: '2017-04-01T00:43:08.577',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
  ];

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
      priceTypeID: 0,
    },
    categories,
    modifiers,
    errors,
    onChange() {},
    onDrop() {},
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

  it('should render three SelectList components', () => {
    const wrapper = shallow(<ItemDetailForm {...props} />);

    const expected = 3;
    const actual = wrapper.find(SelectList).length;

    expect(actual).equals(expected);
  });

  it('should render 4 list items on the SelectListComponent for priceType', () => {
    const wrapper = shallow(<ItemDetailForm {...props} />);

    const expected = 4;
    const actual = wrapper.find(SelectList).at(0).props().children.length;

    expect(actual).equals(expected);
  });

  it('should render 3 list items on the SelectListComponent for category', () => {
    const wrapper = shallow(<ItemDetailForm {...props} />);

    const expected = 3;
    const actual = wrapper.find(SelectList).at(1).props().children.length;

    expect(actual).equals(expected);
  });

  it('should set the itemPriceType based on the itemPriceTypeID', () => {
    const wrapper = shallow(<ItemDetailForm {...props} />);

    const expected = { name: 'priceTypeID', label: 'Each', value: 0 };
    const actual = wrapper.find(SelectList).at(0).props().value;

    expect(actual).deep.equals(expected);
  });

  it('should contain an "Additional Configuration" heading', () => {
    const wrapper = shallow(<ItemDetailForm {...props} />);

    const expected = 'Additional Configuration';
    const actual = wrapper.find('.additional-items-heading').text();

    expect(actual).equals(expected);
  });

  it('should set the modifier label to include the label name and the price in dollars', () => {
    const modifier = modifiers[0];

    const expected = 'test - $30.99';
    const actual = getModifierLabel(modifier);

    expect(actual).equals(expected);
  });

  it('should set the modifier price to two decimal places', () => {
    const modifier = modifiers[1];

    const expected = 'Foobar - $79.00';
    const actual = getModifierLabel(modifier);

    expect(actual).equals(expected);
  });
});
