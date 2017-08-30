import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { TableRowColumn } from 'material-ui/Table';

import sinon from 'sinon';

import React from 'react';
import ModifierTableRow from './ModifierTableRow.jsx';

describe('<ModifierTableRow />', () => {
  const props = {
    modifier: {
      modifierID: 3,
      modifierName: 'test',
      modifierPrice: 30.99,
      items: [],
      lastUpdatedDate: '2017-03-27T17:58:37.11',
      createdDate: '2016-12-12T22:16:55.28',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
    deactivate() {},
    children: [],
  };

  it('should navigate to the modifier detail page when the "Edit" button is clicked', () => {
    const expected = true;

    const redirectSpy = sinon.spy();
    const history = require('../../../utilities/history').default;
    history.push = redirectSpy;

    const wrapper = shallow(<ModifierTableRow {...props} />);

    wrapper.find(FlatButton).simulate('click');

    const actual = redirectSpy.calledWith(
      `/dashboard/modifiers/${props.modifier.modifierID}`,
    );
    expect(actual).toEqual(expected);
  });

  it('should call the deactivate prop function when the "Deactivate" button is clicked', () => {
    const expected = true;
    const deactivateSpy = sinon.spy();
    const updatedProps = {
      ...props,
      deactivate: deactivateSpy,
    };

    const redirectSpy = sinon.spy();
    const history = require('../../../utilities/history').default;
    history.push = redirectSpy;

    const wrapper = shallow(<ModifierTableRow {...updatedProps} />);

    wrapper.find(RaisedButton).simulate('click');

    const actual = deactivateSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should render "None" if the modifier item lenght is 0', () => {
    const expected = 'None';
    const wrapper = shallow(<ModifierTableRow {...props} />);

    const actual = wrapper.find(TableRowColumn).at(2).props().children;

    expect(actual).toEqual(expected);
  });

  it('should render "1 Item" if the length of items is 1', () => {
    const expected = '1 Item';

    const updatedProps = {
      ...props,
      modifier: {
        ...props.modifier,
        items: [38],
      },
    };

    const wrapper = shallow(<ModifierTableRow {...updatedProps} />);

    const actual = wrapper.find(TableRowColumn).at(2).props().children;

    expect(actual).toEqual(expected);
  });

  it('should render "3 Items" if the length of items is 3', () => {
    const expected = '3 Items';
    const updatedProps = {
      ...props,
      modifier: {
        ...props.modifier,
        items: [38, 44, 80],
      },
    };

    const wrapper = shallow(<ModifierTableRow {...updatedProps} />);

    const actual = wrapper.find(TableRowColumn).at(2).props().children;

    expect(actual).toEqual(expected);
  });

  it('should render the price toFixed with 2 decimal places', () => {
    const expected = '$ 30.99';

    const wrapper = shallow(<ModifierTableRow {...props} />);

    const actual = wrapper.find(TableRowColumn).at(1).props().children;

    expect(actual).toEqual(expected);
  });
});
