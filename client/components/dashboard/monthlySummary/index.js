import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/orderActions';

import { getLastNumberOfMonthsArray } from '../../../utilities/dateTimeUtilities';
import { numberToLocaleString } from '../../../utilities/currencyUtility';
import { monthlyAverage } from '../../../utilities/ordersUtility';

import MonthlyChart from './MonthlyChart.jsx';
import Spinner from '../../common/spinner';
import ProgressBar from '../../common/progressBar';

import styles from './monthlySummary.css';

const defaultNumberOfMonths = 8;

class MonthlySummary extends React.Component {

  constructor() {
    super();
    this.state = {};

    this.getSalesProgressBarPercentage = this.getSalesProgressBarPercentage.bind(this);
  }

  componentWillMount() {
    const { orderActions } = this.props;
    const months = getLastNumberOfMonthsArray(defaultNumberOfMonths);
    orderActions.getMonthlySummary(months);
  }

  getSalesProgressBarPercentage() {

    const { currentMonthSales, monthAverage } = this.props;
    const salesProgressBarPercentageValue = (currentMonthSales / monthAverage) * 100;
    const salesProgressBarPercentage = Number(salesProgressBarPercentageValue.toFixed(0));

    if (salesProgressBarPercentage > 100) {
      return 100;
    }

    return salesProgressBarPercentage || 0;
  }


  render() {
    const { data, loading, currentMonthSales } = this.props;
    const salesBarPercentage = this.getSalesProgressBarPercentage();

    const monthlyChart = loading ?
      (
        <div className={styles['chart-spinner-container']}>
          <Spinner />
        </div>
      ) :
      (<MonthlyChart data={data} />);

    return (
      <div className={styles['sales-volume-container']}>
        <div className={styles['summary-container-heading']}>
          <div className={styles['sales-summary-title']}>
            <div className={styles['title-heading']}>
              Monthly Sales Volume
            </div>
            <div className={styles['title-subheading']}>
              Number of orders
            </div>
          </div>
          <div className={styles['sales-summary-totals']}>
            <div className={styles['sales-summary-total-text']}>
              Year-To-Date Sales: <strong>$153,300.00</strong>
            </div>
            <div className={styles['sales-summary-total-text']}>
              Average Sale Amount: <strong>$32.30</strong>
            </div>
          </div>
        </div>
        <div className={styles['sales-summary-chart-container']}>
          <div className={styles['sales-summary-chart']}>
            {monthlyChart}
          </div>
          <div className={styles['sales-summary-chart-legend']}>
            <div className={styles['current-monthly-sales-container']}>
              <div className={styles['progress-bar-text-container']}>
                <div className={styles['progress-bar-primary-text']}>
                  {numberToLocaleString(currentMonthSales)}
                </div>
                <div className={styles['progress-bar-subtext']}>
                  Total sales this month
                </div>
              </div>
              <ProgressBar
                min={0}
                max={100}
                value={salesBarPercentage}
              />
            </div>
            <div className={styles['current-monthly-sales-container']}>
              <div className={styles['progress-bar-text-container']}>
                <div className={styles['progress-bar-primary-text']}>
                  482
                </div>
                <div className={styles['progress-bar-subtext']}>
                  Number of orders this month
                </div>
              </div>
              <ProgressBar
                min={0}
                max={100}
                value={40}
              />
            </div>
            <div className={styles['date-container']}>
              <div className={styles['date-icon']}>
                <i className="material-icons" style={{ fontSize: '18px' }}>schedule</i>
              </div>
              Updated on 01/01/2017
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MonthlySummary.propTypes = {
  data: PropTypes.array,
  currentMonthSales: PropTypes.number.isRequired,
  monthAverage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  orderActions: PropTypes.object.isRequired
};

export function mapStateToProps(state) {

  const monthlySalesExist = !state.orders.monthlySummary.length;
  const data = monthlySalesExist ?
    null :
    state.orders.monthlySummary
      .slice()
      .reverse()
      .map(month => {
        return {
          name: month.monthDisplayName,
          'sales volume': Number(Number(month.total).toFixed(2)),
          'sales total': Number(month.orderCount)
        };
      });

  const currentMonthSalesValue = monthlySalesExist ?
    0 :
    state.orders
      .monthlySummary[0]
      .total;

  const currentMonthSales = Number(Number(currentMonthSalesValue).toFixed(2));

  const monthAverage = monthlyAverage(state.orders.monthlySummary);

  return {
    data,
    currentMonthSales,
    monthAverage,
    loading: state.loading.loadingMonthlySummary
  };
}

function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(MonthlySummary), styles);
