import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export function setPath(pathName) {
  return {
    dashboard: pathName.toLowerCase() === 'dashboard' || pathName === '' ? 'active' : null,
    items: pathName.toLowerCase() === 'items' ? 'active' : null,
    itemCategories: pathName.toLowerCase() === 'categories' ? 'active' : null,
    modifiers: pathName.toLowerCase() === 'modifiers' ? 'active' : null,
    taxes: pathName.toLowerCase() === 'taxes' ? 'active' : null,
    discounts: pathName.toLowerCase() === 'discounts' ? 'active' : null,
    orders: pathName.toLowerCase() === 'orders' ? 'active' : null,
    users: pathName.toLowerCase() === 'users' ? 'active' : null
  };
}

const SideBarNavigation = ({ pathName }) => {
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
                    Software Developer <b className="caret" />
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
          <li className={path.dashboard}>
            <Link to="dashboard">
              <i className="fa fa-th-large" /> <span className="nav-label">Dashboard</span>
            </Link>
          </li>
          <li className={path.items}>
            <Link to="items">
              <i className="fa fa-tasks" /> <span className="nav-label">Items</span>
            </Link>
          </li>
          <li className={path.itemCategories}>
            <Link to="item-categories">
              <i className="fa fa-folder-open-o" /> <span className="nav-label">Item Categories</span>
            </Link>
          </li>
          <li className={path.modifiers}>
            <Link to="modifiers">
              <i className="fa fa-pencil-square-o" /> <span className="nav-label">Modifiers</span>
            </Link>
          </li>
          <li className={path.taxes}>
            <Link to="taxes">
              <i className="fa fa-percent" /> <span className="nav-label">Taxes</span>
            </Link>
          </li>
          <li className={path.discounts}>
            <Link to="discounts">
              <i className="fa fa-download" /> <span className="nav-label">Discounts</span>
            </Link>
          </li>
          <li className={path.orders}>
            <Link to="orders">
              <i className="fa fa-shopping-cart" /> <span className="nav-label">Orders</span>
            </Link>
          </li>
          <li className={path.users}>
            <Link to="users">
              <i className="fa fa-users" /> <span className="nav-label">Users</span>
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
