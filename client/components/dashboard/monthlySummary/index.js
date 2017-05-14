import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import dateFns from 'date-fns';

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

const defaultNumberOfMonths = 12;

class MonthlySummary extends React.Component {

  constructor() {
    super();
    this.state = {
      currentDate: dateFns.format(new Date(), 'MM/DD/YYYY')
    };

    this.getProgressBarPercentage = this.getProgressBarPercentage.bind(this);
  }

  componentWillMount() {
    const { orderActions } = this.props;
    const months = getLastNumberOfMonthsArray(defaultNumberOfMonths);
    orderActions.getMonthlySummary(months);
  }

  getProgressBarPercentage(current, total) {

    const salesProgressBarPercentageValue = (current / total) * 100;
    const salesProgressBarPercentage = Number(salesProgressBarPercentageValue.toFixed(0));

    if (salesProgressBarPercentage > 100) {
      return 100;
    }

    return salesProgressBarPercentage || 0;
  }


  render() {

    const {
      data,
      loading,
      currentMonthSales,
      currentMonthCount,
      monthAverage,
      monthAverageCount
    } = this.props;
    const { currentDate } = this.state;
    const salesBarPercentage = this.getProgressBarPercentage(currentMonthSales, monthAverage);
    const salesCountBarPercentage = this.getProgressBarPercentage(currentMonthCount, monthAverageCount);

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
                  {currentMonthCount}
                </div>
                <div className={styles['progress-bar-subtext']}>
                  Number of orders this month
                </div>
              </div>
              <ProgressBar
                min={0}
                max={100}
                value={salesCountBarPercentage}
              />
            </div>
            <div className={styles['date-container']}>
              <div className={styles['date-icon']}>
                <i className="material-icons" style={{ fontSize: '18px' }}>schedule</i>
              </div>
              Updated on {currentDate}
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
  monthAverageCount: PropTypes.number.isRequired,
  currentMonthCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  orderActions: PropTypes.object.isRequired
};

export function mapStateToProps(state) {

  const monthlySalesExist = state.orders.monthlySummary.length;

  if (monthlySalesExist) {

    const currentMonthIndex = 0;

    const currentMonthSalesValue = state.orders
      .monthlySummary[currentMonthIndex]
      .total;

    const currentMonthSales = Number(Number(currentMonthSalesValue).toFixed(2));

    const monthAverage = monthlyAverage(state.orders.monthlySummary, 'total');
    const monthAverageCount = monthlyAverage(state.orders.monthlySummary, 'orderCount');


    return {
      data: state.orders.monthlySummary
        .slice()
        .reverse()
        .map(month => {
          return {
            name: month.monthDisplayName,
            'sales volume': Number(Number(month.total).toFixed(2)),
            'sales total': Number(month.orderCount)
          };
        }),
      currentMonthCount: state.orders
        .monthlySummary[currentMonthIndex]
        .orderCount,
      currentMonthSales,
      monthAverage,
      monthAverageCount,
      loading: state.loading.loadingMonthlySummary
    };
  }

  return {
    data: null,
    currentMonthCount: 0,
    currentMonthSales: 0,
    monthAverage: 0,
    monthAverageCount: 0,
    loading: state.loading.loadingMonthlySummary
  };

}

function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(MonthlySummary), styles);
