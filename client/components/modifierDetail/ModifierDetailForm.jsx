import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import TextField from '../common/TextField.jsx';

import styles from './modifierDetail.css';

const ModifierDetialForm = ({ modifier, errors, onChange }) => {
  return (
    <div className="ibox-content">
      <div className="row">
        <div className={styles['modifier-controls']}>
          <TextField
            fullWidth
            name="modifierName"
            value={modifier.modifierName}
            floatingLabelText="Modifier Name"
            onChange={onChange}
            errorText={errors.modifierName} />
        </div>
      </div>
    </div>
  );
};

ModifierDetialForm.propTypes = {
  errors: PropTypes.object.isRequired,
  modifier: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CSSModules(ModifierDetialForm, styles);
