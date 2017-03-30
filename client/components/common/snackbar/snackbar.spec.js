import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Snackbar from './index.js';
import BaseSnackbar from 'material-ui/Snackbar';

describe('<Snackbar />', () => {

  const defaultProps = {
    action: 'OK',
    message: 'foobar',
    open: true
  };

  it('should contain a snackbar component from Material-UI', () => {
    
    const wrapper = shallow(<Snackbar {...defaultProps} />);
    const expected = 1;
    
    const actual = wrapper.find(BaseSnackbar).length;
    expect(actual).equals(expected);
  });

  it('should set the default autoHideDuration to 3 seconds if nothing is passed in as props', () => {
    
    const wrapper = shallow(<Snackbar {...defaultProps} />);
    const expected = 3000;

    const actual = wrapper.find(BaseSnackbar)
      .props()
      .autoHideDuration;

    expect(actual).equals(expected);
  });

  it('should properly accept the message value if it is passed in', () => {
    
    const updatedProps = {
      ...defaultProps,
      message: 'Close this dialog'
    };

    const wrapper = shallow(<Snackbar {...updatedProps} />);
    const expected = 'Close this dialog';

    const actual = wrapper.find(BaseSnackbar)
      .props()
      .message;

    expect(actual).equals(expected);
  });

});
