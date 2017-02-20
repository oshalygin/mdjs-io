import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Spinner = ({ color, thickness, size, hidden }) => {
  const spinnerDisplay = hidden ?
    { display: 'none' }
    : { display: 'initial' };

  const spinnerThickness = thickness || 5;
  const spinnerColor = color || '#3498db';
  const spinnerSize = size || 80;

  return (
    <CircularProgress
      style={spinnerDisplay}
      size={spinnerSize}
      thickness={spinnerThickness}
      color={spinnerColor} />
  );
};

Spinner.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.number,
  size: PropTypes.number,
  hidden: PropTypes.bool
};

export default Spinner;
