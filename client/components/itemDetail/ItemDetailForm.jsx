import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import TextField from '../common/TextField.jsx';
import SelectList from '../common/SelectList.jsx';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ItemImage from './ItemImage.jsx';
import { itemPriceTypes } from '../../utilities/constants';

import styles from './itemDetail.css';

const ItemDetailForm = ({ item, categories, errors, onChange, onDrop }) => {
  const itemPriceType = itemPriceTypes
    .find(priceType => priceType.value == item.priceTypeID); //eslint-disable-line

  const itemCategories = categories
    .map(category => {
      return {
        name: 'itemCategoryID',
        value: category.categoryID,
        label: category.categoryName
      };
    });

  const selectedCategory = itemCategories.find(category => category.value === item.itemCategoryID);

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
            
            value={itemPriceType}>

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
      <div className="row">
        <Divider />
      </div>
      <div className="row">
        <div className={styles['additional-items-heading']}>
          Additional Configuration
        </div>
      </div>
      <div className="row">
        <Divider />
      </div>
      <div className="row">
        <div className={styles['additional-items-container']}>
          <div className="col-md-offset-4 col-sm-4">
            <SelectList
              onChange={onChange}
              fullWidth
              floatingLabelText="Item Category"
              floatingLabelStyle={{fontWeight: 500 }}
              value={selectedCategory} >

              {itemCategories.map(category => {
                return (
                  <MenuItem
                    value={category}
                    primaryText={category.label}
                    key={category.value} />
                );
              })}
            </SelectList>
          </div>
        </div>
      </div>
    </div>
  );
};

ItemDetailForm.propTypes = {
  errors: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default CSSModules(ItemDetailForm, styles);
