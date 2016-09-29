import React, { PropTypes } from "react";

import TextInput from "../common/textInput.jsx";
import SelectList from "../common/selectList.jsx";
import ItemImage from "./itemImage.jsx";
import { itemPriceTypes, stringPattern, numberPattern } from "../../utilities/constants";

const ItemDetailForm = ({item, errors, onChange}) => {

    const itemPriceIdValue = itemPriceTypes
        .filter(priceType => priceType.value == item.priceTypeID)[0] //eslint-disable-line eqeqeq
        .label;

    return (
        <div className="ibox-content">
            <div className="row">
                <div className="col-md-offset-1 col-sm-3">
                    <TextInput
                        name="name"
                        value={item.name}
                        placeholder="Name"
                        onChange={onChange}
                        pattern={stringPattern}
                        error={errors.name}
                        />
                    <TextInput
                        name="label"
                        value={item.label}
                        placeholder="Item Label"
                        onChange={onChange}
                        pattern={stringPattern}
                        error={errors.label}
                        />
                    <TextInput
                        name="price"
                        value={item.price}
                        placeholder="Price"
                        onChange={onChange}
                        pattern={numberPattern}
                        error={errors.price}
                        />
                    <SelectList
                        onChange={onChange}
                        options={itemPriceTypes}
                        name="priceTypeID"
                        label="Price Type"
                        value={itemPriceIdValue}
                        />
                </div>
                <div className="col-md-offset-4 col-md-3">
                    <ItemImage />
                </div>
            </div>
        </div>
    );
};

ItemDetailForm.propTypes = {
    errors: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default ItemDetailForm;

