import React, { PropTypes } from "react";
import ItemTableRow from "./itemTableRow.jsx";

const ItemTable = ({items, checked}) => {

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th />
                        <th>Image </th>
                        <th>Name </th>
                        <th>Price</th>
                        <th>Date Updated</th>
                        <th>Controls</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        return (
                            <ItemTableRow
                                key={item.itemID}
                                item={item}
                                checked={checked} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

ItemTable.propTypes = {
    items: PropTypes.array.isRequired,
    checked: PropTypes.func.isRequired
};

export default ItemTable;