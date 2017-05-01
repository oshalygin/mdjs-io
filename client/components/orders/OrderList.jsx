import React, { PropTypes } from 'react';

import OrderListCard from './OrderListCard.jsx';

import styles from './orders.css';

const OrderList = ({ orders, onExpandChange }) => {

  return (
    <div className="table-responsive">
      <div className={styles['headers-container']}>
        <div className={styles['first-section']}>OrderID</div>
        <div className={styles['second-section']}>Date</div>
        <div className={styles['third-section']}>Discounts</div>
        <div className={styles['fourth-section']}>Taxes</div>
        <div className={styles['fifth-section']}>Total</div>
        <div className={styles['sixth-section']}>Status</div>
      </div>

      <div>
        {orders
          .map(order => {
            return (
              <OrderListCard
                key={order.orderID}
                onExpandChange={onExpandChange}
                order={order} />);
          })}
      </div>
    </div>
  );
};

OrderList.propTypes = {
  orders: PropTypes.array.isRequired,
  onExpandChange: PropTypes.func.isRequired
};

export default OrderList;
