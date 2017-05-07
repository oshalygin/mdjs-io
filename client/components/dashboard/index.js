import React from 'react';

import MonthlySummary from './monthlySummary';

class Dashboard extends React.Component {

  render() {
    return (
      <div className="m-t-lg">
        <MonthlySummary />
        <small>
          This is an application skeleton while it's being built out.  Many changes to come, keep getting latest!
        </small>
      </div>
    );
  }
}

export default Dashboard;
