import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import { IMAGE_ENDPOINT } from '../../actions/httpEndpoints';
import styles from './item.css';

export function getImageStyle(imageId) {
  const backgroundImage = imageId
    ? `url(${IMAGE_ENDPOINT}/${imageId})`
    : '';

  return {
    border: '1px solid black',
    whiteSpace: 'normal',
    padding: '0.5em',
    display: 'flex',
    alignItems: 'center',
    wordBreak: 'break-all',
    borderRadius: '5px',
    objectFit: 'contain',
    height: '4em',
    width: '4em',
    backgroundColor: '#778088',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage
  };
}

const ItemImage = ({ imageId, label }) => {
  const labelImage = (<div className={styles['image-label']}>{label}</div>);
  const imageStyle = getImageStyle(imageId);

  return (
    <div className={styles['image-container']}>
      <div style={imageStyle}>
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
