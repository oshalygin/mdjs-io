import React from 'react';
import SelectField from 'material-ui/SelectField';

import { primaryBlue } from '../../utilities/colors';

const formControlUnderlineFocus = {
  color: primaryBlue,
};

class CustomSelectField extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 1,
      underlineFocusStyle: formControlUnderlineFocus,
    };
  }

  render() {
    const props = { ...this.state, ...this.props };
    return <SelectField {...props} />;
  }
}

export default CustomSelectField;
