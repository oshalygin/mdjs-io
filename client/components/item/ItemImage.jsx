import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import { IMAGE_ENDPOINT } from '../../utilities/endpoints';
import styles from './item.css';

export function getImageStyle(imageId) {

  const backgroundImage = imageId
    ? `url(${IMAGE_ENDPOINT}/${imageId})`
    : '';

  return {
    backgroundImage
  };
}

const ItemImage = ({ imageId, label }) => {
  const labelImage = (<div className={styles['image-label']}>{label}</div>);
  const imageStyle = getImageStyle(imageId);

  return (
    <div className={styles['image-container']}>
      <div className={styles['item-image']} style={imageStyle}>
        {!imageId && labelImage}
      </div>
    </div>
  );
};

ItemImage.propTypes = {
  imageId: PropTypes.string,
  label: PropTypes.string.isRequired
};

export default CSSModules(ItemImage, styles);
