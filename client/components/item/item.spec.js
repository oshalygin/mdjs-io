/* eslint-disable no-unused-vars */
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import Item from './index';

import { expect } from 'chai';

describe('<Item />', () => {

  const props = {

  };

  it('should contain a button component that is titled "New Item"', () => {

    const expected = 'New Item';
    const wrapper = shallow(<Item.WrappedComponent {...props} />);

  });

});
