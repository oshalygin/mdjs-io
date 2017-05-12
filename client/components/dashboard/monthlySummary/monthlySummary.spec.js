import { shallow } from 'enzyme';
import React from 'react';

import MonthlySummary, { mapStateToProps } from './index';
import MonthlyChart from './MonthlyChart.jsx';

import Spinner from '../../common/spinner';
import ProgressBar from '../../common/progressBar';

import { expect } from 'chai';

describe('<MonthlySummary />', () => {

  const props = {
    data: [],
    orderActions: {
      getMonthlySummary() { }
    },
    loading: false
  };

  it('should set the title heading to "Monthly Sales Volume"', () => {

    const expected = 'Monthly Sales Volume';
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find('.title-heading')
      .text();

    expect(actual).equals(expected);

  });

  it('should set the title subheading to "Number of orders"', () => {

    const expected = 'Number of orders';
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find('.title-subheading')
      .text();

    expect(actual).equals(expected);

  });

  it('should contain a material icon, "schedule" which represents the updated date', () => {

    const expected = 'schedule';
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find('.material-icons')
      .text();

    expect(actual).equals(expected);

  });

  it('should contain two <ProgressBar />  components to represent the monthly sales summary', () => {

    const expected = 2;
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find(ProgressBar)
      .length;

    expect(actual).equals(expected);

  });

  it('should contain a <MonthlyChart /> component', () => {

    const expected = 1;
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find(MonthlyChart)
      .length;

    expect(actual).equals(expected);

  });

  it('should render a <Spinner /> component if the loading prop is true', () => {

    const expected = 1;
    const updatedProps = {
      ...props,
      loading: true
    };

    const wrapper = shallow(<MonthlySummary.WrappedComponent {...updatedProps} />);
    const actual = wrapper.find(Spinner)
      .length;

    expect(actual).equals(expected);

  });

  it('should set data to null if the monthlySummary array length is falsy', () => {

    const expected = null;
    const state = {
      loading: {
        loadingMonthlySummary: false
      },
      orders: {
        monthlySummary: []
      }
    };

    const actual = mapStateToProps(state)
      .data;

    expect(actual).equals(expected);

  });

  it('should set loading prop to the loadingMonthlySummary property of loading in the store', () => {

    const expected = true;
    const state = {
      loading: {
        loadingMonthlySummary: true
      },
      orders: {
        monthlySummary: []
      }
    };

    const actual = mapStateToProps(state)
      .loading;

    expect(actual).equals(expected);

  });

  it('should set data property to an array of monthlySales', () => {

    const expected = 2;
    const state = {
      loading: {
        loadingMonthlySummary: true
      },
      orders: {
        monthlySummary: [{
          monthDisplayName: 'Jan',
          total: 40.38,
          orderCount: 4
        },
        {
          monthDisplayName: 'Feb',
          total: 80.38,
          orderCount: 8
        }]
      }
    };

    const actual = mapStateToProps(state)
      .data.length;

    expect(actual).equals(expected);

  });

});
