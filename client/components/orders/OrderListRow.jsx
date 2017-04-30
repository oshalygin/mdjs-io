/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';

import { getOrderStatusDescription } from '../../utilities/orderStatusUtility';
import { numberToLocaleString } from '../../utilities/currencyUtility';

import styles from './orders.css';

const OrderListRow = ({ order }) => {

  const parsedCreatedDate = moment(order.createdDate).format('MMM DD, YYYY');
  const orderStatusDescription = getOrderStatusDescription(order.orderStatusID);

  return (
    <div className={styles['list-row-container']}>
      <div className={styles['first-section']}>{parsedCreatedDate}</div>
      <div className={styles['second-section']}>{orderStatusDescription}</div>
      <div className={styles['third-section']}>{numberToLocaleString(order.total)}</div>
      <div className={styles['fourth-section']}>{numberToLocaleString(order.totalTax)}</div>
    </div>
  );
};


OrderListRow.propTypes = {
  order: PropTypes.object.isRequired
};

export default CSSModules(OrderListRow, styles);
