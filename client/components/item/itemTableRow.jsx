import React, { PropTypes } from "react";

const ItemTableRow = ({item, checked}) => {
    return (
        <tr>
            <td>
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={item.itemID}>
                    <input type="checkbox" id={item.itemID} className="mdl-checkbox__input" onChange={checked} checked={item.checked} />
                </label>
            </td>
            <td>{item.photoURL}</td>
            <td>{item.label}</td>
            <td>$ {item.price}</td>
            <td>{item.lastUpdatedDate}</td>
            <td>
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