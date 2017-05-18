import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHeaderColumn
} from 'material-ui/Table';

import CategoriesTableRow from './CategoriesTableRow.jsx';

const CategoriesTable = ({ categories, deactivate }) => {
  return (
    <div className="table-responsive">
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Date Created</TableHeaderColumn>
            <TableHeaderColumn>Date Updated</TableHeaderColumn>
            <TableHeaderColumn />
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody showRowHover>
          {categories.map((category, index) => {
            return (
              <CategoriesTableRow
                key={index}
                category={category}
                deactivate={deactivate}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

CategoriesTable.propTypes = {
  categories: PropTypes.array.isRequired,
  deactivate: PropTypes.func.isRequired
};

export default CategoriesTable;
