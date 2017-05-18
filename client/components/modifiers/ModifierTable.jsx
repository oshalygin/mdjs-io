import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn
} from 'material-ui/Table';

import ModifierTableRow from './ModifierTableRow.jsx';

const ModifierTable = ({ modifiers, deactivate }) => {
  return (
    <div className="table-responsive">
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Modifier Value</TableHeaderColumn>
            <TableHeaderColumn>Applied To</TableHeaderColumn>
            <TableHeaderColumn>Date Created</TableHeaderColumn>
            <TableHeaderColumn>Date Updated</TableHeaderColumn>
            <TableHeaderColumn />
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody showRowHover>
          {modifiers.map((modifier, index) => {
            return (
              <ModifierTableRow
                key={index}
                modifier={modifier}
                deactivate={deactivate}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

ModifierTable.propTypes = {
  modifiers: PropTypes.array.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default ModifierTable;
