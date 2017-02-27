import React, { PropTypes } from 'react';

import TextField from '../common/TextField.jsx';
import SelectList from '../common/SelectList.jsx';
import MenuItem from 'material-ui/MenuItem';
import ItemImage from './ItemImage.jsx';
import { itemPriceTypes } from '../../utilities/constants';

const ItemDetailForm = ({ item, errors, onChange, onDrop }) => {
  const itemPriceType = itemPriceTypes
    .filter(priceType => priceType.value == item.priceTypeID)[0] //eslint-disable-line

  return (
    <div className="ibox-content">
      <div className="row">
        <div className="col-md-offset-1 col-sm-4">
          <TextField
            fullWidth
            name="name"
            value={item.name}
            floatingLabelText="Name"
            onChange={onChange}
            errorText={errors.name}
          />
          <TextField
            fullWidth
            name="label"
            value={item.label}
            floatingLabelText="Label"
            onChange={onChange}
            errorText={errors.label}
          />
          <TextField
            fullWidth
            name="price"
            value={item.price}
            floatingLabelText="Price"
            onChange={onChange}
            errorText={errors.price}
          />
          <SelectList
            onChange={onChange}
            fullWidth
            floatingLabelText="Price Type"
            value={itemPriceType} >

            {itemPriceTypes.map(itemPrice => {
              return (
                <MenuItem
                  value={itemPrice}
                  primaryText={itemPrice.label}
                  key={itemPrice.value} />
              );
            })}

          </SelectList>
        </div>
        <div className="col-md-offset-4 col-md-3">
          <ItemImage
            onDrop={onDrop}
            itemPreview={item.photoURL} />
        </div>
      </div>
    </div>
  );
};

ItemDetailForm.propTypes = {
  errors: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default ItemDetailForm;
