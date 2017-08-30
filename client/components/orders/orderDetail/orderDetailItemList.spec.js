import { shallow } from 'enzyme';

import React from 'react';
import OrderDetailItemList from './OrderDetailItemList.jsx';
import OrderDetailItemListRow from './OrderDetailItemListRow.jsx';

describe('<OrderDetailItemList />', () => {
  const props = {
    items: [
      {
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
          facilityID: 0,
        },
        totalSub: 65,
        totalDiscount: 0,
        totalTax: 0,
        total: 65,
        orderItemStatusID: 110,
        notes: '',
        modifierList: [],
        taxList: [],
        discountList: [],
      },
    ],
  };

  it('should a root heading of "Item(s)"', () => {
    const expected = 'Item(s):';

    const wrapper = shallow(<OrderDetailItemList {...props} />);
    const actual = wrapper.find('.item-heading').at(0).text();

    expect(actual).toEqual(expected);
  });

  it('should contain an equal number of <OrderDetailItemListRow /> components to the number of items', () => {
    const expected = props.items.length;

    const wrapper = shallow(<OrderDetailItemList {...props} />);
    const actual = wrapper.find(OrderDetailItemListRow).length;

    expect(actual).toEqual(expected);
  });
});
