/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { IMAGE_ENDPOINT } from '../../actions/httpEndpoints';
import DropZone from 'react-dropzone';

export function getImageUrl(itemPreview) {
  if (!itemPreview) {
    return null;
  }

  return itemPreview.includes('blob')
    ? itemPreview
    : `${IMAGE_ENDPOINT}/${itemPreview}`;
}

const ItemImage = ({ itemPreview, onDrop }) => {
  const imageBoxLength = 10;
  const unitOfMeasure = 'em';
  const imageBorderColor = 'rgb(33,150,243)';

  const imageUrl = getImageUrl(itemPreview);

  const imagePlaceholderContainer = {
    position: 'relative',
    width: '25em',
    height: '25em',
    float: 'right'
  };

  const imageContainer = {
    position: 'absolute',
    margin: `-${imageBoxLength / 2}${unitOfMeasure} auto`,
    width: '100%',
    height: `${imageBoxLength}${unitOfMeasure}`,
    top: '50%'
  };

  const imageItem = {
    border: `0.5em solid ${imageBorderColor}`,
    borderRadius: '1.5em',
    display: 'block',
    height: `${imageBoxLength}${unitOfMeasure}`,
    width: `${imageBoxLength}${unitOfMeasure}`,
    margin: '0 auto',
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer',
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    lineHeight: `${imageBoxLength - imageBoxLength / 10}${unitOfMeasure}`
  };

  const imageContent = !!itemPreview
    ? (<div style={imageItem} />)
    : (<div style={imageItem}>Drag/Click Here</div>);

  return (
    <div style={imagePlaceholderContainer}>
      <DropZone style={imageContainer} onDrop={onDrop}>
        {imageContent}
      </DropZone>
    </div>
  );
};

ItemImage.propTypes = {
  onDrop: PropTypes.func.isRequired,
  itemPreview: PropTypes.string
};

export default ItemImage;
