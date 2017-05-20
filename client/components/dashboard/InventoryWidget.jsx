import React from 'react';


import Pill from '../common/pill';

import './dashboard.css';

const InventoryWidget = ({ }) => {

  return (
    <div styleName="inventory-widget-container">
      <div styleName="widget-content">
        <div styleName="widget-heading-container">
          <div styleName="widget-title">
            Inventory
        </div>
          <div styleName="date-pill">
            <Pill label="Today" />
          </div>
          <div styleName="widget-details" />
        </div>
      </div>
    </div>
  );
};

export default InventoryWidget;
