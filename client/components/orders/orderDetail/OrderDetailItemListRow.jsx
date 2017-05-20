import React from 'react';
import PropTypes from 'prop-types';


import { numberToLocaleString } from '../../../utilities/currencyUtility';
import { itemPriceTypes } from '../../../utilities/constants';

import ItemImage from '../../common/itemImage';

import './orderDetail.css';

const OrderDetailItemListRow = ({ item }) => {

  const priceTypeDescription = itemPriceTypes
    .find(priceType => priceType.value === item.item.priceTypeID)
    .label;

  return (
    <div styleName="item-list-row-container">
      <div styleName="item-list-row-image">
        <ItemImage
          itemId={item.item.itemID}
          imageId={item.item.photoURL}
          color={item.item.color}
          label={item.item.label} />
      </div>
      <div styleName="item-list-row-name">
        {item.item.name}
      </div>
      <div styleName="item-list-row-name">
        {item.quantity}
      </div>
      <div styleName="item-list-row-name">
        {`${numberToLocaleString(item.item.price)} / ${priceTypeDescription}`}
      </div>
      <div styleName="item-list-row-discount-container">
        {item.discountList.map((discount, index) => {

          const discountValue = discount.discountTypeID ?
            discount.value :
            ((discount.value * 0.01) * item.item.price);

          return (
            <div
              key={index}
              style={{
                position: 'relative',
                left: 0,
                top: `${16 * (item.discountList.length - 1)}`
              }}>
              {`( ${numberToLocaleString(discountValue)})`}
            </div>
          );
        })}
      </div>
      <div styleName="item-list-row-tax-container">
        {`${numberToLocaleString(item.totalTax)}`}
      </div>
      <div styleName="item-price">
        {`${numberToLocaleString(item.total)}`}
      </div>
    </div>
  );
};

OrderDetailItemListRow.propTypes = {
  item: PropTypes.object.isRequired
};

export default OrderDetailItemListRow;
