import React, { PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn
} from 'material-ui/Table';
import ItemTableRow from './ItemTableRow.jsx';

const ItemTable = ({ items, checked, deactivate }) => {
  return (
    <div className="table-responsive">
      <Table selectable multiSelectable>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Image</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>Date Updated</TableHeaderColumn>
            <TableHeaderColumn />
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover
          displayRowCheckbox >
          {items.map((item, index) => {
            return (
              <ItemTableRow
                key={index}
                item={item}
                checked={checked}
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
  checked: PropTypes.func.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default ItemTable;
