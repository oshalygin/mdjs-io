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
