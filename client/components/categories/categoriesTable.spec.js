import { shallow } from 'enzyme';
import { TableHeaderColumn, TableHeader } from 'material-ui/Table';
import CategoriesTableRow from './CategoriesTableRow.jsx';

import React from 'react';
import CategoriesTable from './CategoriesTable.jsx';

import { expect } from 'chai';

describe('<TaxTable />', () => {
  const props = {
    categories: [
      {
        categoryID: 37,
        categoryName: 'foo',
        companyID: 1,
        createdBy: 1,
        createdDate: '2017-03-27T17:54:03.22',
        facilityID: 0,
        isActive: true,
        items: [],
        lastUpdatedBy: 1,
        lastUpdatedDate: '2017-03-27T17:54:03.22',
      },
      {
        categoryID: 40,
        categoryName: 'bar',
        companyID: 1,
        createdBy: 1,
        createdDate: '2017-03-27T17:54:03.22',
        facilityID: 0,
        isActive: true,
        items: [],
        lastUpdatedBy: 1,
        lastUpdatedDate: '2017-03-27T17:54:03.22',
      },
    ],
    deactivate() {},
    children: [],
  };

  it('should contain (5) Headers that identify the categories', () => {
    const expected = 5;

    const wrapper = shallow(<CategoriesTable {...props} />);
    const actual = wrapper.find(TableHeaderColumn).length;

    expect(actual).equals(expected);
  });

  it('should set the displaySelectAll to false on the table to not render the checkboxes', () => {
    const expected = false;

    const wrapper = shallow(<CategoriesTable {...props} />);
    const actual = wrapper.find(TableHeader).props().displaySelectAll;

    expect(actual).equals(expected);
  });

  it('should render an equivalent number of rows to the number of categories in props', () => {
    const expected = props.categories.length;

    const wrapper = shallow(<CategoriesTable {...props} />);
    const actual = wrapper.find(CategoriesTableRow).length;

    expect(actual).equals(expected);
  });
});
