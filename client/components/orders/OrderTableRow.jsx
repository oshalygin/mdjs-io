/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';

import { TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import { getOrderStatusDescription } from '../../utilities/orderStatusUtility';
import { numberToLocaleString } from '../../utilities/currencyUtility';

import styles from './orders.css';

class OrderTableRow extends React.Component {

  constructor(props) {
    super(props);

    this.navigateToDetailView = this.navigateToDetailView.bind(this);
  }

  navigateToDetailView(orderId) {
    browserHistory.push(`order/${orderId}`);
  }

  render() {
    const { order } = this.props;
    const parsedCreatedDate = moment(order.createdDate).format('MMM DD, YYYY');
    const orderStatusDescription = getOrderStatusDescription(order.orderStatusID);


    return (
      <TableRow>
        <TableRowColumn>{parsedCreatedDate}</TableRowColumn>
        <TableRowColumn>{orderStatusDescription}</TableRowColumn>
        <TableRowColumn>{numberToLocaleString(order.total)}</TableRowColumn>
        <TableRowColumn>{numberToLocaleString(order.totalTax)}</TableRowColumn>
        <TableRowColumn />
        <TableRowColumn />
        <TableRowColumn>
          <div className={styles['inline-button']}>
            <FlatButton label="View" onClick={() => this.navigateToDetailView(order.orderID)} />
          </div>
        </TableRowColumn>
      </TableRow>
    );
  }
}

OrderTableRow.propTypes = {
  order: PropTypes.object.isRequired
};

export default CSSModules(OrderTableRow, styles);
