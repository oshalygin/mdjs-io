import React, { PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn
} from 'material-ui/Table';
import ItemTableRow from './ItemTableRow.jsx';

const ItemTable = ({ items, deactivate }) => {
  return (
    <div className="table-responsive">
      <Table selectable multiSelectable>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
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
              <ItemTableRow
                key={index}
                item={item}
                deactivate={deactivate}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

ItemTable.propTypes = {
  items: PropTypes.array.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default ItemTable;
