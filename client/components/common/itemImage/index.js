/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';


import { itemColors } from '../../../utilities/constants';

import { IMAGE_ENDPOINT } from '../../../utilities/endpoints';
import './itemImage.css';

export function getImageStyle(imageId, color) {

  const itemColor = color ?
    itemColors
      .find(itemColorEntity => itemColorEntity.value === color)
      .color :
    '#778088';

  const backgroundColor = itemColor;

  const backgroundImage = imageId
    ? `url(${IMAGE_ENDPOINT}/${imageId})`
    : '';

  return {
    backgroundColor,
    backgroundImage
  };
}

const ItemImage = ({ itemId, color, imageId, label, onClick }) => {

  const labelImage = !!label ?
    (<div styleName="image-label">{label}</div>) :
    (<div styleName="image-label"
      style={{
        fontSize: '2rem'
      }}>C</div>);

  const imageStyle = getImageStyle(imageId, color);

  return (
    <div styleName="image-container"
      onClick={() => onClick(itemId)}>
      <div styleName="item-image" style={imageStyle}>
        {!imageId && labelImage}
      </div>
    </div>
  );
};

ItemImage.propTypes = {
  itemId: PropTypes.number.isRequired,
  imageId: PropTypes.string,
  color: PropTypes.number,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default ItemImage;
