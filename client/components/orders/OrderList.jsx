import React, { PropTypes } from 'react';

import OrderListCard from './OrderListCard.jsx';

import styles from './orders.css';

const OrderTable = ({ orders, orderDetail, onExpandChange }) => {

  return (
    <div className="table-responsive">
      <div className={styles['headers-container']}>
        <div className={styles['first-section']}>Date</div>
        <div className={styles['second-section']}>Status</div>
        <div className={styles['third-section']}>Total</div>
        <div className={styles['fourth-section']}>Tax Amount</div>
        <div className={styles['fifth-section']}>Customer Email</div>
        <div className={styles['sixth-section']}>Customer Phone</div>
      </div>

      <div>
        {orders
          .map(order => {
            return (
              <OrderListCard
                key={order.orderID}
                onExpandChange={onExpandChange}
                orderDetail={orderDetail}
                order={order} />);
          })}
      </div>
    </div>
  );
};

OrderTable.propTypes = {
  orders: PropTypes.array.isRequired,
  orderDetail: PropTypes.object.isRequired,
  onExpandChange: PropTypes.func.isRequired
};

export default OrderTable;
