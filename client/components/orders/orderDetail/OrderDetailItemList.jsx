import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import OrderDetailItemListRow from './OrderDetailItemListRow.jsx';

import styles from './orderDetail.css';

const OrderDetailItemList = ({ items }) => {
  return (
    <div className={styles['item-container']}>
      <div className={styles['item-heading']}>
        Item(s):
      </div>
      <div className={styles['item-heading']}>
        Name:
      </div>
      <div className={styles['item-heading']}>
        Qty:
      </div>
      <div className={styles['item-heading']}>
        Base Price:
      </div>
      <div className={styles['item-heading']}>
        Discount(s):
      </div>
      <div className={styles['item-heading']}>
        Tax(es):
      </div>
      <div className={styles['item-price-heading']}>
        Price:
      </div>
      {items.map((item, index) => (<OrderDetailItemListRow item={item} key={index} />))}
    </div>
  );
};

OrderDetailItemList.propTypes = {
  items: PropTypes.array.isRequired
};

export default CSSModules(OrderDetailItemList, styles);
