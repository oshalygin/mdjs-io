import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { TableRowColumn } from 'material-ui/Table';

import sinon from 'sinon';

import React from 'react';
import DiscountTableRow from './DiscountTableRow.jsx';

jest.dontMock('react-router');
import { expect } from 'chai';

describe('<DiscountTableRow />', () => {
  const props = {
    discount: {
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
    deactivate() {},
    children: [],
  };

  it('should navigate to the discount detail page when the "Edit" button is clicked', () => {
    const expected = true;

    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const wrapper = shallow(<DiscountTableRow {...props} />);

    wrapper.find(FlatButton).simulate('click');

    const actual = redirectSpy.calledWith(
      `discount/${props.discount.discountID}`,
    );
    expect(actual).equals(expected);
  });

  it('should call the deactivate prop function when the "Deactivate" button is clicked', () => {
    const expected = true;
    const deactivateSpy = sinon.spy();
    const updatedProps = {
      ...props,
      deactivate: deactivateSpy,
    };

    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const wrapper = shallow(<DiscountTableRow {...updatedProps} />);

    wrapper.find(RaisedButton).simulate('click');

    const actual = deactivateSpy.called;
    expect(actual).equals(expected);
  });

  it('should render "Everything" if the discount applyToID is 0', () => {
    const expected = 'Everything';
    const wrapper = shallow(<DiscountTableRow {...props} />);

    const actual = wrapper.find(TableRowColumn).at(2).props().children;

    expect(actual).equals(expected);
  });

  it('should render "1 Item" if the discount discountID is 1 and the length of items is 1', () => {
    const expected = '1 Item';

    const updatedProps = {
      ...props,
      discount: {
        ...props.discount,
        applyTypeID: 1,
        items: [38],
      },
    };

    const wrapper = shallow(<DiscountTableRow {...updatedProps} />);

    const actual = wrapper.find(TableRowColumn).at(2).props().children;

    expect(actual).equals(expected);
  });

  it('should render "3 Items" if the discount applyTypeID is 1 and the length of items is 3', () => {
    const expected = '3 Items';
    const updatedProps = {
      ...props,
      discount: {
        ...props.discount,
        applyTypeID: 1,
        items: [38, 44, 80],
      },
    };

    const wrapper = shallow(<DiscountTableRow {...updatedProps} />);

    const actual = wrapper.find(TableRowColumn).at(2).props().children;

    expect(actual).equals(expected);
  });

  it('should render the price toFixed with 2 decimal places as a dollar value when the discountTypeID is 1', () => {
    const expected = '$ 50.00';
    const updatedProps = {
      ...props,
      discount: {
        ...props.discount,
        value: 50,
        discountTypeID: 1,
      },
    };

    const wrapper = shallow(<DiscountTableRow {...updatedProps} />);

    const actual = wrapper.find(TableRowColumn).at(1).props().children;

    expect(actual).equals(expected);
  });

  it('should render the value toFixed with 2 decimal places as a percentage value when the discountTypeID is 0', () => {
    const expected = '50.00 %';
    const updatedProps = {
      ...props,
      discount: {
        ...props.discount,
        value: 50,
        discountTypeID: 0,
      },
    };

    const wrapper = shallow(<DiscountTableRow {...updatedProps} />);

    const actual = wrapper.find(TableRowColumn).at(1).props().children;

    expect(actual).equals(expected);
  });
});
