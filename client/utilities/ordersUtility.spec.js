import { expect } from 'chai';
import {
  getOrderStatusDescription,
  mapOrderSummary,
  monthlyAverage,
  yearToDateTotal,
  orderAverage,
  flattenOrders
} from './ordersUtility';

describe('Order Status Utility', () => {

  const orders = [
    {
      orderID: 954,
      total: 10.99,
      createdDate: '2017-04-17T12:11:52.207',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 9.99,
      totalTax: 1.0,
      totalTip: 0.0
    }, {
      orderID: 942,
      total: 20.8725,
      createdDate: '2017-04-15T22:50:54',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 18.975,
      totalTax: 1.8975,
      totalTip: 0.0
    }, {
      orderID: 941,
      total: 6.6,
      createdDate: '2017-04-15T22:28:41',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 6.0,
      totalTax: 0.6,
      totalTip: 0.0
    }, {
      orderID: 940,
      total: 0.0,
      createdDate: '2017-04-15T22:01:02',
      orderStatusID: 110,
      orderStatusDescription: 'Refunded',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 0.0,
      totalTax: 0.0,
      totalTip: 0.0
    }, {
      orderID: 939,
      total: 0.0,
      createdDate: '2017-04-15T21:15:07',
      orderStatusID: 110,
      orderStatusDescription: 'Refunded',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 0.0,
      totalTax: 0.0,
      totalTip: 0.0
    }, {
      orderID: 928,
      total: 0.0,
      createdDate: '2017-04-15T15:07:37',
      orderStatusID: 110,
      orderStatusDescription: 'Refunded',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 0.0,
      totalTax: 0.0,
      totalTip: 0.0
    }, {
      orderID: 907,
      total: 9.878,
      createdDate: '2017-04-14T15:54:42',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 8.98,
      totalTax: 0.898,
      totalTip: 0.0
    }];

  const results = [
    { data: orders },
    { data: orders },
    { data: orders }
  ];

  const orderData = [{
    createdDate: '2017-02-18T11:30:05.133',
    orderID: 139,
    orderStatusID: 110,
    total: 50,
    totalDiscount: 1,
    totalSub: 0,
    totalTax: 10,
    totalTip: 0,
    transactionTypeID: 1
  },
  {
    createdDate: '2017-02-18T11:20:05.133',
    orderID: 140,
    orderStatusID: 110,
    total: 45,
    totalDiscount: 5,
    totalSub: 0,
    totalTax: 15,
    totalTip: 3,
    transactionTypeID: 1
  }];

  const dateString = '2-1-2017';

  it('should return "New" when passing in a statusId of 10', () => {

    const orderStatusId = 10;
    const expected = 'New';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should return "Authorized" when passing in a statusId of 20', () => {

    const orderStatusId = 20;
    const expected = 'Authorized';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should return "Paid" when passing in a statusId of 30', () => {

    const orderStatusId = 30;
    const expected = 'Paid';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should return "Fulfilled" when passing in a statusId of 40', () => {

    const orderStatusId = 40;
    const expected = 'Fulfilled';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should return "Cancelled" when passing in a statusId of 100', () => {

    const orderStatusId = 100;
    const expected = 'Cancelled';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should return "Refunded" when passing in a statusId of 110', () => {

    const orderStatusId = 110;
    const expected = 'Refunded';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should return "Payment Failed" when passing in a statusId of 120', () => {

    const orderStatusId = 120;
    const expected = 'Payment Failed';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should return "On Hold" when passing in a statusId of 210', () => {

    const orderStatusId = 210;
    const expected = 'On Hold';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should return "Fraud" when passing in a statusId of 220', () => {

    const orderStatusId = 220;
    const expected = 'Fraud';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should return "Payment Review" when passing in a statusId of 230', () => {

    const orderStatusId = 230;
    const expected = 'Payment Review';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should return an empty string when passing in a statusId that does not map to anything', () => {

    const orderStatusId = 1337;
    const expected = '';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

  it('should map the order summary with a total amount thats a sum of all of the orders', () => {

    const expected = 95;
    const actual = mapOrderSummary(orderData, dateString)
      .total;
    expect(actual).equals(expected);

  });

  it('should map the order summary with a total tax amount thats a sum of all of the orders taxes', () => {

    const expected = 25;
    const actual = mapOrderSummary(orderData, dateString)
      .totalTax;
    expect(actual).equals(expected);

  });

  it('should map the order summary with a total tip amount thats a sum of all of the orders tips', () => {

    const expected = 3;
    const actual = mapOrderSummary(orderData, dateString)
      .totalTip;
    expect(actual).equals(expected);

  });

  it('should map the order summary with a total discount amount thats a sum of all of the orders discounts', () => {

    const expected = 6;
    const actual = mapOrderSummary(orderData, dateString)
      .totalDiscount;
    expect(actual).equals(expected);

  });

  it('should map the order summary with a number of orders', () => {

    const expected = 2;
    const actual = mapOrderSummary(orderData, dateString)
      .orderCount;
    expect(actual).equals(expected);

  });

  it('should map the order summary with the month value', () => {

    const expected = 1;
    const actual = mapOrderSummary(orderData, dateString)
      .monthValue;
    expect(actual).equals(expected);

  });

  it('should map the order summary with the year', () => {

    const expected = 2017;
    const actual = mapOrderSummary(orderData, dateString)
      .year;
    expect(actual).equals(expected);

  });

  it('should map the order summary with the monthly display value of "February"', () => {

    const expected = 'February';

    const actual = mapOrderSummary(orderData, dateString)
      .monthDisplayName;
    expect(actual).equals(expected);

  });

  it('should calculate the average order amount accordingly', () => {

    const expected = 12.09;
    const actual = orderAverage(orders);

    expect(actual).equals(expected);

  });

  it('should calculate the average order amount as 0 if the list of orders is empty', () => {

    const expected = 0;
    const actual = orderAverage([]);

    expect(actual).equals(expected);

  });

  it('should calculate the monthly average based on the monthly summary passed in', () => {

    const expected = 60.38;
    const property = 'total';

    const monthlySummary = [{
      monthDisplayName: 'Jan',
      total: 40.38,
      orderCount: 4
    },
    {
      monthDisplayName: 'Feb',
      total: 80.38,
      orderCount: 8
    }];

    const actual = monthlyAverage(monthlySummary, property);

    expect(actual).equals(expected);

  });

  it('should flatten orders from the results array', () => {

    const expected = (orders.length) * results.length;
    const actual = flattenOrders(results)
      .length;
      
    expect(actual).equals(expected);

  });

  it('should flatten orders from the results array even if the results are all empty objects', () => {
    const updatedResults = [
      { data: [] },
      { data: [] },
      { data: [] }
    ];

    const expected = [];
    const actual = flattenOrders(updatedResults);
      
    expect(actual).deep.equals(expected);

  });

  it('should calculate the monthly average based on the monthly summary with a single item passed in', () => {

    const expected = 40.38;
    const property = 'total';

    const monthlySummary = [{
      monthDisplayName: 'Jan',
      total: 40.38,
      orderCount: 4
    }];

    const actual = monthlyAverage(monthlySummary, property);

    expect(actual).equals(expected);

  });

  it('should calculate the monthly average as 0 if there was an empty array passed in', () => {

    const expected = 0.00;
    const property = 'total';

    const monthlySummary = [];

    const actual = monthlyAverage(monthlySummary, property);

    expect(actual).equals(expected);

  });

  it('should calculate the total year to date amount based on the months that are within the current year', () => {

    const expected = 130.76;

    const monthlySummary = [
      {
        monthDisplayName: 'Dec',
        year: 2016,
        total: 40.38,
        orderCount: 4
      },
      {
        monthDisplayName: 'Jan',
        year: (new Date()).getFullYear(),
        total: 40.38,
        orderCount: 4
      },
      {
        monthDisplayName: 'Feb',
        year: (new Date()).getFullYear(),
        total: 90.38,
        orderCount: 4
      }];

    const actual = yearToDateTotal(monthlySummary);

    expect(actual).equals(expected);

  });

  it('should calculate the total year to date amount of 0 based on the months that are within the current year', () => {

    const expected = 0;

    const monthlySummary = [
      {
        monthDisplayName: 'Dec',
        year: 2016,
        total: 40.38,
        orderCount: 4
      },
      {
        monthDisplayName: 'Jan',
        year: 2013,
        total: 40.38,
        orderCount: 4
      },
      {
        monthDisplayName: 'Feb',
        year: 2015,
        total: 90.38,
        orderCount: 4
      }];

    const actual = yearToDateTotal(monthlySummary);

    expect(actual).equals(expected);

  });

});
