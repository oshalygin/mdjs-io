import React from 'react';
import PropTypes from 'prop-types';

import dateFns from 'date-fns';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/orderActions';

import { getLastNumberOfMonthsArray } from '../../../utilities/dateTimeUtilities';
import { numberToLocaleString } from '../../../utilities/currencyUtility';
import {
  monthlyAverage,
  yearToDateTotal,
} from '../../../utilities/ordersUtility';

import MonthlyChart from './MonthlyChart.jsx';
import Spinner from '../../common/spinner';
import ProgressBar from '../../common/progressBar';

import './monthlySummary.css';

const defaultNumberOfMonths = 12;

class MonthlySummary extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDate: dateFns.format(new Date(), 'MM/DD/YYYY'),
    };

    this.getProgressBarPercentage = this.getProgressBarPercentage.bind(this);
  }

  componentWillMount() {
    const { orderActions } = this.props;
    const months = getLastNumberOfMonthsArray(defaultNumberOfMonths);
    orderActions.getMonthlySummary(months);
  }

  getProgressBarPercentage(current, total) {
    const salesProgressBarPercentageValue = current / total * 100;
    const salesProgressBarPercentage = Number(
      salesProgressBarPercentageValue.toFixed(0),
    );

    if (salesProgressBarPercentage > 100) {
      return 100;
    }

    return salesProgressBarPercentage || 0;
  }

  render() {
    const {
      data,
      orderAverage,
      loading,
      currentMonthSales,
      currentMonthCount,
      monthAverage,
      monthAverageCount,
      yearToDate,
    } = this.props;
    const { currentDate } = this.state;
    const salesBarPercentage = this.getProgressBarPercentage(
      currentMonthSales,
      monthAverage,
    );
    const salesCountBarPercentage = this.getProgressBarPercentage(
      currentMonthCount,
      monthAverageCount,
    );

    const monthlyChart = loading
      ? <div styleName="chart-spinner-container">
          <Spinner />
        </div>
      : <MonthlyChart data={data} />;

    return (
      <div styleName="sales-volume-container">
        <div styleName="summary-container-heading">
          <div styleName="sales-summary-title">
            <div styleName="title-heading">Monthly Sales Volume</div>
            <div styleName="title-subheading">Number of orders</div>
          </div>
          <div styleName="sales-summary-totals">
            <div styleName="sales-summary-total-text">
              Year-To-Date Sales:
              <strong>{numberToLocaleString(yearToDate)}</strong>
            </div>
            <div styleName="sales-summary-total-text">
              Average Sale Amount:
              <strong>{numberToLocaleString(orderAverage)}</strong>
            </div>
          </div>
        </div>
        <div styleName="sales-summary-chart-container">
          <div styleName="sales-summary-chart">
            {monthlyChart}
          </div>
          <div styleName="sales-summary-chart-legend">
            <div styleName="current-monthly-sales-container">
              <div styleName="progress-bar-text-container">
                <div styleName="progress-bar-primary-text">
                  {numberToLocaleString(currentMonthSales)}
                </div>
                <div styleName="progress-bar-subtext">
                  Total sales this month
                </div>
              </div>
              <ProgressBar min={0} max={100} value={salesBarPercentage} />
            </div>
            <div styleName="current-monthly-sales-container">
              <div styleName="progress-bar-text-container">
                <div styleName="progress-bar-primary-text">
                  {currentMonthCount}
                </div>
                <div styleName="progress-bar-subtext">
                  Number of orders this month
                </div>
              </div>
              <ProgressBar min={0} max={100} value={salesCountBarPercentage} />
            </div>
            <div styleName="date-container">
              <div styleName="date-icon">
                <i className="material-icons" style={{ fontSize: '18px' }}>
                  schedule
                </i>
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
  orderAverage: PropTypes.number.isRequired,
  yearToDate: PropTypes.number.isRequired,
  currentMonthSales: PropTypes.number.isRequired,
  monthAverage: PropTypes.number.isRequired,
  monthAverageCount: PropTypes.number.isRequired,
  currentMonthCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  orderActions: PropTypes.object.isRequired,
};

export function mapStateToProps(state) {
  const monthlySalesExist = state.orders.monthlySummary.length;

  if (monthlySalesExist) {
    const monthlySummary = state.orders.monthlySummary;
    const currentMonthIndex = 0;

    const currentMonthSalesValue =
      state.orders.monthlySummary[currentMonthIndex].total;

    const currentMonthSales = Number(Number(currentMonthSalesValue).toFixed(2));

    const monthAverage = monthlyAverage(monthlySummary, 'total');
    const monthAverageCount = monthlyAverage(monthlySummary, 'orderCount');
    const yearToDate = yearToDateTotal(monthlySummary);

    return {
      data: monthlySummary.slice().reverse().map(month => {
        return {
          name: month.monthDisplayName,
          'sales volume': Number(Number(month.total).toFixed(2)),
          'sales total': Number(month.orderCount),
        };
      }),
      yearToDate,
      currentMonthCount:
        state.orders.monthlySummary[currentMonthIndex].orderCount,
      currentMonthSales,
      monthAverage,
      monthAverageCount,
      orderAverage: state.orders.orderAverage,
      loading: state.loading.loadingMonthlySummary,
    };
  }

  return {
    data: null,
    orderAverage: state.orders.orderAverage,
    currentMonthCount: 0,
    currentMonthSales: 0,
    monthAverage: 0,
    yearToDate: 0,
    monthAverageCount: 0,
    loading: state.loading.loadingMonthlySummary,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlySummary);
