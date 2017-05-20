import React from 'react';
import PropTypes from 'prop-types';


import dateFns from 'date-fns';
import { numberToLocaleString } from '../../../utilities/currencyUtility';
import { getOrderStatusDescription } from '../../../utilities/ordersUtility';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/orderActions';

import Spinner from '../../common/spinner';
import OrderDetailItemList from './OrderDetailItemList.jsx';

import './orderDetail.css';

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
        <div styleName="spinner-container">
          <div styleName="spinner">
            <Spinner size={30} thickness={3} />
          </div>
        </div>
      ) :
      (
        <div styleName="order-detail-container">
          <div styleName="order-detail-background-container" style={{
            height: `${(orderDetail.items.length * 8) + 55}rem`
          }}>
            <div styleName="order-detail-inner-container">
              <div styleName="order-number-label">
                Order number:
              </div>
              <div styleName="order-date-label">
                Date placed:
              </div>
              <div styleName="order-number">
                {orderDetail.orderID}
              </div>
              <div styleName="order-date">
                {datePlaced}
              </div>
              <div styleName="customer-label">
                Customer:
              </div>
              <div styleName="status-label">
                Status:
              </div>
              <div styleName="customer-name">
                {customerName}
              </div>
              <div styleName="status-value" style={{ color: statusColor }}>
                {status}
              </div>
              <OrderDetailItemList items={orderDetail.items} />
              <div styleName="order-summary-pre" />
              <div styleName="order-summary-container">
                <div styleName="order-summary-label">
                  Order Base Subtotal:
                </div>
                <div styleName="order-summary-value">
                  {`${numberToLocaleString(orderDetail.totalSub)}`}
                </div>
                <div styleName="order-summary-label">
                  Discounts:
                </div>
                <div styleName="order-summary-discount-value">
                  {`( ${numberToLocaleString(orderDetail.totalDiscount)})`}
                </div>
                <div styleName="order-summary-label">
                  Taxes:
                </div>
                <div styleName="order-summary-value">
                  {`${numberToLocaleString(orderDetail.totalTax)}`}
                </div>
                <div styleName="order-summary-label">
                  Tips:
                </div>
                <div styleName="order-summary-value">
                  {`${numberToLocaleString(orderDetail.totalTip)}`}
                </div>
                <div styleName="order-summary-label">
                  Total:
                </div>
                <div styleName="order-summary-value">
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
