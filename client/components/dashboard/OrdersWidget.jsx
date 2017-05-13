import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import Pill from '../common/pill';

import { percentDifference } from '../../utilities/calculationsUtility';

import styles from './dashboard.css';
import colors from '../../styles/colors';

const OrdersWidget = ({ currentOrders, yesterdaysOrders }) => {

  const isTrendingDown = currentOrders < yesterdaysOrders;

  const trendingStyle = isTrendingDown ?
    { color: colors.error } :
    { color: colors.green };

  const trendingArrowComponent = isTrendingDown ?
    (<i className="material-icons">arrow_downward</i>) :
    (<i className="material-icons">arrow_upward</i>);

  const decimalPlaces = 0;
  const percentageDifference = percentDifference(currentOrders, yesterdaysOrders, decimalPlaces);

  return (
    <div className={styles['orders-widget-container']}>
      <div className={styles['widget-content']}>
        <div className={styles['widget-heading-container']}>
          <div className={styles['widget-title']}>
            Orders
        </div>
          <div className={styles['date-pill']}>
            <Pill label="Today" />
          </div>
        </div>
        <div className={styles['widget-details']}>
          <div className={styles['widget-content-value']}>
            {currentOrders}
          </div>
          <div className={styles['widget-content-subtext']}>
            Change from yesterday
          </div>
          <div className={styles['percent-change-subtext']} style={trendingStyle}>
            {percentageDifference}
          </div>
          <div className={styles['trending-arrow']} style={{
            ...trendingStyle,
            lineHeight: '3.4rem'
          }}>
            {trendingArrowComponent}
          </div>
        </div>
      </div>
    </div >
  );
};

OrdersWidget.propTypes = {
  currentOrders: PropTypes.number,
  yesterdaysOrders: PropTypes.number
};

export default CSSModules(OrdersWidget, styles);
