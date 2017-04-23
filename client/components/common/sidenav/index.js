/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../../actions/userActions';
import SideBarUser from './SideBarUser.jsx';

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
                logout={this.logout} />
              <div className="logo-element">
                WR+
            </div>
            </li>
            <li className={path.dashboard}>
              <a onClick={() => this.navigateToPortal('dashboard')}>
                <i className="fa fa-th-large" /> <span className="nav-label">Dashboard</span>
              </a>
            </li>
            <li className={path.items}>
              <a onClick={() => this.navigateToPortal('items')}>
                <i className="fa fa-tasks" /> <span className="nav-label">Items</span>
              </a>
            </li>
            <li className={path.itemCategories}>
              <a onClick={() => this.navigateToPortal('categories')}>
                <i className="fa fa-folder-open-o" /> <span className="nav-label">Item Categories</span>
              </a>
            </li>
            <li className={path.modifiers}>
              <a onClick={() => this.navigateToPortal('modifiers')}>
                <i className="fa fa-pencil-square-o" /> <span className="nav-label">Modifiers</span>
              </a>
            </li>
            <li className={path.taxes}>
              <a onClick={() => this.navigateToPortal('taxes')}>
                <i className="fa fa-percent" /> <span className="nav-label">Taxes</span>
              </a>
            </li>
            <li className={path.discounts}>
              <a onClick={() => this.navigateToPortal('discounts')}>
                <i className="fa fa-download" /> <span className="nav-label">Discounts</span>
              </a>
            </li>
            <li className={path.orders}>
              <a onClick={() => this.navigateToPortal('orders')}>
                <i className="fa fa-shopping-cart" /> <span className="nav-label">Orders</span>
              </a>
            </li>
            <li className={path.users}>
              <a onClick={() => this.navigateToPortal('users')}>
                <i className="fa fa-users" /> <span className="nav-label">Users</span>
              </a>
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
  userActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarNavigation);
