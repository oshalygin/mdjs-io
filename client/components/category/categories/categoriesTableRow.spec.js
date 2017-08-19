import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import sinon from 'sinon';

import React from 'react';
import CategoriesTableRow from './CategoriesTableRow.jsx';

import { expect } from 'chai';

describe('<CategoriesTableRow />', () => {
  const props = {
    category: {
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
    checked() {},
    deactivate() {},
    children: [],
  };

  it('should navigate to the category detail page when the "Edit" button is clicked', () => {
    const expected = true;

    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const wrapper = shallow(<CategoriesTableRow {...props} />);

    wrapper.find(FlatButton).simulate('click');

    const actual = redirectSpy.calledWith(
      `category/${props.category.categoryID}`,
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
    const browserHistory = require('../../../utilities/history').push;
    browserHistory.push = redirectSpy;

    const wrapper = shallow(<CategoriesTableRow {...updatedProps} />);

    wrapper.find(RaisedButton).simulate('click');

    const actual = deactivateSpy.called;
    expect(actual).equals(expected);
  });
});
