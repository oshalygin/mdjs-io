import React, { PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn
} from 'material-ui/Table';

import TaxTableRow from './TaxTableRow.jsx';

const TaxTable = ({ taxes, deactivate }) => {
  return (
    <div className="table-responsive">
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Tax Rate</TableHeaderColumn>
            <TableHeaderColumn>Applied To</TableHeaderColumn>
            <TableHeaderColumn>Date Created</TableHeaderColumn>
            <TableHeaderColumn>Date Updated</TableHeaderColumn>
            <TableHeaderColumn />
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody showRowHover>
          {taxes.map((tax, index) => {
            return (
              <TaxTableRow
                key={index}
                tax={tax}
                deactivate={deactivate}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

TaxTable.propTypes = {
  taxes: PropTypes.array.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default TaxTable;
