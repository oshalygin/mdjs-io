import React from 'react';
import PropTypes from 'prop-types';

import Pill from '../common/pill';

import { percentDifference } from '../../utilities/calculationsUtility';

import './dashboard.css';
import colors from '../../styles/colors';

const OrdersWidget = ({ currentOrders, yesterdaysOrders }) => {
  const isTrendingDown = currentOrders < yesterdaysOrders;

  const trendingStyle = isTrendingDown
    ? { color: colors.error }
    : { color: colors.green };

  const trendingArrowComponent = isTrendingDown
    ? <i className="material-icons">arrow_downward</i>
    : <i className="material-icons">arrow_upward</i>;

  const decimalPlaces = 0;
  const percentageDifference = percentDifference(
    currentOrders,
    yesterdaysOrders,
    decimalPlaces,
  );

  return (
    <div styleName="orders-widget-container">
      <div styleName="widget-content">
        <div styleName="widget-heading-container">
          <div styleName="widget-title">Orders</div>
          <div styleName="date-pill">
            <Pill label="Today" />
          </div>
        </div>
        <div styleName="widget-details">
          <div styleName="widget-content-value">
            {currentOrders}
          </div>
          <div styleName="percent-change-subtext" style={trendingStyle}>
            {percentageDifference}
          </div>
          <div
            styleName="trending-arrow"
            style={{
              ...trendingStyle,
              lineHeight: '3.4rem',
            }}
          >
            {trendingArrowComponent}
          </div>
          <div styleName="widget-content-subtext">Change from yesterday</div>
        </div>
      </div>
    </div>
  );
};

OrdersWidget.propTypes = {
  currentOrders: PropTypes.number,
  yesterdaysOrders: PropTypes.number,
};

export default OrdersWidget;
