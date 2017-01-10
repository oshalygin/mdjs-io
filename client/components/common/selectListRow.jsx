import React, { PropTypes } from 'react';

const SelectListRow = ({name, label, value, onChange}) => {
  return (
    <li
      className="mdl-menu__item"
      name={name}
      data-value={value}
      onClick={onChange}>
      {label}
    </li>
  );
};

SelectListRow.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectListRow;
