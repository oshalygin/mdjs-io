import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../../common/TextField.jsx';
import './modifierDetail.css';

const ModifierDetialForm = ({ modifier, errors, onChange }) => {
  return (
    <div className="ibox-content">
      <div className="row">
        <div styleName="modifier-controls">
          <div styleName="control-group">
            <div styleName="extended-control-label">Modifier Name</div>
            <div styleName="extended-control-input">
              <TextField
                fullWidth
                name="modifierName"
                value={modifier.modifierName}
                onChange={onChange}
                errorText={errors.modifierName}
              />
            </div>
          </div>
          <div styleName="control-group">
            <div styleName="control-label">Price ($)</div>
            <div styleName="control-input">
              <TextField
                fullWidth
                name="modifierPrice"
                value={modifier.modifierPrice}
                onChange={onChange}
                errorText={errors.modifierPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModifierDetialForm.propTypes = {
  errors: PropTypes.object.isRequired,
  modifier: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ModifierDetialForm;
