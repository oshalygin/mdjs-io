/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import { TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

import './categories.css';

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
    return categoryDisabledState ? 'mdl-color-text--grey' : '';
  }

  render() {
    const { category, deactivate, ...otherProps } = this.props; // eslint-disable-line
    const parsedLastUpdatedDate = dateFns.format(
      category.lastUpdatedDate,
      'MMM DD, YYYY - hh:mm A',
    );
    const parsedCreatedDate = dateFns.format(
      category.createdDate,
      'MMM DD, YYYY - hh:mm A',
    );

    return (
      <TableRow>
        <TableRowColumn className={this.disabledText(category.disabled)}>
          {category.categoryName}
        </TableRowColumn>
        <TableRowColumn className={this.disabledText(category.disabled)}>
          {parsedCreatedDate}
        </TableRowColumn>
        <TableRowColumn className={this.disabledText(category.disabled)}>
          {parsedLastUpdatedDate}
        </TableRowColumn>
        <TableRowColumn>
          <div styleName="inline-button">
            <FlatButton
              label="Edit"
              onClick={() => this.navigateToEditLink(category.categoryID)}
            />
          </div>
        </TableRowColumn>
        <TableRowColumn>
          <div styleName="inline-button">
            <RaisedButton
              label="Deactivate"
              secondary
              onClick={() => deactivate(category.categoryID)}
            />
          </div>
        </TableRowColumn>
      </TableRow>
    );
  }
}

CategoriesTableRow.propTypes = {
  category: PropTypes.object.isRequired,
  deactivate: PropTypes.func.isRequired,
};

export default CategoriesTableRow;
