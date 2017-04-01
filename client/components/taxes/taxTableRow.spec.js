/* eslint-disable no-underscore-dangle */
import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { TableRowColumn } from 'material-ui/Table';

import sinon from 'sinon';

import React from 'react';
import TaxTableRow from './TaxTableRow.jsx';

import { expect } from 'chai';

describe('<TaxTableRow />', () => {

  const props = {
    tax: {
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
      facilityID: 0
    },
    deactivate() { },
    children: []
  };

  it('should navigate to the tax detail page when the "Edit" button is clicked', () => {

    const expected = true;

    const redirectSpy = sinon.spy();
    TaxTableRow.__Rewire__('browserHistory', {
      push: redirectSpy
    });
    const wrapper = shallow(<TaxTableRow {...props} />);

    wrapper.find(FlatButton)
      .simulate('click');

    const actual = redirectSpy.calledWith(`tax/${props.tax.taxID}`);
    expect(actual).equals(expected);

  });

  it('should call the deactivate prop function when the "Deactivate" button is clicked', () => {

    const expected = true;
    const deactivateSpy = sinon.spy();
    const updatedProps = {
      ...props,
      deactivate: deactivateSpy
    };

    const redirectSpy = sinon.spy();
    TaxTableRow.__Rewire__('browserHistory', {
      push: redirectSpy
    });

    const wrapper = shallow(<TaxTableRow {...updatedProps} />);

    wrapper.find(RaisedButton)
      .simulate('click');

    const actual = deactivateSpy.called;
    expect(actual).equals(expected);

  });

  it('should render "Everything" if the tax typeID is 0', () => {

    const expected = 'Everything';
    const wrapper = shallow(<TaxTableRow {...props} />);

    const actual = wrapper.find(TableRowColumn).at(2)
      .props().children;
    
    expect(actual).equals(expected);

  });

  it('should render "1 Item" if the tax typeID is 1 and the length of items is 1', () => {

    const expected = '1 Item';

    const updatedProps = {
      ...props,
      tax: {
        ...props.tax,
        taxTypeID: 1,
        items: [38]
      }
    };

    const wrapper = shallow(<TaxTableRow {...updatedProps} />);

    const actual = wrapper.find(TableRowColumn).at(2)
      .props().children;

    expect(actual).equals(expected);

  });

  it('should render "3 Items" if the tax typeID is 1 and the length of items is 3', () => {

    const expected = '3 Items';

    const updatedProps = {
      ...props,
      tax: {
        ...props.tax,
        taxTypeID: 1,
        items: [38, 44, 80]
      }
    };

    const wrapper = shallow(<TaxTableRow {...updatedProps} />);

    const actual = wrapper.find(TableRowColumn).at(2)
      .props().children;

    expect(actual).equals(expected);

  });

});
