import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import TextField from '../common/TextField.jsx';

import styles from './categoryDetail.css';

const CategoryDetailForm = ({ category, errors, onChange }) => {
  return (
    <div className="ibox-content">
      <div className="row">
        <div className={styles['category-controls']}>
          <TextField
            fullWidth
            name="categoryName"
            value={category.categoryName}
            floatingLabelText="Category Name"
            onChange={onChange}
            errorText={errors.categoryName} />
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
