/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import moment from 'moment';

import styles from './categories.css';

class CategoriesTableRow extends React.Component {

  constructor(props) {
    super(props);

    this.navigateToEditLink = this.navigateToEditLink.bind(this);
    this.disabledText = this.disabledText.bind(this);
  }

  navigateToEditLink(categoryId) {
    browserHistory.push(`category/${categoryId}`);
  }

  disabledText(categoryDisabledState) {
    return categoryDisabledState
      ? 'mdl-color-text--grey'
      : '';
  }

  render() {
    const { category, deactivate, ...otherProps } = this.props; // eslint-disable-line
    const parsedLastUpdatedDate = moment(category.lastUpdatedDate).format('MMM DD, YYYY - hh:mm A');
    const parsedCreatedDate = moment(category.createdDate).format('MMM DD, YYYY - hh:mm A');

    return (
      <TableRow>
        <TableRowColumn className={this.disabledText(category.disabled)}>{category.categoryName}</TableRowColumn>
        <TableRowColumn className={this.disabledText(category.disabled)}>{parsedCreatedDate}</TableRowColumn>
        <TableRowColumn className={this.disabledText(category.disabled)}>{parsedLastUpdatedDate}</TableRowColumn>
        <TableRowColumn>
          <div className={styles['inline-button']}>
            <FlatButton label="Edit" onClick={() => this.navigateToEditLink(category.categoryID)} />
          </div>
        </TableRowColumn>
        <TableRowColumn>
          <div className={styles['inline-button']}>
            <RaisedButton label="Deactivate" secondary onClick={() => deactivate(category.categoryID)} />
          </div>
        </TableRowColumn>
      </TableRow>
    );
  }
}

CategoriesTableRow.propTypes = {
  category: PropTypes.object.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default CSSModules(CategoriesTableRow, styles);
