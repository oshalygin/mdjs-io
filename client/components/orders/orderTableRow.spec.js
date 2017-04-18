/* eslint-disable no-underscore-dangle */
import { shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton';
import { TableRowColumn } from 'material-ui/Table';

import sinon from 'sinon';

import React from 'react';
import OrderTableRow from './OrderTableRow.jsx';

import { expect } from 'chai';

describe('<OrderTableRow />', () => {

  const props = {
    order: {
      orderID: 907,
      total: 9.878,
      createdDate: '2017-04-14T15:54:42',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 8.98,
      totalTax: 0.898,
      totalTip: 0.0
    },
    children: []
  };

  it('should navigate to the modifier detail page when the "View" button is clicked', () => {

    const expected = true;

    const redirectSpy = sinon.spy();
    OrderTableRow.__Rewire__('browserHistory', {
      push: redirectSpy
    });
    const wrapper = shallow(<OrderTableRow {...props} />);

    wrapper.find(FlatButton)
      .simulate('click');

    const actual = redirectSpy.calledWith(`order/${props.order.orderID}`);
    expect(actual).equals(expected);

  });

  
  it('should render the price toFixed with 2 decimal places', () => {

    const expected = '$ 9.88';

    const wrapper = shallow(<OrderTableRow {...props} />);

    const actual = wrapper.find(TableRowColumn).at(2)
      .props().children;

    expect(actual).equals(expected);

  });

});
