import {
  ITEM_DEACTIVATED_SUCCESS,
  LOAD_ITEMS_SUCCESS,
} from '../actions/actionTypes';
import reducer from './itemReducer';

describe('Reducer - Item', () => {
  const getInitialState = () => {
    return [];
  };

  const items = [
    {
      itemID: 1,
      name: 'Foo',
      label: 'Foo',
      price: 30.99,
      color: 5,
      photoURL: 'http//foobar.com/images/foo.jpg',
      file: null,
      itemCategoryID: 2,
      isActive: 1,
      priceTypeID: 1,
    },
    {
      itemID: 2,
      name: 'Baz',
      label: 'Baz',
      price: 10.99,
      color: 3,
      photoURL: 'http//foobar.com/images/baz.jpg',
      file: null,
      itemCategoryID: 2,
      isActive: 1,
      priceTypeID: 1,
    },
    {
      itemID: 3,
      name: 'Quux',
      label: 'Quux',
      price: 10.99,
      color: 2,
      photoURL: 'http//foobar.com/images/quux.jpg',
      file: null,
      itemCategoryID: 2,
      isActive: 1,
      priceTypeID: 1,
    },
  ];

  const resultingItems = [
    {
      itemID: 1,
      name: 'Foo',
      label: 'Foo',
      price: 30.99,
      color: 5,
      photoURL: 'http//foobar.com/images/foo.jpg',
      file: null,
      checked: false,
      disabled: false,
      itemCategoryID: 2,
      isActive: 1,
      priceTypeID: 1,
    },
    {
      itemID: 2,
      name: 'Baz',
      label: 'Baz',
      price: 10.99,
      color: 3,
      photoURL: 'http//foobar.com/images/baz.jpg',
      file: null,
      checked: false,
      disabled: false,
      itemCategoryID: 2,
      isActive: 1,
      priceTypeID: 1,
    },
    {
      itemID: 3,
      name: 'Quux',
      label: 'Quux',
      price: 10.99,
      color: 2,
      photoURL: 'http//foobar.com/images/quux.jpg',
      file: null,
      checked: false,
      disabled: false,
      itemCategoryID: 2,
      isActive: 1,
      priceTypeID: 1,
    },
  ];

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {
    const action = {
      type: 'UNKNOWN',
    };

    const expected = getInitialState();
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).toEqual(expected);
  });

  it('should hydrate the state with all of the items in the action in addition to the additional checked and disabled properties', () => {
    const action = {
      type: LOAD_ITEMS_SUCCESS,
      items,
    };

    const expected = resultingItems;
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).toEqual(expected);
  });

  it('should remove the item that was passed in as part of the ITEM_DEACTIVATED_SUCCESS dispatched action', () => {
    const action = {
      type: ITEM_DEACTIVATED_SUCCESS,
      item: items[0],
    };

    const expected = 2;
    const actual = reducer(items, action).length;

    expect(actual).toEqual(expected);
  });
});
