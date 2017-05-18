import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import TextField from '../common/TextField.jsx';
import styles from './modifierDetail.css';

const ModifierDetialForm = ({ modifier, errors, onChange }) => {
  return (
    <div className="ibox-content">
      <div className="row">
        <div className={styles['modifier-controls']}>
          <div className={styles['control-group']}>
            <div className={styles['extended-control-label']}>
              Modifier Name
            </div>
            <div className={styles['extended-control-input']}>
              <TextField
                fullWidth
                name="modifierName"
                value={modifier.modifierName}
                onChange={onChange}
                errorText={errors.modifierName} />
            </div>
          </div>
          <div className={styles['control-group']}>
            <div className={styles['control-label']}>
              Price ($)
            </div>
            <div className={styles['control-input']}>
              <TextField
                fullWidth
                name="modifierPrice"
                value={modifier.modifierPrice}
                onChange={onChange}
                errorText={errors.modifierPrice} />
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
  onChange: PropTypes.func.isRequired
};

export default CSSModules(ModifierDetialForm, styles);
