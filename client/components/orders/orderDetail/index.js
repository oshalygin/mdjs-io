import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import dateFns from 'date-fns';
import { numberToLocaleString } from '../../../utilities/currencyUtility';
import { getOrderStatusDescription } from '../../../utilities/ordersUtility';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/orderActions';

import Spinner from '../../common/spinner';
import OrderDetailItemList from './OrderDetailItemList.jsx';

import styles from './orderDetail.css';

class OrderDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      orderDetails: props.orderDetail
    };
  }

  render() {
    const { orderDetail, loading } = this.props;
    
    const datePlaced = `${dateFns.format(new Date(orderDetail.createdDate), 'MMM DD, YYYY HH:mm:ss A')} PDT`;
    const customerName = !!orderDetail.customerName ? orderDetail.customerName : 'No name provided';
    const status = getOrderStatusDescription(orderDetail.orderStatusID);
    const statusColor = orderDetail.orderStatusID < 100 ?
      '#5CB85C' : '#F44336';

    const component = loading ?
      (
        <div className={styles['spinner-container']}>
          <div className={styles.spinner}>
            <Spinner size={30} thickness={3} />
          </div>
        </div>
      ) :
      (
        <div className={styles['order-detail-container']}>
          <div className={styles['order-detail-background-container']} style={{
            height: `${(orderDetail.items.length * 8) + 55}rem`
          }}>
            <div className={styles['order-detail-inner-container']}>
              <div className={styles['order-number-label']}>
                Order number:
              </div>
              <div className={styles['order-date-label']}>
                Date placed:
              </div>
              <div className={styles['order-number']}>
                {orderDetail.orderID}
              </div>
              <div className={styles['order-date']}>
                {datePlaced}
              </div>
              <div className={styles['customer-label']}>
                Customer:
              </div>
              <div className={styles['status-label']}>
                Status:
              </div>
              <div className={styles['customer-name']}>
                {customerName}
              </div>
              <div className={styles['status-value']} style={{ color: statusColor }}>
                {status}
              </div>
              <OrderDetailItemList items={orderDetail.items} />
              <div className={styles['order-summary-pre']} />
              <div className={styles['order-summary-container']}>
                <div className={styles['order-summary-label']}>
                  Order Base Subtotal:
                </div>
                <div className={styles['order-summary-value']}>
                  {`${numberToLocaleString(orderDetail.totalSub)}`}
                </div>
                <div className={styles['order-summary-label']}>
                  Discounts:
                </div>
                <div className={styles['order-summary-discount-value']}>
                  {`( ${numberToLocaleString(orderDetail.totalDiscount)})`}
                </div>
                <div className={styles['order-summary-label']}>
                  Taxes:
                </div>
                <div className={styles['order-summary-value']}>
                  {`${numberToLocaleString(orderDetail.totalTax)}`}
                </div>
                <div className={styles['order-summary-label']}>
                  Tips:
                </div>
                <div className={styles['order-summary-value']}>
                  {`${numberToLocaleString(orderDetail.totalTip)}`}
                </div>
                <div className={styles['order-summary-label']}>
                  Total:
                </div>
                <div className={styles['order-summary-value']}>
                  {`${numberToLocaleString(orderDetail.total)}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    return component;
  }
}

OrderDetail.propTypes = {
  orderDetail: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export function mapStateToProps(state) {

  return {
    orderDetail: state.orderDetail,
    loading: state.loading.loadingOrderDetail
  };
}
function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(OrderDetail), styles);
