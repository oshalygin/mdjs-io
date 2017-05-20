import React from 'react';
import PropTypes from 'prop-types';


import Pill from '../common/pill';

import { numberToLocaleStringWithoutDecimals } from '../../utilities/currencyUtility';
import { percentDifference } from '../../utilities/calculationsUtility';

import './dashboard.css';
import colors from '../../styles/colors';

const SalesWidget = ({ currentSales, yesterdaysSales }) => {

  const isTrendingDown = currentSales < yesterdaysSales;

  const trendingStyle = isTrendingDown ?
    { color: colors.error } :
    { color: colors.green };

  const trendingArrowComponent = isTrendingDown ?
    (<i className="material-icons">arrow_downward</i>) :
    (<i className="material-icons">arrow_upward</i>);

  const decimalPlaces = 0;
  const percentageDifference = percentDifference(currentSales, yesterdaysSales, decimalPlaces);

  return (
    <div styleName="sales-widget-container">
      <div styleName="widget-content">
        <div styleName="widget-heading-container">
          <div styleName="widget-title">
            Sales
        </div>
          <div styleName="date-pill">
            <Pill label="Today" />
          </div>
        </div>
        <div styleName="widget-details">
          <div styleName="widget-content-value">
            {numberToLocaleStringWithoutDecimals(currentSales)}
          </div>
          <div styleName="percent-change-subtext" style={trendingStyle}>
            {percentageDifference}
          </div>
          <div styleName="trending-arrow" style={{
            ...trendingStyle,
            lineHeight: '3.4rem'
          }}>
            {trendingArrowComponent}
          </div>
          <div styleName="widget-content-subtext">
            Change from yesterday
          </div>
        </div>
      </div>
    </div>
  );
};

SalesWidget.propTypes = {
  currentSales: PropTypes.number,
  yesterdaysSales: PropTypes.number
};

export default SalesWidget;
