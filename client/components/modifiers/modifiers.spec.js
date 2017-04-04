/* eslint-disable no-underscore-dangle */
import { shallow } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import sinon from 'sinon';

import React from 'react';
import Modifiers from './index';

import { expect } from 'chai';

describe('<Modifiers />', () => {

  const modifiers = [
    {
      modifierID: 3,
      modifierName: 'test',
      modifierPrice: 30.99,
      items: [
        85
      ],
      lastUpdatedDate: '2017-03-27T17:58:37.11',
      createdDate: '2016-12-12T22:16:55.28',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0
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
      facilityID: 0
    }
  ];

  const props = {
    modifiers,
    query: '',
    filter: '',
    modifierActions() { }
  };

  it('should contain a button component that is titled "New Modifier"', () => {

    const expected = 'New Modifier';
    const wrapper = shallow(<Modifiers.WrappedComponent {...props} />);

    const actual = wrapper.find(RaisedButton).props().label;

    expect(actual).equals(expected);
  });

  it('should navigate to the "modifier" route when navigateToNewModifierPage is called', () => {
    const redirectSpy = sinon.spy();
    Modifiers.__Rewire__('browserHistory', {
      push: redirectSpy
    });

    const expected = true;
    const wrapper = shallow(<Modifiers.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.navigateToNewModifierPage();

    const actual = redirectSpy.calledWith('modifier');

    expect(actual).equals(expected);
    Modifiers.__ResetDependency__('browserHistory');
  });

  it('should dispatch the deactivate action with the passed in id that matches the modifier in the list', () => {

    const deactivatedModifierSpy = sinon.stub().returns({
      then(foobar) { //eslint-disable-line no-unused-vars
        return {
          catch() { }
        };
      }
    });

    deactivatedModifierSpy.then = function () { };

    const updatedProps = {
      ...props,
      modifierActions: {
        deactivateModifier: deactivatedModifierSpy
      }
    };

    const expected = true;
    const wrapper = shallow(<Modifiers.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.deactivate(3);

    const actual = deactivatedModifierSpy.calledWith(modifiers[0]);
    expect(actual).equals(expected);

  });

  it('should filter the list to only include the modifiers from the searchCriteria', () => {

    const searchCriteria = 'T';
    const expected = 1;
    const wrapper = shallow(<Modifiers.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .modifiers.length;

    expect(actual).equals(expected);
  });

  it('should filter the list and match on lowercase as well', () => {

    const searchCriteria = 't';
    const expected = 1;
    const wrapper = shallow(<Modifiers.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .modifiers.length;

    expect(actual).equals(expected);
  });

  it('should set the filter object appropriately on the local state', () => {

    const searchCriteria = 'b';
    const expected = searchCriteria;
    const wrapper = shallow(<Modifiers.WrappedComponent {...props} />);

    const event = {
      target: {
        name: 'filter',
        value: searchCriteria
      }
    };

    const instance = wrapper.instance();
    instance.searchOnChange(event);

    const actual = instance.state
      .filter;

    expect(actual).equals(expected);
  });

});
