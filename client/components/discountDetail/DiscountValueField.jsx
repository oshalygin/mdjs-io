import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import TextField from '../common/TextField.jsx';
import styles from './discountDetail.css';

const DiscountValueField = ({ isPercent, errorText, style, onChange, floatingLabelText, value, name, fullWidth }) => {

  return isPercent ?
    (
      <div>
        <TextField
          fullWidth={fullWidth}
          name={name}
          value={value}
          floatingLabelText={floatingLabelText}
          onChange={onChange}
          style={style}
          errorText={errorText} />
        <span className={styles['percent-text']}>
          %
        </span>
      </div>
    ) :
    (
      <div>
        <span className={styles['currency-text']}>
          $
        </span>
        <TextField
          fullWidth={fullWidth}
          name={name}
          value={value}
          floatingLabelText={floatingLabelText}
          onChange={onChange}
          style={style}
          errorText={errorText} />
      </div>
    );

};

DiscountValueField.propTypes = {
  isPercent: PropTypes.bool,
  fullWidth: PropTypes.bool,
  errorText: PropTypes.any,
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  floatingLabelText: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string.isRequired
};

export default CSSModules(DiscountValueField, styles);
