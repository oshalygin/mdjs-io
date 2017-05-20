/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';


import {
  Card,
  CardHeader,
  CardText
} from 'material-ui/Card';

import OrderListRow from './OrderListRow.jsx';
import OrderDetail from './orderDetail';

import './orders.css';

const OrderListCard = ({ order, onExpandChange }) => {

  return (
    <Card
      expanded={order.expanded}
      onExpandChange={() => onExpandChange(order.orderID)}
      style={{
        borderBottom: '1px solid rgb(224, 224, 224)'
      }}
    >
      <CardHeader
        children={<OrderListRow order={order} />}
        actAsExpander
        showExpandableButton
        style={{
          paddingBottom: '0px',
          paddingTop: '0px',
          height: '50px'
        }}
      />
      <CardText
        expandable
        style={{ padding: 0 }}
      >
        <OrderDetail />
      </CardText>
    </Card >
  );
};

OrderListCard.propTypes = {
  order: PropTypes.object.isRequired,
  onExpandChange: PropTypes.func.isRequired
};

export default OrderListCard;
