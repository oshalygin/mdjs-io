import React from 'react';
import { shallow } from 'enzyme';
import ModifierDetail, { mapStateToProps } from './index';
import Spinner from '../common/spinner';
import sinon from 'sinon';

jest.dontMock('react-router');
import { expect } from 'chai';

describe('<ModifierDetail />', () => {

  const errors = {
    modifierName: false
  };

  const props = {
    modifier: {
      modifierID: 0,
      modifierName: '',
      modifierPrice: ''
    },
    modifierHeading: 'New Modifier',
    loading: {
      createUpdateModifier: false
    },
    errors,
    modifierActions: {}
  };

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

  it('should render the component with the ModifierDetail heading of "New Modifier"', () => {

    const expected = 'New Modifier';
    const wrapper = shallow(<ModifierDetail.WrappedComponent {...props} />);

    const actual = wrapper.find('h5')
      .props().children;

    expect(actual).equals(expected);
  });

  it('should return the heading as "New Modifier" if the passed in props is null', () => {

    const state = {
      modifiers
    };
    const ownProps = {
      params: {
        id: null
      }
    };

    const expected = 'New Modifier';
    const actual = mapStateToProps(state, ownProps)
      .modifierHeading;

    expect(actual).equals(expected);

  });

  it('should return the heading as "Update Modifier" if the passed in id prop matches the state modifiers', () => {

    const state = {
      modifiers
    };
    const ownProps = {
      params: {
        id: 3
      }
    };

    const expected = 'Update Modifier';
    const actual = mapStateToProps(state, ownProps)
      .modifierHeading;

    expect(actual).equals(expected);

  });

  it('should return the existing modifier properties if the passed in id prop matches the state modifiers', () => {

    const state = {
      modifiers
    };
    const ownProps = {
      params: {
        id: 3
      }
    };

    const expected = modifiers[0];
    const actual = mapStateToProps(state, ownProps)
      .modifier;

    expect(actual).deep.equals(expected);
  });

  it('should return the an empty modifier if the passed in id prop is null', () => {

    const state = {
      modifiers
    };

    const ownProps = {
      params: {
        id: null
      }
    };

    const expected = props.modifier;
    const actual = mapStateToProps(state, ownProps)
      .modifier;

    expect(actual).deep.equals(expected);
  });

  it('should render a spinner if the "createUpdateModifier" loading flag is set', () => {

    const updatedProps = {
      ...props,
      loading: {
        createUpdateModifier: true
      }
    };

    const expected = 1;
    const wrapper = shallow(<ModifierDetail.WrappedComponent {...updatedProps} />);

    const actual = wrapper.find(Spinner)
      .length;

    expect(actual).equals(expected);
  });

  it('should navigate back to the "modifiers" page if the back button is clicked', () => {

    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const expected = true;
    const wrapper = shallow(<ModifierDetail.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.redirect();

    const actual = redirectSpy.calledWith('modifiers');


    expect(actual).equals(expected);
  });

  it('should set the new state of the modifier based on the form field that was changed', () => {

    const updatedProps = {
      ...props,
      modifier: modifiers[0]
    };

    const expected = 'Foobar';

    const event = {
      target: {
        name: 'modifierName',
        value: 'Foobar'
      }
    };

    const index = null;
    const payload = null;

    const wrapper = shallow(<ModifierDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onChange(event, index, payload);
    const actual = instance.state
      .modifier
      .modifierName;

    expect(actual).deep.equals(expected);
  });

  it('should call "updateModifier" with the modifer that was passed in to onSave', () => {
    
    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const createModifierSpy = sinon.stub().returns({
      then(foobar) { //eslint-disable-line no-unused-vars
        return {
          catch() { }
        };
      }
    });

    createModifierSpy.then = function () { };

    const updatedProps = {
      ...props,
      modifier: modifiers[0],
      modifierActions: {
        updateModifier: createModifierSpy
      }
    };

    const expected = true;
    const wrapper = shallow(<ModifierDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onSave();

    const actual = createModifierSpy.calledWith(modifiers[0]);

    expect(actual).equals(expected);
  });

  it('should return false if the modifierName is empty when calling formIsValid', () => {

    const updatedProps = {
      ...props,
      modifier: modifiers[0]
    };

    const expected = false;
    const wrapper = shallow(<ModifierDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.modifier.modifierName = '';
    const actual = instance.formIsValid();
    instance.state.modifier.modifierName = 'Foo'; //reset back to the original state.
    expect(actual).equals(expected);
  });

  it('should return false if there are validation errors calling formIsValid', () => {

    const updatedProps = {
      ...props,
      modifier: modifiers[0]
    };

    const errorState = {
      ...errors,
      modifierName: true
    };

    const expected = false;
    const wrapper = shallow(<ModifierDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.errors = errorState;
    const actual = instance.formIsValid();
    instance.state.errors = errors; //reset back to the original state.

    expect(actual).equals(expected);
  });

  it('should set the error object property modifierName to false if it passes the regex test', () => {

    const updatedProps = {
      ...props,
      modifier: modifiers[0]
    };

    const property = 'modifierName';
    const value = 'Foobaz';

    const expected = false;
    const wrapper = shallow(<ModifierDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.modifierName;

    expect(actual).equals(expected);
  });

  it('should set the error object property modifierName to whitespace if it DOES NOT pass the regex test', () => {

    const updatedProps = {
      ...props,
      modifier: modifiers[0]
    };

    const property = 'modifierName';
    const value = '1234?!';

    const expected = ' ';
    const wrapper = shallow(<ModifierDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.modifierName;

    expect(actual).equals(expected);
  });

  it('should set the error object property price to false if it passes the regex test', () => {

    const updatedProps = {
      ...props,
      modifier: modifiers[0]
    };

    const property = 'price';
    const value = 13.55;

    const expected = false;
    const wrapper = shallow(<ModifierDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.price;

    expect(actual).equals(expected);
  });
});
