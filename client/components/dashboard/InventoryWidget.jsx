import React from 'react';
import CSSModules from 'react-css-modules';

import Pill from '../common/pill';

import styles from './dashboard.css';

const InventoryWidget = ({ }) => {

  return (
    <div className={styles['inventory-widget-container']}>
      <div className={styles['widget-content']}>
        <div className={styles['widget-heading-container']}>
          <div className={styles['widget-title']}>
            Inventory
        </div>
          <div className={styles['date-pill']}>
            <Pill label="Today" />
          </div>
          <div className={styles['widget-details']} />
        </div>
      </div>
    </div>
  );
};

export default CSSModules(InventoryWidget, styles);
