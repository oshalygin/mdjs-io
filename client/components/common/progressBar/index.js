import React from 'react';
import PropTypes from 'prop-types';

import LinearProgress from 'material-ui/LinearProgress';

import colors from '../../../styles/colors';

const ProgressBar = ({ color, min, max, value }) => {
  const minimumValue = min || 0;
  const maximumValue = max || 100;
  const style = {
    height: '0.5rem',
    backgroundColor: '#F5F5F5',
  };

  const progressBarColor = color || colors.blue;

  return (
    <LinearProgress
      mode="determinate"
      style={style}
      min={minimumValue}
      max={maximumValue}
      value={value}
      color={progressBarColor}
    />
  );
};

ProgressBar.propTypes = {
  color: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
};

export default ProgressBar;
