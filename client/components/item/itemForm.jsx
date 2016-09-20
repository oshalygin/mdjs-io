import React, { PropTypes } from "react";
import TextInput from "../common/textInput.jsx";

const ItemForm = ({item, onChange}) => {
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
                    <TextInput
                        name="priceTypeID"
                        value={item.priceTypeID}
                        label={item.priceTypeID.toString()}
                        placeholder="Unit of Measure (oz)"
                        onChange={onChange}
                        />
                </div>
                <div className="col-md-offset-2 col-md-3">
                Image
                </div>
            </div>
        </div>
    );
};

ItemForm.propTypes = {
    item: PropTypes.object.isRequired
};

export default ItemForm;

