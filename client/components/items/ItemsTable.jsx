import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn,
} from 'material-ui/Table';
import ItemsTableRow from './ItemsTableRow.jsx';

const ItemsTable = ({ items, deactivate }) => {
  return (
    <div className="table-responsive">
      <Table selectable multiSelectable>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Image</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Date Updated</TableHeaderColumn>
            <TableHeaderColumn />
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody showRowHover>
          {items.map((item, index) => {
            return (
              <ItemsTableRow key={index} item={item} deactivate={deactivate} />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

ItemsTable.propTypes = {
  items: PropTypes.array.isRequired,
  deactivate: PropTypes.func.isRequired,
};

export default ItemsTable;
