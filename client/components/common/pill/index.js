import React from 'react';
import PropTypes from 'prop-types';

import './pill.css';

const Pill = ({ label }) => {
  return (
    <div styleName="pill-container">
      <div styleName="pill-label">
        {label}
      </div>
    </div>
  );
};

Pill.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Pill;
