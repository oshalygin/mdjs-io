import React from 'react';
import PropTypes from 'prop-types';

import OrderDetailItemListRow from './OrderDetailItemListRow.jsx';

import './orderDetail.css';

const OrderDetailItemList = ({ items }) => {
  return (
    <div styleName="item-container">
      <div styleName="item-heading">Item(s):</div>
      <div styleName="item-heading">Name:</div>
      <div styleName="item-heading">Qty:</div>
      <div styleName="item-heading">Base Price:</div>
      <div styleName="item-heading">Discount(s):</div>
      <div styleName="item-heading">Tax(es):</div>
      <div styleName="item-price-heading">Price:</div>
      {items.map((item, index) =>
        <OrderDetailItemListRow item={item} key={index} />,
      )}
    </div>
  );
};

OrderDetailItemList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default OrderDetailItemList;
