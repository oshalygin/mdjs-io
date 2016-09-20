import React, { PropTypes } from "react";

const TextInput = ({name, label, onChange, placeholder, value, error}) => {

    return (
        <div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                    className="mdl-textfield__input"
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name} />
                <label className="mdl-textfield__label" htmlFor={label}>{placeholder}</label>
                {error && <span className="mdl-textfield__error">{error}</span>}
            </div>


        </div>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    // placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    error: PropTypes.string
};

export default TextInput;