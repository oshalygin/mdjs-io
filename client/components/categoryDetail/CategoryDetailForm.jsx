import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField.jsx';

import './categoryDetail.css';

const CategoryDetailForm = ({ category, errors, onChange }) => {
  return (
    <div className="ibox-content">
      <div className="row">
        <div styleName="form-controls">
          <div styleName="control-group">
            <div styleName="extended-control-label">Category Name</div>
            <div styleName="extended-control-input">
              <TextField
                fullWidth
                name="categoryName"
                value={category.categoryName}
                onChange={onChange}
                errorText={errors.categoryName}
              />
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
  onChange: PropTypes.func.isRequired,
};

export default CategoryDetailForm;
