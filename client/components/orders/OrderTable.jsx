import React, { PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn
} from 'material-ui/Table';

import OrderTableRow from './OrderTableRow.jsx';

const OrderTable = ({ orders }) => {
  return (
    <div className="table-responsive">
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Total Amount</TableHeaderColumn>
            <TableHeaderColumn>Tax Amount</TableHeaderColumn>
            <TableHeaderColumn>Customer Email</TableHeaderColumn>
            <TableHeaderColumn>Customer Phone</TableHeaderColumn>
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody showRowHover>
          {orders.map((order, index) => {
            return (
              <OrderTableRow key={index} order={order} />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

OrderTable.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrderTable;
