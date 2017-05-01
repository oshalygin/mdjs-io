import { shallow } from 'enzyme';

import React from 'react';
import OrderDetailItemListRow from './OrderDetailItemListRow.jsx';
import ItemImage from '../../common/itemImage';

import { expect } from 'chai';

describe('<OrderDetailItemListRow />', () => {

  const props = {
    item: {
      orderID: 4,
      orderItemID: 11,
      quantity: 1,
      item: {
        itemID: 0,
        itemCategoryID: 0,
        name: 'Custom Item',
        label: '',
        color: 0,
        count: 0,
        addedCount: 0,
        barcode: '',
        photoURL: '',
        price: 65,
        priceTypeID: 0,
        isShowPhoto: false,
        isTrackInventory: true,
        sku: '',
        modifiers: [],
        itemFlags: 0,
        file: null,
        lastUpdatedDate: '0001-01-01T00:00:00',
        createdDate: '0001-01-01T00:00:00',
        lastUpdatedBy: 0,
        createdBy: 0,
        isActive: false,
        companyID: 0,
        facilityID: 0
      },
      totalSub: 65,
      totalDiscount: 0,
      totalTax: 0,
      total: 65,
      orderItemStatusID: 110,
      notes: '',
      modifierList: [],
      taxList: [],
      discountList: []
    }
  };

  it('should contain a <ItemImage /> component', () => {

    const expected = 1;

    const wrapper = shallow(<OrderDetailItemListRow {...props} />);
    const actual = wrapper.find(ItemImage).length;

    expect(actual).equals(expected);

  });

  it('should properly map the price description and the price together', () => {

    const expected = '$ 65.00 / Each';

    const wrapper = shallow(<OrderDetailItemListRow {...props} />);
    const actual = wrapper.find('.item-list-row-name')
      .last()
      .text();

    expect(actual).equals(expected);

  });

  it('should display the total price', () => {

    const expected = '$ 65.00';

    const wrapper = shallow(<OrderDetailItemListRow {...props} />);
    const actual = wrapper.find('.item-price')
      .text();

    expect(actual).equals(expected);

  });

  it('should display the total taxes', () => {

    const expected = '$ 0.00';

    const wrapper = shallow(<OrderDetailItemListRow {...props} />);
    const actual = wrapper.find('.item-list-row-tax-container')
      .text();

    expect(actual).equals(expected);

  });

});
