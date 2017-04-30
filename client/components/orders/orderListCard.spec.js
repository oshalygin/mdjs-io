import { shallow } from 'enzyme';
import {
  Card,
  CardHeader,
  CardText
} from 'material-ui/Card';

import sinon from 'sinon';

import React from 'react';
import OrderListCard from './OrderListCard.jsx';

import { expect } from 'chai';

describe('<OrderListCard />', () => {

  const props = {
    order: {
      orderID: 1,
      total: 9.87,
      createdDate: '2017-04-14T15:54:42',
      orderStatusID: 40,
      orderStatusDescription: 'Fulfilled',
      transactionTypeID: 1,
      totalDiscount: 0.0,
      totalSub: 8.98,
      totalTax: 0.89,
      totalTip: 0.0
    },
    onExpandChange() { },
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
    }
  };

  it('should contain a root <Card /> component', () => {

    const expected = 1;

    const wrapper = shallow(<OrderListCard {...props} />);
    const actual = wrapper.find(Card).length;

    expect(actual).equals(expected);

  });

  it('should contain a <CardHeader /> component', () => {

    const expected = 1;

    const wrapper = shallow(<OrderListCard {...props} />);
    const actual = wrapper.find(CardHeader).length;

    expect(actual).equals(expected);

  });

  it('should contain a <CardText /> component', () => {

    const expected = 1;

    const wrapper = shallow(<OrderListCard {...props} />);
    const actual = wrapper.find(CardText).length;

    expect(actual).equals(expected);

  });

  it('should call the onExpandedChange callback with the orderID', () => {

    const expected = true;
    const onExpandchangeSpy = sinon.spy();
    
    const updatedProps = {
      ...props,
      onExpandChange: onExpandchangeSpy
    };

    const wrapper = shallow(<OrderListCard {...updatedProps} />);
    wrapper.find(Card)
      .props()
      .onExpandChange();
    
    const actual = onExpandchangeSpy
      .calledWith(props.order.orderID);

    expect(actual).equals(expected);

  });

  it('should set the expanded prop to true if the orderID matches between the order and orderDetail', () => {

    const expected = true;

    const wrapper = shallow(<OrderListCard {...props} />);
    const actual = wrapper.find(Card).props().expanded;

    expect(actual).equals(expected);

  });

  it('should set the expanded prop to false if the orderID does not match between the order and orderDetail', () => {

    const expected = false;
    const updatedProps = {
      ...props, orderDetail: {
        ...props.orderDetail,
        orderID: 999
      }
    };

    const wrapper = shallow(<OrderListCard {...updatedProps} />);
    const actual = wrapper.find(Card).props().expanded;

    expect(actual).equals(expected);

  });


});
