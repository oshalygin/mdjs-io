import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField.jsx';
import './discountDetail.css';

const DiscountValueField = ({
  isPercent,
  errorText,
  style,
  onChange,
  floatingLabelText,
  value,
  name,
  fullWidth,
}) => {
  return isPercent
    ? <div>
        <TextField
          fullWidth={fullWidth}
          name={name}
          value={value}
          floatingLabelText={floatingLabelText}
          onChange={onChange}
          style={style}
          errorText={errorText}
        />
        <span styleName="percent-text">%</span>
      </div>
    : <div>
        <span styleName="currency-text">$</span>
        <TextField
          fullWidth={fullWidth}
          name={name}
          value={value}
          floatingLabelText={floatingLabelText}
          onChange={onChange}
          style={style}
          errorText={errorText}
        />
      </div>;
};

DiscountValueField.propTypes = {
  isPercent: PropTypes.bool,
  fullWidth: PropTypes.bool,
  errorText: PropTypes.any,
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  floatingLabelText: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
};

export default DiscountValueField;
