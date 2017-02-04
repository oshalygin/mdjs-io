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
      <Table selectable>
        <TableHeader adjustForCheckbox>
          <TableRow>
            <TableHeaderColumn />
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn />
            <TableHeaderColumn>Date Updated</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox showRowHover stripedRows>
          {items.map(item => {
            return (
              <ItemTableRow
                key={item.itemID}
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
