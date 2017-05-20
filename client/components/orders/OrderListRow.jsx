/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';


import moment from 'moment';

import { getOrderStatusDescription } from '../../utilities/ordersUtility';
import { numberToLocaleString } from '../../utilities/currencyUtility';

import './orders.css';

const OrderListRow = ({ order }) => {

  const parsedCreatedDate = moment(order.createdDate).format('MMM DD, YYYY');
  const orderStatusDescription = getOrderStatusDescription(order.orderStatusID);
  const statusColor = order.orderStatusID < 100 ?
    '#5CB85C' : '#F44336';

  return (
    <div styleName="list-row-container"
      style={{
        fontWeight: order.expanded ? 'bold' : 'normal'
      }}>
      <div styleName="first-section">{order.orderID}</div>
      <div styleName="second-section">{parsedCreatedDate}</div>
      <div styleName="third-section" style={{ color: '#F44336' }}>
        {!!order.totalDiscount && `( ${numberToLocaleString(order.totalDiscount)})`}
      </div>
      <div styleName="fourth-section" >{numberToLocaleString(order.totalTax)}</div>
      <div styleName="fifth-section">{numberToLocaleString(order.total)}</div>
      <div styleName="sixth-section" style={{ color: statusColor }}>{orderStatusDescription}</div>
    </div>
  );
};


OrderListRow.propTypes = {
  order: PropTypes.object.isRequired
};

export default OrderListRow;
