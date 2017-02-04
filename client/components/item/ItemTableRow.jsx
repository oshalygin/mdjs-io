import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { Link } from 'react-router';
import moment from 'moment';

export function disabledText(itemDisabledState) {
  return itemDisabledState
    ? 'mdl-color-text--grey'
    : '';
}

const ItemTableRow = ({ item, checked, deactivate }) => { //eslint-disable-line
  const tableRowAlignment = {
    verticalAlign: 'middle',
    textAlign: 'center'
  };
  const alignLeft = {
    ...tableRowAlignment,
    textAlign: 'left'
  };

  const parsedLastUpdatedDate = moment(item.lastUpdatedDate).format('MMM DD, YYYY - hh:mm A');
  const editLink = `item/${item.itemID}`;
  return (
    <TableRow key={item.itemID}>
      <TableRowColumn>{item.photoURL}</TableRowColumn>
      <TableRowColumn className={disabledText(item.disabled)}>{item.label}</TableRowColumn>
      <TableRowColumn className={disabledText(item.disabled)}>$ {item.price}</TableRowColumn>
      <TableRowColumn className={disabledText(item.disabled)}>{parsedLastUpdatedDate}</TableRowColumn>
      <TableRowColumn style={alignLeft}>
        <Link to={editLink} disabled={item.disabled} className="mdl-button mdl-js-button mdl-button--primary">
          Edit
                </Link>
        <button disabled={item.disabled} className="mdl-button mdl-js-button mdl-button--accent" onClick={deactivate} name={item.itemID}>
          Deactivate
                </button>
      </TableRowColumn>
    </TableRow>
  );
};

ItemTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  checked: PropTypes.func.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default ItemTableRow;
