import React from 'react';
import CSSModules from 'react-css-modules';

import MonthlySummary from './monthlySummary';
import SalesWidget from './SalesWidget.jsx';

import styles from './dashboard.css';

class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <div className={styles['widget-container']}>
          <SalesWidget
            currentSales={1304}
            yesterdaysSales={1500}
          />
        </div>
        <div className="m-t-lg">
          <MonthlySummary />
          <small>
            This is an application skeleton while it's being built out.  Many changes to come, keep getting latest!
        </small>
        </div>
      </div>
    );
  }
}

export default CSSModules(Dashboard, styles);
