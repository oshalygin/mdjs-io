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
      getMonthlySummary() {},
    },
    orderAverage: 10.22,
    loading: false,
    currentMonthSales: 60.34,
    monthAverage: 480.33,
    currentMonthCount: 5,
    monthAverageCount: 48,
    yearToDate: 30.99,
  };

  it('should set the title heading to "Monthly Sales Volume"', () => {
    const expected = 'Monthly Sales Volume';
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find('.title-heading').text();

    expect(actual).equals(expected);
  });

  it('should set the title subheading to "Number of orders"', () => {
    const expected = 'Number of orders';
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find('.title-subheading').text();

    expect(actual).equals(expected);
  });

  it('should contain a material icon, "schedule" which represents the updated date', () => {
    const expected = 'schedule';
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find('.material-icons').text();

    expect(actual).equals(expected);
  });

  it('should contain two <ProgressBar />  components to represent the monthly sales summary', () => {
    const expected = 2;
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find(ProgressBar).length;

    expect(actual).equals(expected);
  });

  it('should contain a <MonthlyChart /> component', () => {
    const expected = 1;
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find(MonthlyChart).length;

    expect(actual).equals(expected);
  });

  it('should render a <Spinner /> component if the loading prop is true', () => {
    const expected = 1;
    const updatedProps = {
      ...props,
      loading: true,
    };

    const wrapper = shallow(
      <MonthlySummary.WrappedComponent {...updatedProps} />,
    );
    const actual = wrapper.find(Spinner).length;

    expect(actual).equals(expected);
  });

  it('should set data to null if the monthlySummary array length is falsy', () => {
    const expected = null;
    const state = {
      loading: {
        loadingMonthlySummary: false,
      },
      orders: {
        monthlySummary: [],
      },
    };

    const actual = mapStateToProps(state).data;

    expect(actual).equals(expected);
  });

  it('should set loading prop to the loadingMonthlySummary property of loading in the store', () => {
    const expected = true;
    const state = {
      loading: {
        loadingMonthlySummary: true,
      },
      orders: {
        monthlySummary: [],
      },
    };

    const actual = mapStateToProps(state).loading;

    expect(actual).equals(expected);
  });

  it('should set data property to an array of monthlySales', () => {
    const expected = 2;
    const state = {
      loading: {
        loadingMonthlySummary: true,
      },
      orders: {
        monthlySummary: [
          {
            monthDisplayName: 'Jan',
            total: 40.38,
            orderCount: 4,
          },
          {
            monthDisplayName: 'Feb',
            total: 80.38,
            orderCount: 8,
          },
        ],
      },
    };

    const actual = mapStateToProps(state).data.length;

    expect(actual).equals(expected);
  });

  it('should set the average monthly amount to the average across all orders when mapping from the monthlySummary', () => {
    const expected = 60.38;
    const state = {
      loading: {
        loadingMonthlySummary: false,
      },
      orders: {
        monthlySummary: [
          {
            monthDisplayName: 'Jan',
            total: 40.38,
            orderCount: 4,
          },
          {
            monthDisplayName: 'Feb',
            total: 80.38,
            orderCount: 8,
          },
        ],
      },
    };

    const actual = mapStateToProps(state).monthAverage;

    expect(actual).equals(expected);
  });

  it('should set the average count amount to the average across all orders when mapping from the monthlySummary', () => {
    const expected = 6;
    const state = {
      loading: {
        loadingMonthlySummary: false,
      },
      orders: {
        monthlySummary: [
          {
            monthDisplayName: 'Jan',
            total: 40.38,
            orderCount: 4,
          },
          {
            monthDisplayName: 'Feb',
            total: 80.38,
            orderCount: 8,
          },
        ],
      },
    };

    const actual = mapStateToProps(state).monthAverageCount;

    expect(actual).equals(expected);
  });

  it('should set the monthlyAverage to 0 if no orders exist', () => {
    const expected = 0;
    const state = {
      loading: {
        loadingMonthlySummary: false,
      },
      orders: {
        monthlySummary: [],
      },
    };

    const actual = mapStateToProps(state).monthAverage;

    expect(actual).equals(expected);
  });

  it('should set the monthAverageCount to 0 if no orders exist', () => {
    const expected = 0;
    const state = {
      loading: {
        loadingMonthlySummary: false,
      },
      orders: {
        monthlySummary: [],
      },
    };

    const actual = mapStateToProps(state).monthAverageCount;

    expect(actual).equals(expected);
  });

  it('should set the current month sales amount accordingly', () => {
    const expected = 40.38;
    const state = {
      loading: {
        loadingMonthlySummary: false,
      },
      orders: {
        monthlySummary: [
          {
            monthDisplayName: 'Jan',
            total: 40.38,
            orderCount: 4,
          },
          {
            monthDisplayName: 'Feb',
            total: 80.38,
            orderCount: 8,
          },
        ],
      },
    };

    const actual = mapStateToProps(state).currentMonthSales;

    expect(actual).equals(expected);
  });

  it('should set the current month order count accordingly', () => {
    const expected = 4;
    const state = {
      loading: {
        loadingMonthlySummary: false,
      },
      orders: {
        monthlySummary: [
          {
            monthDisplayName: 'Jan',
            total: 40.38,
            orderCount: 4,
          },
          {
            monthDisplayName: 'Feb',
            total: 80.38,
            orderCount: 8,
          },
        ],
      },
    };

    const actual = mapStateToProps(state).currentMonthCount;

    expect(actual).equals(expected);
  });

  it('should set the current month sales amount to 0 if there are no sales in the store', () => {
    const expected = 0;
    const state = {
      loading: {
        loadingMonthlySummary: false,
      },
      orders: {
        monthlySummary: [],
      },
    };

    const actual = mapStateToProps(state).currentMonthSales;

    expect(actual).equals(expected);
  });

  it('should set the current month order count to 0 if there are no sales in the store', () => {
    const expected = 0;
    const state = {
      loading: {
        loadingMonthlySummary: false,
      },
      orders: {
        monthlySummary: [],
      },
    };

    const actual = mapStateToProps(state).currentMonthCount;

    expect(actual).equals(expected);
  });

  it('should set the sales progress bar percentage accordingly', () => {
    const expected = 11;

    const current = 6455;
    const total = 56478;

    const instance = shallow(
      <MonthlySummary.WrappedComponent {...props} />,
    ).instance();

    const actual = instance.getProgressBarPercentage(current, total);

    expect(actual).equals(expected);
  });

  it('should set the sales progress bar percentage to 0 if the value is NaN', () => {
    const expected = 0;
    const current = 0;
    const total = 'foobar';

    const instance = shallow(
      <MonthlySummary.WrappedComponent {...props} />,
    ).instance();

    const actual = instance.getProgressBarPercentage(current, total);

    expect(actual).equals(expected);
  });

  it('should set the sales progress bar percentage to 100 if the value exceeds the monthly average', () => {
    const expected = 100;
    const current = 100;
    const total = 30;

    const instance = shallow(
      <MonthlySummary.WrappedComponent {...props} />,
    ).instance();

    const actual = instance.getProgressBarPercentage(current, total);

    expect(actual).equals(expected);
  });

  it('should set the sales progress bar percentage as the value', () => {
    const expected = 13;

    const wrapper = shallow(
      <MonthlySummary.WrappedComponent {...props} />,
    ).find(ProgressBar);

    const actual = wrapper.at(0).props().value;

    expect(actual).equals(expected);
  });

  it('should set the order progress bar percentage as the value', () => {
    const expected = 10;

    const wrapper = shallow(
      <MonthlySummary.WrappedComponent {...props} />,
    ).find(ProgressBar);

    const actual = wrapper.at(1).props().value;

    expect(actual).equals(expected);
  });

  it('should set the date on the component from the current state', () => {
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const instance = wrapper.instance();

    const expected = `scheduleUpdated on ${instance.state.currentDate}`;

    const actual = wrapper.find('.date-container').text();

    expect(actual).equals(expected);
  });

  it('should set the year to date sales amount from props', () => {
    const expected = 'Year-To-Date Sales: $ 30.99';
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find('.sales-summary-total-text').at(0).text();

    expect(actual).equals(expected);
  });

  it('should set the average sales amount from props', () => {
    const expected = 'Average Sale Amount: $ 10.22';
    const wrapper = shallow(<MonthlySummary.WrappedComponent {...props} />);
    const actual = wrapper.find('.sales-summary-total-text').at(1).text();

    expect(actual).equals(expected);
  });
});
