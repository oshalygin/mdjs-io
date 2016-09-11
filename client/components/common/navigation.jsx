import React from "react";
import { IndexLink } from "react-router";

const Navigation = () => {
    const undecoratedAnchorTag = {
        textDecoration: "none"
    };
    return (
        <nav className="mdl-navigation mdl-layout--large-screen-only">
            <IndexLink to="/" className="mdl-navigation__link" style={undecoratedAnchorTag}>Home</IndexLink>
        </nav>
    );
};

export default Navigation;