import React, { PropTypes } from "react";
import moment from "moment";

const ItemTableRow = ({item, checked}) => {
    const tableRowAlignment = {
        verticalAlign: "middle",
        textAlign: "center"
    };
    const alignLeft = {
        ...tableRowAlignment,
            textAlign: "left"
    };
    const parsedLastUpdatedDate = moment(item.lastUpdatedDate).format("MMM DD, YYYY - HH:mm A");

    return (
        <tr>
            <td style={tableRowAlignment}>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={item.itemID}>
                    <input type="checkbox" id={item.itemID} className="mdl-checkbox__input" onChange={checked} checked={item.checked} />
                </label>
            </td>
            <td>{item.photoURL}</td>
            <td style={tableRowAlignment}>{item.label}</td>
            <td style={tableRowAlignment}>$ {item.price}</td>
            <td style={tableRowAlignment}>{parsedLastUpdatedDate}</td>
            <td style={alignLeft}>
                <button className="mdl-button mdl-js-button mdl-button--primary">
                    Edit
                </button>
                <button className="mdl-button mdl-js-button mdl-button--accent">
                    Deactivate
                </button>
            </td>
        </tr>
    );
};

ItemTableRow.propTypes = {
    item: PropTypes.object.isRequired,
    checked: PropTypes.func.isRequired
};

export default ItemTableRow;