import React, { PropTypes } from "react";
import { Link } from "react-router";

export function setPath(pathName) {
    return {
        home: pathName.toLowerCase() === "home" || pathName === "" ? "active" : null,
        items: pathName.toLowerCase() === "items" ? "active" : null,
        itemCategories: pathName.toLowerCase() === "itemCategories" ? "active" : null,
        modifiers: pathName.toLowerCase() === "modifiers" ? "active" : null,
        taxes: pathName.toLowerCase() === "taxes" ? "active" : null,
        discounts: pathName.toLowerCase() === "discounts" ? "active" : null,
        orders: pathName.toLowerCase() === "orders" ? "active" : null,
        users: pathName.toLowerCase() === "users" ? "active" : null
    };
}

const SideBarNavigation = ({pathName}) => {
    const path = setPath(pathName);
    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element">
                            <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Oleg Shalygin</strong>
                                </span>
                                    <span className="text-muted text-xs block">
                                        Software Developer <b className="caret"></b>
                                    </span>
                                </span>
                            </a>
                            <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a href="#">Logout</a></li>
                            </ul>
                        </div>
                        <div className="logo-element">
                            WR+
                        </div>
                    </li>
                    <li className={path.home}>
                        <Link to="home">
                            <i className="fa fa-th-large"></i> <span className="nav-label">Dashboard</span>
                        </Link>
                    </li>
                    <li className={path.items}>
                        <Link to="items">
                            <i className="fa fa-tasks"></i> <span className="nav-label">Items</span>
                        </Link>
                    </li>
                    <li className={path.itemCategories}>
                        <Link to="itemCategories">
                            <i className="fa fa-folder-open-o"></i> <span className="nav-label">Item Categories</span>
                        </Link>
                    </li>
                     <li className={path.modifiers}>
                        <Link to="modifiers">
                            <i className="fa fa-pencil-square-o"></i> <span className="nav-label">Modifiers</span>
                        </Link>
                     </li>
                     <li className={path.taxes}>
                        <Link to="taxes">
                            <i className="fa fa-percent"></i> <span className="nav-label">Taxes</span>
                        </Link>
                     </li>
                     <li className={path.discounts}>
                        <Link to="discounts">
                            <i className="fa fa-download"></i> <span className="nav-label">Discounts</span>
                        </Link>
                     </li>
                     <li className={path.orders}>
                        <Link to="orders">
                            <i className="fa fa-shopping-cart"></i> <span className="nav-label">Orders</span>
                        </Link>
                     </li>
                     <li className={path.users}>
                        <Link to="users">
                            <i className="fa fa-users"></i> <span className="nav-label">Users</span>
                        </Link>
                    </li>

                </ul>

            </div>
        </nav>
    );
};

SideBarNavigation.propTypes = {
    pathName: PropTypes.string.isRequired
};

export default SideBarNavigation;