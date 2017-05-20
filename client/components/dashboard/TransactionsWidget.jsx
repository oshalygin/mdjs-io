import React from 'react';
import PropTypes from 'prop-types';


import Pill from '../common/pill';

import { numberToLocaleStringWithoutDecimals } from '../../utilities/currencyUtility';
import { percentageOf } from '../../utilities/calculationsUtility';

import './dashboard.css';

const TransactionsWidget = ({ creditCardTransactions, cashTransactions }) => {

  const total = creditCardTransactions + cashTransactions;
  const decimalPlaces = 0;

  const creditCardPercentage = percentageOf(creditCardTransactions, total, decimalPlaces);
  const cashPercentage = percentageOf(cashTransactions, total, decimalPlaces);

  return (
    <div styleName="transactions-widget-container">
      <div styleName="widget-content">
        <div styleName="widget-heading-container">
          <div styleName="widget-title">
            Transactions
        </div>
          <div styleName="date-pill">
            <Pill label="Today" />
          </div>
        </div>
        <div styleName="widget-details">
          <div styleName="transaction-widget-details">
            <div styleName="transaction-widget-content-value">
              {numberToLocaleStringWithoutDecimals(creditCardTransactions)}
            </div>
            <div styleName="transaction-widget-content-value">
              {numberToLocaleStringWithoutDecimals(cashTransactions)}
            </div>
          </div>
          <div styleName="transaction-widget-details">
            <div styleName="transaction-content-subtext">
              <strong>{creditCardPercentage}</strong> Credit Card
            </div>
            <div styleName="transaction-content-subtext">
              <strong>{cashPercentage}</strong> Cash
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TransactionsWidget.propTypes = {
  creditCardTransactions: PropTypes.number,
  cashTransactions: PropTypes.number
};

export default TransactionsWidget;
