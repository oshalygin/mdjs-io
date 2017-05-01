/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import { IMAGE_ENDPOINT } from '../../../utilities/endpoints';
import styles from './itemImage.css';

export function getImageStyle(imageId) {

  const backgroundImage = imageId
    ? `url(${IMAGE_ENDPOINT}/${imageId})`
    : '';

  return {
    backgroundImage
  };
}

const ItemImage = ({ itemId, imageId, label, onClick }) => {
  const labelImage = (<div className={styles['image-label']}>{label}</div>);
  const imageStyle = getImageStyle(imageId);

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
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default CSSModules(ItemImage, styles);
