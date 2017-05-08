import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/orderActions';

import { getLastNumberOfMonthsArray } from '../../../utilities/dateTimeUtilities';

import MonthlyChart from './MonthlyChart.jsx';
import Spinner from '../../common/spinner';

import styles from './monthlySummary.css';

const defaultNumberOfMonths = 8;

class MonthlySummary extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const { orderActions } = this.props;
    const months = getLastNumberOfMonthsArray(defaultNumberOfMonths);
    orderActions.getMonthlySummary(months);
  }

  render() {
    const { data, loading } = this.props;

    const monthlyChart = loading ?
      (<div className={styles['chart-spinner-container']}>
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
            Line graphs
          </div>
        </div>
      </div>
    );
  }
}

MonthlySummary.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  orderActions: PropTypes.object.isRequired
};

export function mapStateToProps(state) {

  const data = !state.orders.monthlySummary.length ?
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

  return {
    data,
    loading: state.loading.loadingMonthlySummary
  };
}
function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(MonthlySummary), styles);
