import React from 'react';
import { shallow } from 'enzyme';
import CategoryDetail, { mapStateToProps } from './index';
import Spinner from '../common/spinner';
import sinon from 'sinon';

jest.dontMock('react-router');
import { expect } from 'chai';

describe('<CategoryDetail />', () => {
  const errors = {
    categoryName: false,
  };

  const props = {
    category: {
      categoryID: 0,
      categoryName: '',
    },
    categoryHeading: 'New Category',
    loading: {
      createUpdateCategory: false,
    },
    errors,
    categoryActions: {},
  };

  const categories = [
    {
      categoryID: 1,
      categoryName: 'Foo',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-31T01:09:34.3905613-07:00',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00',
    },
    {
      categoryID: 2,
      categoryName: 'Qux',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-31T01:09:34.3905613-07:00',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00',
    },
    {
      categoryID: 3,
      categoryName: 'Bar',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-31T01:09:34.3905613-07:00',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00',
    },
  ];

  it('should render the component with the categoryDetail heading of "New Category"', () => {
    const expected = 'New Category';
    const wrapper = shallow(<CategoryDetail.WrappedComponent {...props} />);

    const actual = wrapper.find('h5').props().children;

    expect(actual).equals(expected);
  });

  it('should return the heading as "New Category" if the passed in props is null', () => {
    const state = {
      categories,
    };
    const ownProps = {
      params: {
        id: null,
      },
    };

    const expected = 'New Category';
    const actual = mapStateToProps(state, ownProps).categoryHeading;

    expect(actual).equals(expected);
  });

  it('should return the heading as "Update Category" if the passed in id prop matches the state categories', () => {
    const state = {
      categories,
    };
    const ownProps = {
      params: {
        id: 1,
      },
    };

    const expected = 'Update Category';
    const actual = mapStateToProps(state, ownProps).categoryHeading;

    expect(actual).equals(expected);
  });

  it('should return the existing category properties if the passed in id prop matches the state categories', () => {
    const state = {
      categories,
    };
    const ownProps = {
      params: {
        id: 1,
      },
    };

    const expected = categories[0];
    const actual = mapStateToProps(state, ownProps).category;

    expect(actual).deep.equals(expected);
  });

  it('should return the an empty category if the passed in id prop is null', () => {
    const state = {
      categories,
    };
    const ownProps = {
      params: {
        id: null,
      },
    };

    const expected = props.category;
    const actual = mapStateToProps(state, ownProps).category;

    expect(actual).deep.equals(expected);
  });

  it('should render a spinner if the "createUpdateCategory" loading flag is set', () => {
    const updatedProps = {
      ...props,
      loading: {
        createUpdateCategory: true,
      },
    };

    const expected = 1;
    const wrapper = shallow(
      <CategoryDetail.WrappedComponent {...updatedProps} />,
    );

    const actual = wrapper.find(Spinner).length;

    expect(actual).equals(expected);
  });

  it('should navigate back to the "categories" page if the back button is clicked', () => {
    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const expected = true;
    const wrapper = shallow(<CategoryDetail.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.redirect();

    const actual = redirectSpy.calledWith('categories');

    expect(actual).equals(expected);
  });

  it('should set the new state of the category based on the form field that was changed', () => {
    const updatedProps = {
      ...props,
      category: categories[0],
    };

    const expected = 'Foobar';

    const event = {
      target: {
        name: 'categoryName',
        value: 'Foobar',
      },
    };

    const index = null;
    const payload = null;

    const wrapper = shallow(
      <CategoryDetail.WrappedComponent {...updatedProps} />,
    );

    const instance = wrapper.instance();
    instance.onChange(event, index, payload);
    const actual = instance.state.category.categoryName;

    expect(actual).deep.equals(expected);
  });

  it('should call "updateCategory" with the category that was passed in to onSave', () => {
    const redirectSpy = sinon.spy();
    const browserHistory = require('react-router').browserHistory;
    browserHistory.push = redirectSpy;

    const triggerCategoryUpdateSpy = sinon.stub().returns({
      then() {
        return {
          catch() {},
        };
      },
    });

    triggerCategoryUpdateSpy.then = function() {};

    const updatedProps = {
      ...props,
      category: categories[0],
      categoryActions: {
        triggerCategoryUpdate: triggerCategoryUpdateSpy,
      },
    };

    const expected = true;
    const wrapper = shallow(
      <CategoryDetail.WrappedComponent {...updatedProps} />,
    );

    const instance = wrapper.instance();
    instance.onSave();

    const actual = triggerCategoryUpdateSpy.calledWith(categories[0]);

    expect(actual).equals(expected);
  });

  it('should return false if the category categoryName is empty when calling formIsValid', () => {
    const updatedProps = {
      ...props,
      category: categories[0],
    };

    const expected = false;
    const wrapper = shallow(
      <CategoryDetail.WrappedComponent {...updatedProps} />,
    );

    const instance = wrapper.instance();
    instance.state.category.categoryName = '';
    const actual = instance.formIsValid();
    instance.state.category.categoryName = 'Foo'; //reset back to the original state.
    expect(actual).equals(expected);
  });

  it('should return false if there are validation errors calling formIsValid', () => {
    const updatedProps = {
      ...props,
      category: categories[0],
    };

    const errorState = {
      ...errors,
      categoryName: true,
    };

    const expected = false;
    const wrapper = shallow(
      <CategoryDetail.WrappedComponent {...updatedProps} />,
    );

    const instance = wrapper.instance();
    instance.state.errors = errorState;
    const actual = instance.formIsValid();
    instance.state.errors = errors; //reset back to the original state.

    expect(actual).equals(expected);
  });

  it('should set the error object property categoryName to false if it passes the regex test', () => {
    const updatedProps = {
      ...props,
      category: categories[0],
    };

    const property = 'categoryName';
    const value = 'Foobaz';

    const expected = false;
    const wrapper = shallow(
      <CategoryDetail.WrappedComponent {...updatedProps} />,
    );

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.categoryName;

    expect(actual).equals(expected);
  });

  it('should set the error object property categoryName to whitespace if it DOES NOT pass the regex test', () => {
    const updatedProps = {
      ...props,
      category: categories[0],
    };

    const property = 'categoryName';
    const value = '1234!?';

    const expected = ' ';
    const wrapper = shallow(
      <CategoryDetail.WrappedComponent {...updatedProps} />,
    );

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.categoryName;

    expect(actual).equals(expected);
  });

  it('should set the error object property price to false if it passes the regex test', () => {
    const updatedProps = {
      ...props,
      category: categories[0],
    };

    const property = 'price';
    const value = 13.55;

    const expected = false;
    const wrapper = shallow(
      <CategoryDetail.WrappedComponent {...updatedProps} />,
    );

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.price;

    expect(actual).equals(expected);
  });
});
