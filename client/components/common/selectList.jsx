import React, { PropTypes } from "react";

const SelectList = () => {
    return (
        <div className="mdl-selectfield mdl-js-selectfield mdl-selectfield--floating-label">
            <select id="gender" className="mdl-selectfield__select">
                <option value="" />
                <option value="option1">option 1</option>
                <option value="option2">option 2</option>
            </select>
            <label className="mdl-selectfield__label" htmlFor="gender">User gender</label>
            <span className="mdl-selectfield__error">Select a value</span>
        </div>
    );
};

export default SelectList;