/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import { TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import './discounts.css';

class DiscountTableRow extends React.Component {
  constructor(props) {
    super(props);

    this.navigateToEditLink = this.navigateToEditLink.bind(this);
    this.disabledText = this.disabledText.bind(this);
  }

  navigateToEditLink(discountId) {
    browserHistory.push(`discount/${discountId}`);
  }

  disabledText(discountDisabledState) {
    return discountDisabledState ? 'mdl-color-text--grey' : '';
  }

  render() {
    const { discount, deactivate, ...otherProps } = this.props; // eslint-disable-line
    const parsedLastUpdatedDate = dateFns.format(
      discount.lastUpdatedDate,
      'MMM DD, YYYY',
    );
    const parsedCreatedDate = dateFns.format(
      discount.createdDate,
      'MMM DD, YYYY',
    );

    const appliedTo = !discount.applyTypeID //eslint-disable-line no-nested-ternary
      ? 'Everything'
      : discount.items.length > 1
        ? `${discount.items.length} Items`
        : `${discount.items.length} Item`;

    const value = !discount.discountTypeID
      ? `${discount.value.toFixed(2)} %`
      : `$ ${discount.value.toFixed(2)}`;

    return (
      <TableRow>
        <TableRowColumn className={this.disabledText(discount.disabled)}>
          {discount.discountName}
        </TableRowColumn>
        <TableRowColumn className={this.disabledText(discount.disabled)}>
          {value}
        </TableRowColumn>
        <TableRowColumn className={this.disabledText(discount.disabled)}>
          {appliedTo}
        </TableRowColumn>
        <TableRowColumn className={this.disabledText(discount.disabled)}>
          {parsedCreatedDate}
        </TableRowColumn>
        <TableRowColumn className={this.disabledText(discount.disabled)}>
          {parsedLastUpdatedDate}
        </TableRowColumn>
        <TableRowColumn>
          <div styleName="inline-button">
            <FlatButton
              label="Edit"
              onClick={() => this.navigateToEditLink(discount.discountID)}
            />
          </div>
        </TableRowColumn>
        <TableRowColumn>
          <div styleName="inline-button">
            <RaisedButton
              label="Deactivate"
              secondary
              onClick={() => deactivate(discount.discountID)}
            />
          </div>
        </TableRowColumn>
      </TableRow>
    );
  }
}

DiscountTableRow.propTypes = {
  discount: PropTypes.object.isRequired,
  deactivate: PropTypes.func.isRequired,
};

export default DiscountTableRow;
