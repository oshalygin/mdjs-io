import React, { PropTypes } from "react";
import { numberPattern, stringPattern } from "../../utilities/constants";

const TextInput = ({name, onChange, placeholder, value, error, pattern}) => {

    let errorMessage;
    const regexPattern = pattern.replace("\"", "");
    const patternTest = new RegExp(regexPattern);

    //TODO: Move this out of here and into a common utility component
    if (!!value && patternTest.exec(value)) {
        switch (pattern) {
            case numberPattern: {
                errorMessage = "Cannot contain letters...";
                break;
            }
            case stringPattern: {
                errorMessage = "Cannot contain numbers...";
                break;
            }
            default: {
                errorMessage = "Invalid entry";
                break;
            }
        }
        error = errorMessage; //eslint-disable-line no-param-reassign
    }
    return (
        <div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input
                    className="mdl-textfield__input"
                    type="text"
                    onChange={onChange}
                    value={value}
                    pattern={pattern}
                    name={name} />
                <label className="mdl-textfield__label" htmlFor={name}>{placeholder}</label>
                {error && <span className="mdl-textfield__error">{error}</span>}
            </div>


        </div>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    pattern: PropTypes.string.isRequired,
    // onChange: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    // placeholder: PropTypes.string.isRequired,
    value: PropTypes.any,
    error: PropTypes.any
};

export default TextInput;