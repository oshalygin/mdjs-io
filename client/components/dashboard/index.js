import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/orderActions';

import { cashTransactionTypeId, creditCardTransactionTypeId } from '../../utilities/ordersUtility';

import MonthlySummary from './monthlySummary';
import SalesWidget from './SalesWidget.jsx';
import OrdersWidget from './OrdersWidget.jsx';
import TransactionsWidget from './TransactionsWidget.jsx';
import InventoryWidget from './InventoryWidget.jsx';

import './dashboard.css';

class Dashboard extends React.Component {

  render() {
    const {
      yesterdaysSales,
      todaysSales,
      yesterdaysCount,
      todaysCount,
      todaysCashTransactionSales,
      todaysCreditCardTransactionSales
    } = this.props;

    return (
      <div className="row">
        <div className="col-lg-12">
          <div styleName="widget-container">
            <SalesWidget
              currentSales={todaysSales}
              yesterdaysSales={yesterdaysSales}
            />
            <OrdersWidget
              yesterdaysOrders={yesterdaysCount}
              currentOrders={todaysCount}
            />
            <TransactionsWidget
              creditCardTransactions={todaysCreditCardTransactionSales}
              cashTransactions={todaysCashTransactionSales}
            />
            <InventoryWidget />
          </div>
          <div className="m-t-lg">
            <MonthlySummary />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  orderActions: PropTypes.object.isRequired,
  yesterdaysSales: PropTypes.number.isRequired,
  todaysSales: PropTypes.number.isRequired,
  yesterdaysCount: PropTypes.number.isRequired,
  todaysCount: PropTypes.number.isRequired,
  todaysCashTransactionSales: PropTypes.number.isRequired,
  todaysCreditCardTransactionSales: PropTypes.number.isRequired
};

export function mapStateToProps(state) {

  const yesterdaysSales = state.orders.yesterdaysOrders
    .reduce((previous, next) => {
      return previous + next.total;
    }, 0);

  const todaysSales = state.orders.todaysOrders
    .reduce((previous, next) => {
      return previous + next.total;
    }, 0);

  const yesterdaysCount = state.orders.yesterdaysOrders.length;
  const todaysCount = state.orders.todaysOrders.length;

  const todaysCashTransactionSales = state.orders.todaysOrders
    .filter(order => order.transactionTypeID === cashTransactionTypeId)
    .reduce((previous, next) => {
      return previous + next.total;
    }, 0);

  const todaysCreditCardTransactionSales = state.orders.todaysOrders
    .filter(order => order.transactionTypeID === creditCardTransactionTypeId)
    .reduce((previous, next) => {
      return previous + next.total;
    }, 0);

  return {
    yesterdaysSales,
    todaysSales,
    yesterdaysCount,
    todaysCount,
    todaysCashTransactionSales,
    todaysCreditCardTransactionSales
  };
}

function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
