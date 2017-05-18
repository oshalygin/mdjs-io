/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import { TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import moment from 'moment';

import styles from './modifiers.css';

class ModifierTableRow extends React.Component {

  constructor(props) {
    super(props);

    this.navigateToEditLink = this.navigateToEditLink.bind(this);
    this.disabledText = this.disabledText.bind(this);
  }

  navigateToEditLink(modifierId) {
    browserHistory.push(`modifier/${modifierId}`);
  }

  disabledText(modifierDisabledState) {
    return modifierDisabledState
      ? 'mdl-color-text--grey'
      : '';
  }

  render() {
    const { modifier, deactivate, ...otherProps } = this.props; // eslint-disable-line
    const parsedLastUpdatedDate = moment(modifier.lastUpdatedDate).format('MMM DD, YYYY');
    const parsedCreatedDate = moment(modifier.createdDate).format('MMM DD, YYYY');

    const appliedTo = !modifier.items.length ? //eslint-disable-line no-nested-ternary
      'None' :
      (modifier.items.length > 1) ?
        `${modifier.items.length} Items` :
        `${modifier.items.length} Item`;

    return (
      <TableRow>
        <TableRowColumn className={this.disabledText(modifier.disabled)}>{modifier.modifierName}</TableRowColumn>
        <TableRowColumn className={this.disabledText(modifier.disabled)}>{`$ ${modifier.modifierPrice.toFixed(2)}`}</TableRowColumn>
        <TableRowColumn className={this.disabledText(modifier.disabled)}>{appliedTo}</TableRowColumn>
        <TableRowColumn className={this.disabledText(modifier.disabled)}>{parsedCreatedDate}</TableRowColumn>
        <TableRowColumn className={this.disabledText(modifier.disabled)}>{parsedLastUpdatedDate}</TableRowColumn>
        <TableRowColumn>
          <div className={styles['inline-button']}>
            <FlatButton label="Edit" onClick={() => this.navigateToEditLink(modifier.modifierID)} />
          </div>
        </TableRowColumn>
        <TableRowColumn>
          <div className={styles['inline-button']}>
            <RaisedButton label="Deactivate" secondary onClick={() => deactivate(modifier.modifierID)} />
          </div>
        </TableRowColumn>
      </TableRow>
    );
  }
}

ModifierTableRow.propTypes = {
  modifier: PropTypes.object.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default CSSModules(ModifierTableRow, styles);
