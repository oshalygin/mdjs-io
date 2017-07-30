import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import sinon from 'sinon';

import React from 'react';
import ItemTableRow from './ItemTableRow.jsx';

jest.dontMock('react-router');
import { expect } from 'chai';

describe('<ItemTableRow />', () => {
  const props = {
    item: {
      itemID: 85,
      label: 'Apple',
      price: 40.44,
      lastUpdatedDate: '2016-12-12T22:17:12.95',
      disabled: false,
    },
    checked() {},
    deactivate() {},
    children: [],
  };

  it('should navigate to the item detail page when the "Edit" button is clicked', () => {
    const expected = true;

    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const wrapper = shallow(<ItemTableRow {...props} />);

    wrapper.find(FlatButton).simulate('click');

    const actual = redirectSpy.calledWith(`item/${props.item.itemID}`);
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

    const wrapper = shallow(<ItemTableRow {...updatedProps} />);

    wrapper.find(RaisedButton).simulate('click');

    const actual = deactivateSpy.called;
    expect(actual).equals(expected);
  });
});
