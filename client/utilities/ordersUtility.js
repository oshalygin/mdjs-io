/* eslint-disable indent */
import dateFns from 'date-fns';

export function getOrderStatusDescription(orderStatusId) {
  const orderStatusEnum = [
    { id: 10, description: 'New' },
    { id: 20, description: 'Authorized' },
    { id: 30, description: 'Paid' },
    { id: 40, description: 'Fulfilled' },
    { id: 100, description: 'Cancelled' },
    { id: 110, description: 'Refunded' },
    { id: 120, description: 'Payment Failed' },
    { id: 210, description: 'On Hold' },
    { id: 220, description: 'Fraud' },
    { id: 230, description: 'Payment Review' }
  ];

  const orderStatus = orderStatusEnum.find(status => status.id === orderStatusId);

  return orderStatus ?
    orderStatus.description :
    '';
}

export function mapOrderSummary(orderData, dateString) {

  const date = new Date(dateString);
  const monthValue = date.getMonth();
  const year = date.getFullYear();
  const monthDisplayName = dateFns.format(new Date(year, monthValue, 1), 'MMMM');
  const orderCount = orderData.length;

  const monthSummary = orderData.reduce((previous, next) => {
    return {
      monthDisplayName: previous.monthDisplayName,
      monthValue: previous.monthValue,
      orderCount: previous.orderCount,
      year: previous.year,
      total: previous.total + next.total,
      totalDiscount: previous.totalDiscount + next.totalDiscount,
      totalTax: previous.totalTax + next.totalTax,
      totalTip: previous.totalTip + next.totalTip
    };
  }, {
      monthDisplayName,
      monthValue,
      orderCount,
      year,
      total: 0,
      totalDiscount: 0,
      totalTax: 0,
      totalTip: 0
    });

  return monthSummary;
}

export function monthlyAverage(monthlySummary) {

  const size = monthlySummary.length;
  
  if (!size) {
    return 0;
  }

  const totalSales = monthlySummary
    .reduce((previous, next) => {
      return previous + next.total;
    }, 0);

  const monthlyAverageValue = totalSales / size;
  const average = Number(monthlyAverageValue.toFixed(2));
  
  return average;
}
