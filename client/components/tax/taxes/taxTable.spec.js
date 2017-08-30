import { shallow } from 'enzyme';
import { TableHeaderColumn, TableHeader } from 'material-ui/Table';
import TaxTableRow from './TaxTableRow.jsx';

import React from 'react';
import TaxTable from './TaxTable.jsx';

describe('<TaxTable />', () => {
  const props = {
    taxes: [
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
    ],
    deactivate() {},
    children: [],
  };

  it('should contain (7) Headers that identify the taxes', () => {
    const expected = 7;

    const wrapper = shallow(<TaxTable {...props} />);
    const actual = wrapper.find(TableHeaderColumn).length;

    expect(actual).toEqual(expected);
  });

  it('should set the displaySelectAll to false on the table to not render the checkboxes', () => {
    const expected = false;

    const wrapper = shallow(<TaxTable {...props} />);
    const actual = wrapper.find(TableHeader).props().displaySelectAll;

    expect(actual).toEqual(expected);
  });

  it('should render an equivalent number of rows to the number of taxes in props', () => {
    const expected = props.taxes.length;

    const wrapper = shallow(<TaxTable {...props} />);
    const actual = wrapper.find(TaxTableRow).length;

    expect(actual).toEqual(expected);
  });
});
