import { expect } from 'chai';
import {
  CATEGORY_DEACTIVATED_SUCCESS,
  LOAD_CATEGORIES_SUCCESS,
} from '../actions/actionTypes';
import reducer from './categoryReducer';

describe('Reducer - Category', () => {
  const getInitialState = () => {
    return [];
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

  const resultingCategories = [
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

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {
    const action = {
      type: 'UNKNOWN',
    };

    const expected = getInitialState();
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).to.deep.equal(expected);
  });

  it('should hydrate the state with all of the categories in the action in addition to the additional checked and disabled properties', () => {
    const action = {
      type: LOAD_CATEGORIES_SUCCESS,
      categories,
    };

    const expected = resultingCategories;
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).deep.equals(expected);
  });

  it('should remove the category that was passed in as part of the CATEGORY_DEACTIVATED_SUCCESS dispatched action', () => {
    const action = {
      type: CATEGORY_DEACTIVATED_SUCCESS,
      category: categories[0],
    };

    const expected = 2;
    const actual = reducer(categories, action).length;

    expect(actual).equals(expected);
  });
});
