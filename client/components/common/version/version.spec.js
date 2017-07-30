import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import Version from './index';

describe('<Version />', () => {
  it('should display the package version as text in the component', () => {
    const props = {
      version: '1.3.3',
    };

    const wrapper = shallow(<Version.WrappedComponent {...props} />);
    const actual = wrapper.text();

    expect(actual).not.empty; //eslint-disable-line no-unused-expressions
  });
});
