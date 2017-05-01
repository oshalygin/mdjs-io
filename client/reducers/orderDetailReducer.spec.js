import { expect } from 'chai';
import * as actionTypes from '../actions/actionTypes';
import reducer from './orderDetailReducer';


describe('Reducer - OrderDetail', () => {

  const getInitialState = () => {
    return [];
  };

  const order = {
    companyID: 1,
    orderID: 1,
    createdBy: 1,
    createdDate: '2016-07-10T10:05:29.403',
    customer: null,
    customerID: 0,
    customerName: '',
    dueDate: null,
    email: '',
    giftCards: null,
    items: [
      {
        orderID: 4,
        orderItemID: 11,
        quantity: 1,
        item: {
          itemID: 0,
          itemCategoryID: 0,
          name: 'Custom Item',
          label: '',
          color: 0,
          count: 0,
          addedCount: 0,
          barcode: '',
          photoURL: '',
          price: 65,
          priceTypeID: 0,
          isShowPhoto: false,
          isTrackInventory: true,
          sku: '',
          modifiers: [],
          itemFlags: 0,
          file: null,
          lastUpdatedDate: '0001-01-01T00:00:00',
          createdDate: '0001-01-01T00:00:00',
          lastUpdatedBy: 0,
          createdBy: 0,
          isActive: false,
          companyID: 0,
          facilityID: 0
        },
        totalSub: 65,
        totalDiscount: 0,
        totalTax: 0,
        total: 65,
        orderItemStatusID: 110,
        notes: '',
        modifierList: [],
        taxList: [],
        discountList: []
      }
    ],
    latitude: 0,
    longitude: 0,
    notes: '',
    orderStatusDescription: 'Refunded',
    orderStatusID: 110,
    orderTypeID: 0,
    phoneNumber: '',
    total: 0,
    totalDiscount: 0,
    totalSub: 0,
    totalTax: 0,
    totalTip: 0,
    transactions: [
      {
        transactionID: 4,
        transactionTypeID: 1,
        transactionStatusID: 4,
        signatureURL: '',
        orderID: 4,
        totalAmount: 65,
        tipAmount: 0,
        taxAmount: 0,
        ipAddress: '',
        creditCardDetail: null,
        parentTransactionID: 0,
        response: null,
        parentTransaction: null,
        gatewayID: 0,
        createdDate: '2016-07-10T10:05:29.547',
        createdBy: 1
      },
      {
        transactionID: 965,
        transactionTypeID: 10,
        transactionStatusID: 1,
        signatureURL: '',
        orderID: 4,
        totalAmount: 65,
        tipAmount: 0,
        taxAmount: 0,
        ipAddress: '',
        creditCardDetail: null,
        parentTransactionID: 4,
        response: null,
        parentTransaction: {
          transactionID: 4,
          transactionTypeID: 1,
          transactionStatusID: 4,
          signatureURL: '',
          orderID: 4,
          totalAmount: 65,
          tipAmount: 0,
          taxAmount: 0,
          ipAddress: '',
          creditCardDetail: null,
          parentTransactionID: 0,
          response: null,
          parentTransaction: null,
          gatewayID: 0,
          createdDate: '2016-07-10T10:05:29.547',
          createdBy: 1
        },
        gatewayID: 0,
        createdDate: '2017-04-16T17:41:40.367',
        createdBy: 1
      }
    ]
  };

  it('should retrieve the initial state if the action type is not registered with the reducer', () => {

    const action = {
      type: 'UNKNOWN'
    };

    const expected = getInitialState();
    const actual = reducer(getInitialState(), action); //eslint-disable-line no-undefined

    expect(actual).to.deep.equal(expected);
  });

  it('should hydrate the state with the orderDetail in the action', () => {

    const action = {
      type: actionTypes.LOAD_ORDER_DETAIL_SUCCESS,
      order
    };

    const expected = order;
    const actual = reducer(undefined, action); //eslint-disable-line no-undefined

    expect(actual).deep.equals(expected);

  });

});
