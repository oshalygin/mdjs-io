import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/orderActions';

import { getLastNumberOfMonthsArray } from '../../../utilities/dateTimeUtilities';

import MonthlyChart from './MonthlyChart.jsx';

import styles from './monthlySummary.css';

const defaultNumberOfMonths = 8;

class MonthlySummary extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const months = getLastNumberOfMonthsArray(defaultNumberOfMonths); //eslint-disable-line no-unused-vars
  }

  render() {
    const { data } = this.props;
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
            <MonthlyChart data={data} />
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
  data: PropTypes.array.isRequired,
  orderActions: PropTypes.object.isRequired
};

function mapStateToProps() {
  const months = getLastNumberOfMonthsArray(defaultNumberOfMonths); //eslint-disable-line no-unused-vars

  const data = months
    .slice()
    .reverse()
    .map(month => {
      return {
        name: month.displayName,
        'sales volume': Math.floor(Math.random() * 10000),
        'sales total': Math.floor(Math.random() * 10000)
      };
    });

  return {
    data
  };
}
function mapDispatchToProps(dispatch) {

  return {
    orderActions: bindActionCreators(actionCreators, dispatch)
  };
}


export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(MonthlySummary), styles);
