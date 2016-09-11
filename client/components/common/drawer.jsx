import React from "react";
import { IndexLink, Link } from "react-router"; //eslint-disable-line no-unused-vars

const Drawer = () => {
    const undecoratedAnchorTag = {
        textDecoration: "none"
    };
    return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Merchant Dashboard</span>
                <nav className="mdl-navigation">
                <IndexLink to="/" className="mdl-navigation__link" style={undecoratedAnchorTag}>Home</IndexLink>
                </nav>
            </div>
    );
};

export default Drawer;