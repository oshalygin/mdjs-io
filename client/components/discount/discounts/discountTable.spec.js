import { shallow } from 'enzyme';
import { TableHeaderColumn, TableHeader } from 'material-ui/Table';
import DiscountTableRow from './DiscountTableRow.jsx';

import React from 'react';
import DiscountTable from './DiscountTable.jsx';

describe('<DiscountTable />', () => {
  const props = {
    discounts: [
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
        facilityID: 0,
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
        facilityID: 0,
      },
    ],
    deactivate() {},
    children: [],
  };

  it('should contain (7) Headers that identify the discounts', () => {
    const expected = 7;

    const wrapper = shallow(<DiscountTable {...props} />);
    const actual = wrapper.find(TableHeaderColumn).length;

    expect(actual).toEqual(expected);
  });

  it('should set the displaySelectAll to false on the table to not render the checkboxes', () => {
    const expected = false;

    const wrapper = shallow(<DiscountTable {...props} />);
    const actual = wrapper.find(TableHeader).props().displaySelectAll;

    expect(actual).toEqual(expected);
  });

  it('should render an equivalent number of rows to the number of discounts in props', () => {
    const expected = props.discounts.length;

    const wrapper = shallow(<DiscountTable {...props} />);
    const actual = wrapper.find(DiscountTableRow).length;

    expect(actual).toEqual(expected);
  });
});
