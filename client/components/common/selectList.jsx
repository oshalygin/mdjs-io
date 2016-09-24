import React, { PropTypes } from "react";

const SelectList = ({value, label, options, defaultOption, onChange}) => {
    return (
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fullwidth">
            <input className="mdl-textfield__input" type="text" id="sample1" value={value} readOnly tabIndex="-1" />
            <i className="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
            <label htmlFor="sample1" className="mdl-textfield__label">{label}
                <i className="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
            </label>
            <ul htmlFor="sample1" className="mdl-menu mdl-menu--bottom-left mdl-js-menu" name="priceTypeId">
                <li className="mdl-menu__item" name="itemPriceTypeId" data-value="Germany" onClick={onChange}>Germany</li>
                <li className="mdl-menu__item" name="itemPriceTypeId" data-value="Belarus" onClick={onChange}>Belarus</li>
                <li className="mdl-menu__item" name="itemPriceTypeId" data-value="Russia" onClick={onChange}>Russia</li>
            </ul>
        </div>
    );
};

SelectList.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array,
    defaultOption: PropTypes.bool,
    onChange: PropTypes.func.isRequired
};

export default SelectList;