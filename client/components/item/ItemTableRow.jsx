/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import moment from 'moment';

import styles from './item.css';

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
    return itemDisabledState
      ? 'mdl-color-text--grey'
      : '';
  }

  render() {
    const { item, checked, deactivate, ...otherProps } = this.props; // eslint-disable-line
    const parsedLastUpdatedDate = moment(item.lastUpdatedDate).format('MMM DD, YYYY - hh:mm A');
    
    return (
      <TableRow selected={item.checked} {...otherProps}>
        {otherProps.children[0] /* checkbox passed down from Table-Body*/}
        <TableRowColumn>{item.itemID}</TableRowColumn>
        <TableRowColumn className={this.disabledText(item.disabled)}>{item.label}</TableRowColumn>
        <TableRowColumn className={this.disabledText(item.disabled)}>$ {item.price}</TableRowColumn>
        <TableRowColumn className={this.disabledText(item.disabled)}>{parsedLastUpdatedDate}</TableRowColumn>
        <TableRowColumn>
          <div className={styles['inline-button']}>
            <FlatButton label="Edit" onClick={() => this.navigateToEditLink(item.itemID)} />
          </div>
          <div className={styles['inline-button']}>
            <RaisedButton label="Deactivate" secondary onClick={() => deactivate(item.itemID)} />
          </div>
        </TableRowColumn>
      </TableRow>
    );
  }
}

ItemTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  checked: PropTypes.func.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default CSSModules(ItemTableRow, styles);
