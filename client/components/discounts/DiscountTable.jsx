import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn
} from 'material-ui/Table';

import DiscountTableRow from './DiscountTableRow.jsx';

const DiscountTable = ({ discounts, deactivate }) => {
  return (
    <div className="table-responsive">
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Value</TableHeaderColumn>
            <TableHeaderColumn>Applied To</TableHeaderColumn>
            <TableHeaderColumn>Date Created</TableHeaderColumn>
            <TableHeaderColumn>Date Updated</TableHeaderColumn>
            <TableHeaderColumn />
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody showRowHover>
          {discounts.map((discount, index) => {
            return (
              <DiscountTableRow
                key={index}
                discount={discount}
                deactivate={deactivate}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

DiscountTable.propTypes = {
  discounts: PropTypes.array.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default DiscountTable;
