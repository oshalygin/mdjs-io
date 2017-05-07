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

import styles from './monthlySummary.css';

const MonthlyChart = ({ data }) => {
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSalesVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSalesTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="sales volume" stroke="#8884d8" fillOpacity={1} fill="url(#colorSalesVolume)" />
        <Area type="monotone" dataKey="sales total" stroke="#82ca9d" fillOpacity={1} fill="url(#colorSalesTotal)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

MonthlyChart.propTypes = {
  data: PropTypes.array.isRequired
};

export default CSSModules(MonthlyChart, styles);
