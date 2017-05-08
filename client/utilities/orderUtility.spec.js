import { expect } from 'chai';
import { getOrderStatusDescription, mapOrderSummary } from './ordersUtility';

describe('Order Status Utility', () => {

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

  it('should map the order summary with the monthly display value of "Feb"', () => {

    const expected = 'Feb';
    const actual = mapOrderSummary(orderData, dateString)
      .monthDisplayName;
    expect(actual).equals(expected);

  });

});
