import React from 'react';
import { shallow } from 'enzyme';
import ItemDetail, { setDefaultLabel, mapStateToProps } from './index';

import Spinner from '../../common/spinner';
import sinon from 'sinon';

jest.dontMock('react-router');
import { expect } from 'chai';

describe('<ItemDetail />', () => {
  const errors = {
    name: false,
    label: false,
    price: false,
  };

  const props = {
    item: {
      itemID: 0,
      name: '',
      label: '',
      price: '',
      color: 0,
      photoURL: '',
      file: null,
      itemCategoryID: 0,
      isActive: 1,
      priceTypeID: 0,
    },
    categories: [],
    itemHeading: 'New Item',
    loading: {
      createUpdateItem: false,
    },
    errors,
    itemActions: {},
  };

  const items = [
    {
      itemID: 1,
      name: 'Foo',
      label: '',
      price: '30.99',
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

  it('should render the component with the itemDetail heading of "New Item"', () => {
    const expected = 'New Item';
    const wrapper = shallow(<ItemDetail.WrappedComponent {...props} />);

    const actual = wrapper.find('h5').props().children;

    expect(actual).equals(expected);
  });

  it('should return the heading as "New Item" if the passed in props is null', () => {
    const state = {
      items,
    };
    const ownProps = {
      match: {
        params: {
          id: null,
        },
      },
    };

    const expected = 'New Item';
    const actual = mapStateToProps(state, ownProps).itemHeading;

    expect(actual).equals(expected);
  });

  it('should return the heading as "Update Item" if the passed in id prop matches the state items', () => {
    const state = {
      items,
    };
    const ownProps = {
      match: {
        params: {
          id: 1,
        },
      },
    };

    const expected = 'Update Item';
    const actual = mapStateToProps(state, ownProps).itemHeading;

    expect(actual).equals(expected);
  });

  it('should return the existing item properties if the passed in id prop matches the state items', () => {
    const state = {
      items,
    };
    const ownProps = {
      match: {
        params: {
          id: 1,
        },
      },
    };

    const expected = items[0];
    const actual = mapStateToProps(state, ownProps).item;

    expect(actual).deep.equals(expected);
  });

  it('should return the an empty item if the passed in id prop is null', () => {
    const state = {
      items,
    };
    const ownProps = {
      match: {
        params: {
          id: null,
        },
      },
    };

    const expected = props.item;
    const actual = mapStateToProps(state, ownProps).item;

    expect(actual).deep.equals(expected);
  });

  it('should return the categories from state when mapping', () => {
    const state = {
      items,
      categories,
    };
    const ownProps = {
      match: {
        params: {
          id: null,
        },
      },
    };

    const expected = categories;
    const actual = mapStateToProps(state, ownProps).categories;

    expect(actual).deep.equals(expected);
  });

  it('should render a spinner if the "createUpdateItem" loading flag is set', () => {
    const updatedProps = {
      ...props,
      loading: {
        createUpdateItem: true,
      },
    };

    const expected = 1;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const actual = wrapper.find(Spinner).length;

    expect(actual).equals(expected);
  });

  it('should navigate back to the "items" page if the back button is clicked', () => {
    const redirectSpy = sinon.spy();
    const history = require('../../../utilities/history').default;
    history.push = redirectSpy;

    const expected = true;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.redirect();

    const actual = redirectSpy.calledWith('/dashboard/items');

    expect(actual).equals(expected);
  });

  it('should set the item state to include the file property onDrop', () => {
    const files = [
      {
        name: 'filename.jpg',
        preview: 'http://www.foobar.com/filename.jpg',
      },
    ];

    const expected = files[0];
    const wrapper = shallow(<ItemDetail.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.onDrop(files);
    const actual = instance.state.item.file;

    expect(actual).deep.equals(expected);
  });

  it('should set the item state to include the photoURL property onDrop from the files object', () => {
    const files = [
      {
        name: 'filename.jpg',
        preview: 'http://www.foobar.com/filename.jpg',
      },
    ];

    const expected = files[0].preview;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...props} />);

    const instance = wrapper.instance();
    instance.onDrop(files);
    const actual = instance.state.item.photoURL;

    expect(actual).equals(expected);
  });

  it('should set the new state of the item based on the form field that was changed', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const expected = 'Foobar';

    const event = {
      target: {
        name: 'name',
        value: 'Foobar',
      },
    };

    const index = null;
    const payload = null;

    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onChange(event, index, payload);
    const actual = instance.state.item.name;

    expect(actual).deep.equals(expected);
  });

  it('should set the item based on the payload if it was passed in', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const expected = 3;

    const event = {
      target: {
        name: 'name',
        value: 'Foobar',
      },
    };

    const index = null;
    const payload = {
      name: 'itemPriceTypeID',
      value: 3,
    };

    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onChange(event, index, payload);
    const actual = instance.state.item.itemPriceTypeID;

    expect(actual).deep.equals(expected);
  });

  it('should call "updateItem" with the item that was passed in to onSave along but with updated price and label', () => {
    const redirectSpy = sinon.spy();
    const history = require('../../../utilities/history').default;
    history.push = redirectSpy;

    const createItemSpy = sinon.stub().returns({
      then() {
        return {
          catch() {},
        };
      },
    });

    createItemSpy.then = function() {};

    const updatedProps = {
      ...props,
      item: items[0],
      itemActions: {
        updateItem: createItemSpy,
      },
    };

    const expected = true;
    const updatedItem = {
      ...items[0],
      price: Number(items[0].price),
      label: 'Fo',
      isShowPhoto: true,
    };
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onSave();

    const actual = createItemSpy.calledWith(updatedItem);

    expect(actual).equals(expected);
  });

  it('should call "updateItem" with the item that was passed in to onSave along but with the label that was passed in', () => {
    const redirectSpy = sinon.spy();
    const history = require('../../../utilities/history').default;
    history.push = redirectSpy;

    const createItemSpy = sinon.stub().returns({
      then() {
        return {
          catch() {},
        };
      },
    });

    createItemSpy.then = function() {};

    const updatedProps = {
      ...props,
      item: items[1],
      itemActions: {
        updateItem: createItemSpy,
      },
    };

    const expected = true;
    const updatedItem = {
      ...items[1],
      price: Number(items[1].price),
      isShowPhoto: true,
    };
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.onSave();

    const actual = createItemSpy.calledWith(updatedItem);

    expect(actual).equals(expected);
  });

  it('should return false if the item name is empty when calling formIsValid', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const expected = false;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.item.name = '';
    const actual = instance.formIsValid();
    instance.state.item.name = 'Foo'; //reset back to the original state.
    expect(actual).equals(expected);
  });

  it('should return false if the item price is empty when calling formIsValid', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const expected = false;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.item.price = 0;
    const actual = instance.formIsValid();
    instance.state.item.price = 30.99; //reset back to the original state.
    expect(actual).equals(expected);
  });

  it('should return true if the item name and price are set when calling formIsValid', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const expected = true;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    const actual = instance.formIsValid();

    expect(actual).equals(expected);
  });

  it('should return false if there are validation errors calling formIsValid', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const errorState = {
      ...errors,
      name: true,
    };

    const expected = false;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.state.errors = errorState;
    const actual = instance.formIsValid();
    instance.state.errors = errors; //reset back to the original state.

    expect(actual).equals(expected);
  });

  it('should set the error object property name to false if it passes the regex test', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const property = 'name';
    const value = 'Foobaz';

    const expected = false;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.name;

    expect(actual).equals(expected);
  });

  it('should set the error object property name to whitespace if it DOES NOT pass the regex test', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const property = 'name';
    const value = '1234?!';

    const expected = ' ';
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.name;

    expect(actual).equals(expected);
  });

  it('should set the error object property label to false if it passes the regex test', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const property = 'label';
    const value = 'Foobaz';

    const expected = false;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.label;

    expect(actual).equals(expected);
  });

  it('should set the error object property price to whitespace if it DOES NOT pass the regex test', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const property = 'price';
    const value = 'foo';

    const expected = ' ';
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.price;

    expect(actual).equals(expected);
  });

  it('should set the error object property price to false if it passes the regex test', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const property = 'price';
    const value = 13.55;

    const expected = false;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.price;

    expect(actual).equals(expected);
  });

  it('should set the error object property price to false if it passes the regex test with a number', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const property = 'price';
    const value = 150;

    const expected = false;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.price;

    expect(actual).equals(expected);
  });

  it('should set the error object property price to false if it passes the regex test with a number represented as a string', () => {
    const updatedProps = {
      ...props,
      item: items[0],
    };

    const property = 'price';
    const value = '130';

    const expected = false;
    const wrapper = shallow(<ItemDetail.WrappedComponent {...updatedProps} />);

    const instance = wrapper.instance();
    instance.propertyIsValid(property, value, errors);
    const actual = instance.state.errors.price;

    expect(actual).equals(expected);
  });

  it('should set the default item label to "Ap" if the item name is "Apple"', () => {
    const expected = 'Ap';
    const itemName = 'Apple';
    const actual = setDefaultLabel(itemName);

    expect(actual).equals(expected);
  });

  it('should set the default item label to "A" if the item name is "A"', () => {
    const expected = 'A';
    const itemName = 'A';
    const actual = setDefaultLabel(itemName);

    expect(actual).equals(expected);
  });

  it('should set the default item label to "A" if the item name is "a"', () => {
    const expected = 'A';
    const itemName = 'a';
    const actual = setDefaultLabel(itemName);

    expect(actual).equals(expected);
  });
});
