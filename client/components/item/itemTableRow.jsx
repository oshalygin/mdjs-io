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
            <td><a href="#"><i className="fa fa-check text-navy" /></a></td>
        </tr>
    );
};

ItemTableRow.propTypes = {
    item: PropTypes.object.isRequired,
    checked: PropTypes.func.isRequired
};

export default ItemTableRow;