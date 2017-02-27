/* eslint-disable no-underscore-dangle */
import { shallow } from 'enzyme';
import ItemImage from './ItemImage.jsx';
import DropZone from 'react-dropzone';

import React from 'react';

import { expect } from 'chai';

describe('<ItemImage />', () => {

  const props = {
    itemPreview: 'http://foobar.com/images/filename.jpg',
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

    const expected = 'url(http://foobar.com/images/filename.jpg)';
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

});
