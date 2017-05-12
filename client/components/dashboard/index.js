import React from 'react';
import CSSModules from 'react-css-modules';

import MonthlySummary from './monthlySummary';
import SalesWidget from './SalesWidget.jsx';
import OrdersWidget from './OrdersWidget.jsx';
import TransactionsWidget from './TransactionsWidget.jsx';
import InventoryWidget from './InventoryWidget.jsx';

import styles from './dashboard.css';

class Dashboard extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className={styles['widget-container']}>
            <SalesWidget
              currentSales={1304}
              yesterdaysSales={1500}
            />
            <OrdersWidget
              currentOrders={152}
              yesterdaysOrders={80}
            />
            <TransactionsWidget
              creditCardTransactions={480}
              cashTransactions={824}
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

export default CSSModules(Dashboard, styles);
