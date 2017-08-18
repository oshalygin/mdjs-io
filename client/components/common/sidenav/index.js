/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../../actions/userActions';
import SideBarUser from './SideBarUser.jsx';

export function setPath(pathName) {
  return {
    dashboard:
      pathName.toLowerCase() === 'dashboard' || pathName === ''
        ? 'active'
        : null,
    items: pathName.toLowerCase() === 'items' ? 'active' : null,
    itemCategories: pathName.toLowerCase() === 'categories' ? 'active' : null,
    modifiers: pathName.toLowerCase() === 'modifiers' ? 'active' : null,
    taxes: pathName.toLowerCase() === 'taxes' ? 'active' : null,
    discounts: pathName.toLowerCase() === 'discounts' ? 'active' : null,
    orders: pathName.toLowerCase() === 'orders' ? 'active' : null,
    users: pathName.toLowerCase() === 'users' ? 'active' : null,
  };
}

class SideBarNavigation extends React.Component {
  constructor() {
    super();

    this.state = {};
    this.navigateToPortal = this.navigateToPortal.bind(this);
    this.logout = this.logout.bind(this);
  }

  navigateToPortal(portal) {
    browserHistory.push(`/${portal}`);
  }

  logout() {
    this.props.userActions.logout();
    browserHistory.push('login');
  }

  render() {
    const { pathName, user } = this.props;
    const path = setPath(pathName);

    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
              <SideBarUser
                roleId={user.role}
                firstName={user.firstName}
                lastName={user.lastName}
                logout={this.logout}
              />
              <div className="logo-element">WR+</div>
            </li>
            <li className={path.dashboard}>
              <NavLink exact to="/dashboard" activeClassName="active">
                <i className="fa fa-th-large" />
                <span className="nav-label">Home</span>
              </NavLink>
            </li>
            <li className={path.items}>
              <NavLink exact to="/dashboard/items" activeClassName="active">
                <i className="fa fa-tasks" />
                <span className="nav-label">Items</span>
              </NavLink>
            </li>
            <li className={path.itemCategories}>
              <NavLink
                exact
                to="/dashboard/categories"
                activeClassName="active"
              >
                <i className="fa fa-folder-open-o" />
                <span className="nav-label">Categories</span>
              </NavLink>
            </li>
            <li className={path.modifiers}>
              <NavLink exact to="/dashboard/modifiers" activeClassName="active">
                <i className="fa fa-pencil-square-o" />
                <span className="nav-label">Modifiers</span>
              </NavLink>
            </li>
            <li className={path.taxes}>
              <NavLink exact to="/dashboard/taxes" activeClassName="active">
                <i className="fa fa-percent" />
                <span className="nav-label">Taxes</span>
              </NavLink>
            </li>
            <li className={path.discounts}>
              <NavLink exact to="/dashboard/discounts" activeClassName="active">
                <i className="fa fa-download" />
                <span className="nav-label">Discounts</span>
              </NavLink>
            </li>
            <li className={path.orders}>
              <NavLink exact to="/dashboard/orders" activeClassName="active">
                <i className="fa fa-shopping-cart" />
                <span className="nav-label">Orders</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

SideBarNavigation.propTypes = {
  pathName: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarNavigation);
