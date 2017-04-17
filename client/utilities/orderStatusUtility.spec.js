import { expect } from 'chai';
import { getOrderStatusDescription } from './orderStatusUtility';

describe('Order Status Utility', () => {
  
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

  it('should return an empty string when passing in a statusId that doesnt map to anything', () => {

    const orderStatusId = 1337;
    const expected = '';
    const actual = getOrderStatusDescription(orderStatusId);
    expect(actual).equals(expected);

  });

});
