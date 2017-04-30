/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import {
  Card,
  CardHeader,
  CardText
} from 'material-ui/Card';

import OrderListRow from './OrderListRow.jsx';

import styles from './orders.css';

const OrderListCard = ({ order, orderDetail, onExpandChange }) => {

  const expanded = order.orderID === orderDetail.orderID;
  return (
    <Card
      expanded={expanded}
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
      <CardText expandable>
        Foobar
      </CardText>
    </Card >
  );
};

OrderListCard.propTypes = {
  order: PropTypes.object.isRequired,
  orderDetail: PropTypes.object.isRequired,
  onExpandChange: PropTypes.func.isRequired
};

export default CSSModules(OrderListCard, styles);
