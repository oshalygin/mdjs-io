/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { itemColors } from '../../../utilities/constants';

import { IMAGE_ENDPOINT } from '../../../utilities/endpoints';
import styles from './itemImage.css';

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
    (<div className={styles['image-label']}>{label}</div>) :
    (<div className={styles['image-label']}
      style={{
        fontSize: '2rem'
      }}>C</div>);

  const imageStyle = getImageStyle(imageId, color);

  return (
    <div className={styles['image-container']}
      onClick={() => onClick(itemId)}>
      <div className={styles['item-image']} style={imageStyle}>
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

export default CSSModules(ItemImage, styles);
