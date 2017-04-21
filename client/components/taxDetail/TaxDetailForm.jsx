import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from '../common/TextField.jsx';

import styles from './taxDetail.css';

const TaxDetailForm = ({ tax, items, errors, onChange }) => {

  const taxOptions = [
    { name: 'taxTypeID', value: 0, label: 'Everything' },
    { name: 'taxTypeID', value: 1, label: 'Specific Items' }
  ];

  const displayItems = items.map(item => {
    return {
      name: 'items',
      value: item.itemID,
      label: item.label
    };
  });

  const selectedTaxOption = taxOptions.find(option => option.value === tax.taxTypeID);
  const displayItemSelection = selectedTaxOption && !!selectedTaxOption.value;

  return (
    <div className="ibox-content">
      <div className="row">
        <div className="col-md-offset-1 col-sm-4">
          <div className="row">
            <TextField
              fullWidth
              name="taxName"
              value={tax.taxName}
              floatingLabelText="Tax Name"
              onChange={onChange}
              errorText={errors.taxName} />
          </div>
          <div className="row">
            <div>
              <TextField
                fullWidth
                name="value"
                value={tax.value}
                floatingLabelText="Tax Rate"
                onChange={onChange}
                style={{ display: 'inline-block', width: '30%' }}
                errorText={errors.value} />
              <span className={styles['percent-text']}>
                %
            </span>
            </div>
          </div>
          <div className={styles['tax-option-control']}>
            <div className="row">
              <div className={styles['tax-name-control']}>
                <SelectField
                  floatingLabelText="Apply To"
                  value={selectedTaxOption}
                  floatingLabelStyle={{ fontWeight: 500 }}
                  onChange={onChange}>
                  {taxOptions.map(option => {
                    return (
                      <MenuItem
                        key={option.value}
                        primaryText={option.label}
                        value={option} />
                    );
                  })}
                </SelectField>
              </div>
            </div>
          </div>
          <div className={styles['tax-option-control']}>
            <div className="row">
              {displayItemSelection &&
                (<div className={styles['tax-name-control']}>
                  <SelectField
                    multiple
                    floatingLabelText="Items"
                    floatingLabelStyle={{ fontWeight: 500 }}
                    value={tax.items}
                    onChange={onChange}>
                    {displayItems.map(item => {
                      return (
                        <MenuItem
                          key={item.value}
                          insetChildren
                          checked={tax.items
                            && tax.items.includes(item.value)}
                          value={item.value}
                          primaryText={item.name}
                        />
                      );
                    })}
                  </SelectField>
                </div>
                )}
            </div>
          </div>
        </div>
        <div className="col-md-offset-1 col-sm-4">
          <div className={styles['detail-icon']}>
            <i className="material-icons" style={{ fontSize: '124px' }}>account_balance</i>
          </div>
        </div>
      </div>
    </div>
  );
};

TaxDetailForm.propTypes = {
  errors: PropTypes.object.isRequired,
  tax: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CSSModules(TaxDetailForm, styles);
