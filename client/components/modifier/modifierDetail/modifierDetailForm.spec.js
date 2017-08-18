import { shallow } from 'enzyme';
import TextField from '../../common/TextField.jsx';

import React from 'react';
import ModifierDetailForm from './ModifierDetailForm.jsx';

import { expect } from 'chai';

describe('<ModifierDetailForm />', () => {
  const errors = {
    modifierName: false,
  };
  const props = {
    modifier: {
      modifierID: 0,
      modifierName: '',
    },
    errors,
    onChange() {},
  };

  it('should contain two text fields on the form', () => {
    const wrapper = shallow(<ModifierDetailForm {...props} />);

    const expected = 2;
    const actual = wrapper.find(TextField).length;

    expect(actual).equals(expected);
  });
});
