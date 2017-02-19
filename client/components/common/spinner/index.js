import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Spinner = ({ color, thickness, size }) => {
  const spinnerThickness = thickness || 5;
  const spinnerColor = color || '#3498db';
  const spinnerSize = size || 80;

  return (
    <CircularProgress
      size={spinnerSize}
      thickness={spinnerThickness}
      color={spinnerColor} />
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.number,
  size: PropTypes.number
};

export default Spinner;
