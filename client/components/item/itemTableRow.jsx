import React, { PropTypes } from "react";
import { Link } from "react-router";
import moment from "moment";

const ItemTableRow = ({item, checked, deactivate}) => {
    const tableRowAlignment = {
        verticalAlign: "middle",
        textAlign: "center"
    };
    const alignLeft = {
        ...tableRowAlignment,
            textAlign: "left"
    };
    const parsedLastUpdatedDate = moment(item.lastUpdatedDate).format("MMM DD, YYYY - hh:mm A");
    const editLink = `item/${item.itemID}`;
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
                <Link to={editLink} className="mdl-button mdl-js-button mdl-button--primary">
                    Edit
                </Link>
                <button className="mdl-button mdl-js-button mdl-button--accent" onClick={deactivate} name={item.itemID}>
                    Deactivate
                </button>
            </td>
        </tr>
    );
};

ItemTableRow.propTypes = {
    item: PropTypes.object.isRequired,
    checked: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired
};

export default ItemTableRow;