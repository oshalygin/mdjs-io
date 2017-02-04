/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import moment from 'moment';

import styles from './item.scss';

export function disabledText(itemDisabledState) {
  return itemDisabledState
    ? 'mdl-color-text--grey'
    : '';
}

function navigateToEditLink(itemId) {
  browserHistory.push(`item/${itemId}`);
}

const ItemTableRow = ({ key, item, checked, deactivate }) => { //eslint-disable-line

  const parsedLastUpdatedDate = moment(item.lastUpdatedDate).format('MMM DD, YYYY - hh:mm A');
  return (
    <TableRow key={key} selected={item.checked}>
      <TableRowColumn>{item.itemID}</TableRowColumn>
      <TableRowColumn className={disabledText(item.disabled)}>{item.label}</TableRowColumn>
      <TableRowColumn className={disabledText(item.disabled)}>$ {item.price}</TableRowColumn>
      <TableRowColumn className={disabledText(item.disabled)}>{parsedLastUpdatedDate}</TableRowColumn>
      <TableRowColumn>
        <div className={styles['inline-button']}>
          <FlatButton label="Edit" onClick={() => navigateToEditLink(item.itemID)} />
        </div>
        <div className={styles['inline-button']}>
          <RaisedButton label="Deactivate" secondary onClick={() => deactivate(item.itemID)} />
        </div>
      </TableRowColumn>
    </TableRow>
  );
};

ItemTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  checked: PropTypes.func.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default CSSModules(ItemTableRow, styles);
