import React from 'react';
import PropTypes from 'prop-types';

import OrderListCard from './OrderListCard.jsx';

import './orders.css';

const OrderList = ({ orders, onExpandChange }) => {
  return (
    <div className="table-responsive">
      <div styleName="headers-container">
        <div styleName="first-section">OrderID</div>
        <div styleName="second-section">Date</div>
        <div styleName="third-section">Discounts</div>
        <div styleName="fourth-section">Taxes</div>
        <div styleName="fifth-section">Total</div>
        <div styleName="sixth-section">Status</div>
      </div>

      <div>
        {orders.map(order => {
          return (
            <OrderListCard
              key={order.orderID}
              onExpandChange={onExpandChange}
              order={order}
            />
          );
        })}
      </div>
    </div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
  onExpandChange: PropTypes.func.isRequired,
};

export default OrderList;
