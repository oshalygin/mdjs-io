import React from 'react';
import PropTypes from 'prop-types';

import CSSModules from 'react-css-modules';

import TextField from '../common/TextField.jsx';

import styles from './categoryDetail.css';

const CategoryDetailForm = ({ category, errors, onChange }) => {
  return (
    <div className="ibox-content">
      <div className="row">
        <div className={styles['form-controls']}>
          <div className={styles['control-group']}>
            <div className={styles['extended-control-label']}>
              Category Name
            </div>
            <div className={styles['extended-control-input']}>
              <TextField
                fullWidth
                name="categoryName"
                value={category.categoryName}
                onChange={onChange}
                errorText={errors.categoryName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryDetailForm.propTypes = {
  errors: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CSSModules(CategoryDetailForm, styles);
