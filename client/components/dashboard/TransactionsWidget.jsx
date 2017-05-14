import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import Pill from '../common/pill';

import { numberToLocaleStringWithoutDecimals } from '../../utilities/currencyUtility';
import { percentageOf } from '../../utilities/calculationsUtility';

import styles from './dashboard.css';

const TransactionsWidget = ({ creditCardTransactions, cashTransactions }) => {

  const total = creditCardTransactions + cashTransactions;
  const decimalPlaces = 0;

  const creditCardPercentage = percentageOf(creditCardTransactions, total, decimalPlaces);
  const cashPercentage = percentageOf(cashTransactions, total, decimalPlaces);

  return (
    <div className={styles['transactions-widget-container']}>
      <div className={styles['widget-content']}>
        <div className={styles['widget-heading-container']}>
          <div className={styles['widget-title']}>
            Transactions
        </div>
          <div className={styles['date-pill']}>
            <Pill label="Today" />
          </div>
        </div>
        <div className={styles['widget-details']}>
          <div className={styles['transaction-widget-details']}>
            <div className={styles['transaction-widget-content-value']}>
              {numberToLocaleStringWithoutDecimals(creditCardTransactions)}
            </div>
            <div className={styles['transaction-widget-content-value']}>
              {numberToLocaleStringWithoutDecimals(cashTransactions)}
            </div>
          </div>
          <div className={styles['transaction-widget-details']}>
            <div className={styles['transaction-content-subtext']}>
              <strong>{creditCardPercentage}</strong> Credit Card
            </div>
            <div className={styles['transaction-content-subtext']}>
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

export default CSSModules(TransactionsWidget, styles);
