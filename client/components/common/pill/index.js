import React from 'react';
import PropTypes from 'prop-types';

import CSSModules from 'react-css-modules';

import styles from './pill.css';

const Pill = ({ label }) => {
  return (
    <div className={styles['pill-container']}>
      <div className={styles['pill-label']}>
        {label}
      </div>
    </div>
  );
};

Pill.propTypes = {
  label: PropTypes.string.isRequired
};

export default CSSModules(Pill, styles);
