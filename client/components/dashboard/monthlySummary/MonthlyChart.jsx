import React, { PropTypes } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import CSSModules from 'react-css-modules';
import { numberToLocaleString } from '../../../utilities/currencyUtility';

import styles from './monthlySummary.css';

export const currencyFormatter = (salesVolumeAmount) => numberToLocaleString(salesVolumeAmount);

const MonthlyChart = ({ data }) => {

  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSalesVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#03a9f4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#03a9f4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSalesTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          padding={{ left: 10 }}
          dataKey="name" />
        <YAxis
          dataKey="sales volume"
          width={100}
          tickFormatter={currencyFormatter}
          name="sales volume" />
        <Tooltip
          wrapperStyle={{
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
            borderRadius: '5px'
          }}
        />
        <Area
          type="monotone"
          formatter={currencyFormatter}
          dataKey="sales volume"
          stroke="#03a9f4"
          fillOpacity={1}
          fill="url(#colorSalesVolume)" />
        <Area
          type="monotone"
          dataKey="sales total"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorSalesTotal)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

MonthlyChart.propTypes = {
  data: PropTypes.array
};

export default CSSModules(MonthlyChart, styles);
