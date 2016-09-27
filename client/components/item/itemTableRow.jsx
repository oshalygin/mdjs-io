import React, { PropTypes } from "react";
import { Link } from "react-router";
import moment from "moment";

export function disabledText(itemDisabledState) {
    return itemDisabledState
        ? "mdl-color-text--grey"
        : "";
}

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
                    <input
                        type="checkbox"
                        id={item.itemID}
                        disabled={item.disabled}
                        className="mdl-checkbox__input"
                        onChange={checked}
                        checked={item.checked} />
                </label>
            </td>
            <td>{item.photoURL}</td>
            <td style={tableRowAlignment} className={disabledText(item.disabled)}>{item.label}</td>
            <td style={tableRowAlignment} className={disabledText(item.disabled)}>$ {item.price}</td>
            <td style={tableRowAlignment} className={disabledText(item.disabled)}>{parsedLastUpdatedDate}</td>
            <td style={alignLeft}>
                <Link to={editLink} disabled={item.disabled} className="mdl-button mdl-js-button mdl-button--primary">
                    Edit
                </Link>
                <button disabled={item.disabled} className="mdl-button mdl-js-button mdl-button--accent" onClick={deactivate} name={item.itemID}>
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