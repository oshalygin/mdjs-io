import React, { PropTypes } from "react";

import TextInput from "../common/textInput.jsx";
import SelectList from "../common/selectList.jsx";

const ItemDetailForm = ({item, onChange}) => {
    const imagePlaceholderContainer = {
        position: "relative",
        backgroundColor: "yellow",
        width: "25em",
        height: "25em",
        float: "right"
    };
    const imagePlaceholder = {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "5em",
        height: "5em",
        backgroundColor: "red"
    };
    return (
        <div className="ibox-content">
            <div className="row">
                <div className="col-md-offset-1 col-sm-3">
                    <TextInput
                        name="name"
                        label={item.name}
                        value={item.name}
                        placeholder="Name"
                        onChange={onChange}
                        />
                    <TextInput
                        name="label"
                        label={item.label}
                        value={item.label}
                        placeholder="Item Label"
                        onChange={onChange}
                        />
                    <TextInput
                        name="price"
                        label={item.price.toString()}
                        value={item.price}
                        placeholder="Price"
                        onChange={onChange}
                        />
                    <SelectList />
                </div>
                <div className="col-md-offset-4 col-md-3">
                    <div style={imagePlaceholderContainer}>
                        <div style={imagePlaceholder} />
                    </div>
                </div>
            </div>
        </div>
    );
};

ItemDetailForm.propTypes = {
    item: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default ItemDetailForm;

