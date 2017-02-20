import React, { PropTypes } from 'react';

const SquareSpinner = ({hidden}) => {
  const spinnerDisplay = hidden ?
    { display: 'none' }
    : { display: 'initial' };

  return (
    <div style={spinnerDisplay} className="spinner" />
  );
};

SquareSpinner.propTypes = {
  hidden: PropTypes.bool
};

export default SquareSpinner;
