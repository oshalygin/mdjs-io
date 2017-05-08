/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';

import { getOrderStatusDescription } from '../../utilities/ordersUtility';
import { numberToLocaleString } from '../../utilities/currencyUtility';

import styles from './orders.css';

const OrderListRow = ({ order }) => {

  const parsedCreatedDate = moment(order.createdDate).format('MMM DD, YYYY');
  const orderStatusDescription = getOrderStatusDescription(order.orderStatusID);
  const statusColor = order.orderStatusID < 100 ?
    '#5CB85C' : '#F44336';

  return (
    <div className={styles['list-row-container']}
      style={{
        fontWeight: order.expanded ? 'bold' : 'normal'
      }}>
      <div className={styles['first-section']}>{order.orderID}</div>
      <div className={styles['second-section']}>{parsedCreatedDate}</div>
      <div className={styles['third-section']} style={{ color: '#F44336' }}>
        {!!order.totalDiscount && `( ${numberToLocaleString(order.totalDiscount)})`}
      </div>
      <div className={styles['fourth-section']} >{numberToLocaleString(order.totalTax)}</div>
      <div className={styles['fifth-section']}>{numberToLocaleString(order.total)}</div>
      <div className={styles['sixth-section']} style={{ color: statusColor }}>{orderStatusDescription}</div>
    </div>
  );
};


OrderListRow.propTypes = {
  order: PropTypes.object.isRequired
};

export default CSSModules(OrderListRow, styles);
