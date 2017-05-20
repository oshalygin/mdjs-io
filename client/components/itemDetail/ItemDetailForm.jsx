import React from 'react';
import PropTypes from 'prop-types';


import TextField from '../common/TextField.jsx';
import SelectList from '../common/SelectList.jsx';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ItemImage from './ItemImage.jsx';
import { itemPriceTypes } from '../../utilities/constants';

import './itemDetail.css';

export function getModifierLabel(modifier) {
  const name = modifier.modifierName;
  const price = modifier.modifierPrice;

  return `${name} - $${price.toFixed(2)}`;
}

const ItemDetailForm = ({ item, categories, modifiers, errors, onChange, onDrop }) => {
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

  const displayModifiers = modifiers.map(modifier => {
    return {
      name: 'modifiers',
      value: modifier.modifierID,
      label: getModifierLabel(modifier)
    };
  });

  const selectedCategory = itemCategories.find(category => category.value === item.itemCategoryID);

  return (
    <div className="ibox-content">
      <div className="row">
          <div className="col-sm-offset-1 col-sm-6">
            <div styleName="control-group">
              <div styleName="extended-control-label">
                Name
            </div>
              <div styleName="extended-control-input">
                <TextField
                  fullWidth
                  name="name"
                  value={item.name}
                  onChange={onChange}
                  errorText={errors.name} />
              </div>
            </div>
            <div styleName="control-group">
              <div styleName="extended-control-label">
                Label
            </div>
              <div styleName="extended-control-input">
                <TextField
                  fullWidth
                  name="label"
                  value={item.label}
                  onChange={onChange}
                  errorText={errors.label} />
              </div>
            </div>
            <div styleName="control-group">
              <div styleName="extended-control-label">
                Price ($)
            </div>
              <div styleName="extended-control-input">
                <TextField
                  fullWidth
                  name="price"
                  value={item.price}
                  onChange={onChange}
                  errorText={errors.price} />
              </div>
            </div>
            <div styleName="control-group">
              <div styleName="extended-select-input">
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
            </div>
          </div>
          <div className="col-md-offset-2 col-md-3">
            <ItemImage
              onDrop={onDrop}
              itemPreview={item.photoURL} />
          </div>
        </div>
        <div className="row">
          <Divider />
        </div>
        <div className="row">
          <div styleName="additional-items-heading">
            Additional Configuration
        </div>
        </div>
        <div className="row">
          <Divider />
        </div>
        <div className="row">
          <div styleName="additional-items-container">
            <div className="row">
              <div className="col-md-offset-4 col-sm-4">
                <SelectList
                  onChange={onChange}
                  fullWidth
                  floatingLabelText="Item Category"
                  floatingLabelStyle={{ fontWeight: 500 }}
                  value={selectedCategory}>
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
            <div className="row">
              <div className="col-md-offset-4 col-sm-4">
                <SelectList
                  multiple
                  fullWidth
                  floatingLabelText="Modifiers"
                  floatingLabelStyle={{ fontWeight: 500 }}
                  value={item.modifiers}
                  onChange={onChange}>
                  {displayModifiers.map(modifier => {
                    return (
                      <MenuItem
                        key={modifier.value}
                        insetChildren
                        checked={item.modifiers
                          && item.modifiers.includes(modifier.value)}
                        value={modifier.value}
                        primaryText={modifier.label}
                      />
                    );
                  })}
                </SelectList>
              </div>
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
  modifiers: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
};

export default ItemDetailForm;
