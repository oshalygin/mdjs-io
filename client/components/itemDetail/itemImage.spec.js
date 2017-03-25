/* eslint-disable no-underscore-dangle */
import { shallow } from 'enzyme';
import { IMAGE_ENDPOINT } from '../../utilities/endpoints';
import ItemImage, { getImageUrl } from './ItemImage.jsx';
import DropZone from 'react-dropzone';

import React from 'react';

import { expect } from 'chai';

describe('<ItemImage />', () => {

  const props = {
    itemPreview: '187141ee-d6e7-472d-9173-2ff9f6b88d6e',
    onDrop() { }
  };

  it('should contain a DropZone component', () => {

    const wrapper = shallow(<ItemImage {...props} />);

    const expected = 1;
    const actual = wrapper.find(DropZone).length;

    expect(actual).equals(expected);

  });

  it('should display the image if the preview was passed in', () => {

    const wrapper = shallow(<ItemImage {...props} />);

    const expected = `url(${IMAGE_ENDPOINT}/${props.itemPreview})`;
    const actual = wrapper.find(DropZone)
      .childAt(0)
      .props()
      .style
      .backgroundImage;

    expect(actual).equals(expected);

  });

  it('should display text of "Drag/Click Here" if the preview image was not passed in', () => {
    const updatedProps = {
      ...props,
      itemPreview: null
    };

    const wrapper = shallow(<ItemImage {...updatedProps} />);

    const expected = 'Drag/Click Here';
    const actual = wrapper.find(DropZone)
      .childAt(0)
      .text();

    expect(actual).equals(expected);

  });

  it('should return null for the imageUrl if nothing was passed in', () => {

    const expected = null;
    const actual = getImageUrl();

    expect(actual).equals(expected);

  });

  it('should return null for the imageUrl if nothing was passed in', () => {

    const expected = null;
    const actual = getImageUrl();

    expect(actual).equals(expected);

  });

  it('should return the exact argument if it contains "blob" in the string', () => {

    const itemPreview = 'blob:http://localhost:8080/foobar.jpg';
    const expected = itemPreview;
    const actual = getImageUrl(itemPreview);

    expect(actual).equals(expected);

  });

  it('should return the exact argument if it contains "blob" at the end of the string', () => {

    const itemPreview = 'http://localhost:8080/foobar.jpgblob';
    const expected = itemPreview;
    const actual = getImageUrl(itemPreview);

    expect(actual).equals(expected);

  });

  it('should return the image path at the api if the preview is a uuid', () => {

    const itemPreview = '187141ee-d6e7-472d-9173-2ff9f6b88d6e';
    const expected = `${IMAGE_ENDPOINT}/${itemPreview}`;
    const actual = getImageUrl(itemPreview);

    expect(actual).equals(expected);

  });

});
