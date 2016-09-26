import React, { PropTypes } from "react";
import ItemTableRow from "./itemTableRow.jsx";

const ItemTable = ({items, checked, deactivate}) => {
    const centeredHeaders = {
        textAlign: "center"
    };
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th />
                        <th style={centeredHeaders} />
                        <th style={centeredHeaders}>Name </th>
                        <th style={centeredHeaders}>Price</th>
                        <th style={centeredHeaders}>Date Updated</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </div>
    );
};

ItemTable.propTypes = {
    items: PropTypes.array.isRequired,
    checked: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired
};

export default ItemTable;