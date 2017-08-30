import { shallow } from 'enzyme';
import { TableHeaderColumn, TableHeader } from 'material-ui/Table';
import ModifierTableRow from './ModifierTableRow.jsx';

import React from 'react';
import ModifierTable from './ModifierTable.jsx';

describe('<ModifierTable />', () => {
  const props = {
    modifiers: [
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
    ],
    deactivate() {},
    children: [],
  };

  it('should contain (7) Headers that identify the modifier', () => {
    const expected = 7;

    const wrapper = shallow(<ModifierTable {...props} />);
    const actual = wrapper.find(TableHeaderColumn).length;

    expect(actual).toEqual(expected);
  });

  it('should set the displaySelectAll to false on the table to not render the checkboxes', () => {
    const expected = false;

    const wrapper = shallow(<ModifierTable {...props} />);
    const actual = wrapper.find(TableHeader).props().displaySelectAll;

    expect(actual).toEqual(expected);
  });

  it('should render an equivalent number of rows to the number of modifiers in props', () => {
    const expected = props.modifiers.length;

    const wrapper = shallow(<ModifierTable {...props} />);
    const actual = wrapper.find(ModifierTableRow).length;

    expect(actual).toEqual(expected);
  });
});
