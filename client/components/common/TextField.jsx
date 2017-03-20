/* eslint-disable max-params */
import React, { PropTypes } from 'react';
import BaseTextField from 'material-ui/TextField';
import { primaryBlue } from '../../utilities/colors';

const formControlUnderlineFocus = {
  color: primaryBlue
};

const formFloatingLabelStyle = {
  fontWeight: 500
};

class TextField extends React.Component {
  constructor() {
    super();
    this.state = {
      underlineFocusStyle: formControlUnderlineFocus,
      floatingLabelStyle: formFloatingLabelStyle
    };
  }

  render() {
    const props = { ...this.state, ...this.props };
    return (
      <BaseTextField {...props} />
    );
  }
}

TextField.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  errorStyle: PropTypes.object,
  errorText: PropTypes.node,
  floatingLabelFixed: PropTypes.bool,
  floatingLabelFocusStyle: PropTypes.object,
  floatingLabelShrinkStyle: PropTypes.object,
  floatingLabelStyle: PropTypes.object,
  floatingLabelText: PropTypes.node,
  fullWidth: PropTypes.bool,
  hintStyle: PropTypes.object,
  hintText: PropTypes.node,
  id: PropTypes.string,
  inputStyle: PropTypes.object,
  multiLine: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  style: PropTypes.object,
  textareaStyle: PropTypes.object,
  type: PropTypes.string,
  underlineDisabledStyle: PropTypes.object,
  underlineFocusStyle: PropTypes.object,
  underlineShow: PropTypes.bool,
  underlineStyle: PropTypes.object,
  value: PropTypes.any
};

export default TextField;
