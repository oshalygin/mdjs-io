import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { IMAGE_ENDPOINT } from '../../actions/httpEndpoints';
import ItemImage, { getImageStyle } from './ItemImage.jsx';

describe('<ItemImage />', () => {

  it('should set the background-image property if the imageId is present', () => {

    const imageId = '2ba2f145-cb13-42c4-a9bd-58af102d63c3';
    const expected = `url(${IMAGE_ENDPOINT}/${imageId})`;

    const actual = getImageStyle(imageId)
      .backgroundImage;

    expect(actual).equals(expected);
  });

  it('should have an empty background-image property if the imageId was not provided', () => {

    const expected = '';

    const actual = getImageStyle()
      .backgroundImage;

    expect(actual).equals(expected);
  });

  it('should render the component with the item label if the imageId is not set', () => {

    const props = {
      label: 'apples'
    };

    const expected = 1;

    const wrapper = shallow(<ItemImage {...props} />);
    const actual = wrapper.find('.image-label').length;

    expect(actual).equals(expected);
  });

  it('should NOT render the label component if the imageId is present', () => {

    const props = {
      imageId: '2ba2f145-cb13-42c4-a9bd-58af102d63c3',
      label: 'apples'
    };

    const expected = 0;

    const wrapper = shallow(<ItemImage {...props} />);
    const actual = wrapper.find('.image-label').length;

    expect(actual).equals(expected);
  });

  it('should render the label component if the imageId is an empty string', () => {

    const props = {
      imageId: '',
      label: 'apples'
    };

    const expected = 1;

    const wrapper = shallow(<ItemImage {...props} />);
    const actual = wrapper.find('.image-label').length;

    expect(actual).equals(expected);
  });

});
