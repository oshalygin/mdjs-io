/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';


import { TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import moment from 'moment';

import './taxes.css';

class TaxTableRow extends React.Component {

  constructor(props) {
    super(props);

    this.navigateToEditLink = this.navigateToEditLink.bind(this);
    this.disabledText = this.disabledText.bind(this);
  }

  navigateToEditLink(taxId) {
    browserHistory.push(`tax/${taxId}`);
  }

  disabledText(taxDisabledState) {
    return taxDisabledState
      ? 'mdl-color-text--grey'
      : '';
  }

  render() {
    const { tax, deactivate, ...otherProps } = this.props; // eslint-disable-line
    const parsedLastUpdatedDate = moment(tax.lastUpdatedDate).format('MMM DD, YYYY');
    const parsedCreatedDate = moment(tax.createdDate).format('MMM DD, YYYY');

    const appliedTo = !tax.taxTypeID ? //eslint-disable-line no-nested-ternary
      'Everything' :
      (tax.items.length > 1) ?
        `${tax.items.length} Items` :
        `${tax.items.length} Item`;

    return (
      <TableRow>
        <TableRowColumn className={this.disabledText(tax.disabled)}>{tax.taxName}</TableRowColumn>
        <TableRowColumn className={this.disabledText(tax.disabled)}>{`${tax.value.toFixed(2)} %`}</TableRowColumn>
        <TableRowColumn className={this.disabledText(tax.disabled)}>{appliedTo}</TableRowColumn>
        <TableRowColumn className={this.disabledText(tax.disabled)}>{parsedCreatedDate}</TableRowColumn>
        <TableRowColumn className={this.disabledText(tax.disabled)}>{parsedLastUpdatedDate}</TableRowColumn>
        <TableRowColumn>
          <div styleName="inline-button">
            <FlatButton label="Edit" onClick={() => this.navigateToEditLink(tax.taxID)} />
          </div>
        </TableRowColumn>
        <TableRowColumn>
          <div styleName="inline-button">
            <RaisedButton label="Deactivate" secondary onClick={() => deactivate(tax.taxID)} />
          </div>
        </TableRowColumn>
      </TableRow>
    );
  }
}

TaxTableRow.propTypes = {
  tax: PropTypes.object.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default TaxTableRow;
