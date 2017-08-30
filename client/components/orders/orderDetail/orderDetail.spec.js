import { shallow } from 'enzyme';

import React from 'react';
import OrderDetail from './index.js';
import Spinner from '../../common/spinner';

describe('<OrderDetail />', () => {
  const props = {
    orderDetail: {
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
            facilityID: 0,
          },
          totalSub: 65,
          totalDiscount: 0,
          totalTax: 0,
          total: 65,
          orderItemStatusID: 110,
          notes: '',
          modifierList: [],
          taxList: [],
          discountList: [],
        },
      ],
      latitude: 0,
      longitude: 0,
      notes: '',
      orderStatusDescription: 'Refunded',
      orderStatusID: 110,
      orderTypeID: 0,
      phoneNumber: '',
      total: 75,
      totalDiscount: 0,
      totalSub: 30,
      totalTax: 40,
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
          createdBy: 1,
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
            createdBy: 1,
          },
          gatewayID: 0,
          createdDate: '2017-04-16T17:41:40.367',
          createdBy: 1,
        },
      ],
    },
    loading: false,
  };

  it('should contain a <Spinner /> component if the loading prop is true', () => {
    const expected = 1;
    const updatedProps = {
      ...props,
      loading: true,
    };

    const wrapper = shallow(<OrderDetail.WrappedComponent {...updatedProps} />);
    const actual = wrapper.find(Spinner).length;

    expect(actual).toEqual(expected);
  });

  it('should contain the orderID on the page', () => {
    const expected = `${props.orderDetail.orderID}`;

    const wrapper = shallow(<OrderDetail.WrappedComponent {...props} />);
    const actual = wrapper.find('.order-number').text();

    expect(actual).toEqual(expected);
  });

  it('should persist the status based on the orderStatusID', () => {
    const expected = 'Refunded';

    const wrapper = shallow(<OrderDetail.WrappedComponent {...props} />);
    const actual = wrapper.find('.status-value').text();

    expect(actual).toEqual(expected);
  });

  it('should persist the status color as red if its "Refunded"', () => {
    const expected = '#F44336';

    const wrapper = shallow(<OrderDetail.WrappedComponent {...props} />);
    const actual = wrapper.find('.status-value').props().style.color;

    expect(actual).toEqual(expected);
  });

  it('should persist the status color as green if its "Fulfilled"', () => {
    const expected = '#5CB85C';

    const updatedProps = {
      ...props,
      orderDetail: {
        ...props.orderDetail,
        orderStatusID: 10,
      },
    };

    const wrapper = shallow(<OrderDetail.WrappedComponent {...updatedProps} />);
    const actual = wrapper.find('.status-value').props().style.color;

    expect(actual).toEqual(expected);
  });

  it('should list the customer name as "No name provided" if the customerName flag is empty', () => {
    const expected = 'No name provided';

    const wrapper = shallow(<OrderDetail.WrappedComponent {...props} />);
    const actual = wrapper.find('.customer-name').text();

    expect(actual).toEqual(expected);
  });

  it('should list the customer name as is if the customerName exists', () => {
    const expected = 'Oleg';

    const updatedProps = {
      ...props,
      orderDetail: {
        ...props.orderDetail,
        customerName: 'Oleg',
      },
    };

    const wrapper = shallow(<OrderDetail.WrappedComponent {...updatedProps} />);
    const actual = wrapper.find('.customer-name').text();

    expect(actual).toEqual(expected);
  });

  it('should display the total amount on the page', () => {
    const expected = '$ 75.00';

    const wrapper = shallow(<OrderDetail.WrappedComponent {...props} />);
    const actual = wrapper.find('.order-summary-value').last().text();

    expect(actual).toEqual(expected);
  });
});
