import { shallow } from 'enzyme';
import TextField from '../common/TextField.jsx';

import React from 'react';
import CategoryDetailForm from './CategoryDetailForm.jsx';

import { expect } from 'chai';

describe('<CategoryDetailForm />', () => {
  const errors = {
    categoryName: false
  };
  const props = {
    category: {
      categoryID: 0,
      categoryName: ''
    },
    errors,
    onChange() { }
  };

  it('should contain one text fields on the form', () => {

    const wrapper = shallow(<CategoryDetailForm {...props} />);

    const expected = 1;
    const actual = wrapper.find(TextField).length;

    expect(actual).equals(expected);

  });

});
