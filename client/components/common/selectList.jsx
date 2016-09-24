import React, { PropTypes } from "react";
import SelectListRow from "./selectListRow.jsx";

const SelectList = ({value, label, name, options, onChange}) => {
    let classList = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select";
    if (!!value) {
        classList += " is-dirty";
    }
    return (
        <div className={classList} >
            <input className="mdl-textfield__input"
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                tabIndex="-1"
                data-value={value} />
            <label htmlFor={name} className="mdl-textfield__label">{label}</label>
            <ul htmlFor={name} className="mdl-menu mdl-menu--bottom-left mdl-js-menu" name="priceTypeId">
                {options.map(option => {
                    return (<SelectListRow
                        key={option.value}
                        label={option.label}
                        name={name}
                        value={option.value}
                        onChange={onChange} />);
                })}
            </ul>
        </div>
    );
};

SelectList.propTypes = {
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
    defaultOption: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

export default SelectList;