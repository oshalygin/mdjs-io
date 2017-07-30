/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import { TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import ItemImage from '../common/itemImage';

import './item.css';

class ItemTableRow extends React.Component {
  constructor(props) {
    super(props);

    this.navigateToEditLink = this.navigateToEditLink.bind(this);
    this.disabledText = this.disabledText.bind(this);
  }

  navigateToEditLink(itemId) {
    browserHistory.push(`item/${itemId}`);
  }

  disabledText(itemDisabledState) {
    return itemDisabledState ? 'mdl-color-text--grey' : '';
  }

  render() {
    const { item, deactivate } = this.props;
    const parsedLastUpdatedDate = dateFns.format(
      item.lastUpdatedDate,
      'MMM DD, YYYY - hh:mm A',
    );

    return (
      <TableRow>
        <TableRowColumn style={{ paddingLeft: '1.25em' }}>
          <ItemImage
            itemId={item.itemID}
            imageId={item.photoURL}
            label={item.label}
            color={item.color}
            onClick={this.navigateToEditLink}
          />
        </TableRowColumn>
        <TableRowColumn className={this.disabledText(item.disabled)}>
          {item.name}
        </TableRowColumn>
        <TableRowColumn className={this.disabledText(item.disabled)}>
          $ {item.price}
        </TableRowColumn>
        <TableRowColumn className={this.disabledText(item.disabled)}>
          {parsedLastUpdatedDate}
        </TableRowColumn>
        <TableRowColumn>
          <div styleName="inline-button">
            <FlatButton
              label="Edit"
              onClick={() => this.navigateToEditLink(item.itemID)}
            />
          </div>
        </TableRowColumn>
        <TableRowColumn>
          <div styleName="inline-button">
            <RaisedButton
              label="Deactivate"
              secondary
              onClick={() => deactivate(item.itemID)}
            />
          </div>
        </TableRowColumn>
      </TableRow>
    );
  }
}

ItemTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  deactivate: PropTypes.func.isRequired,
};

export default ItemTableRow;
