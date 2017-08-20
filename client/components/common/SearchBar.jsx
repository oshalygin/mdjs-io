import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../actions/userActions';
import history from '../../utilities/history';

import $ from 'jquery'; //eslint-disable-line

class SearchBar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
    };

    this.logout = this.logout.bind(this);
    this.toggleSideNavMenu = this.toggleSideNavMenu.bind(this);
  }

  logout() {
    const { userActions } = this.props;
    userActions.logout();
    history.push('/login');
  }

  toggleSideNavMenu() {
    $('body').toggleClass('mini-navbar');
    return true;
  }

  render() {
    return (
      <div className="row border-bottom">
        <nav
          className="navbar navbar-static-top white-bg"
          role="navigation"
          style={{ marginBottom: 0 }}
        >
          <div className="navbar-header">
            <a
              className="navbar-minimalize minimalize-styl-2 btn btn-primary"
              onClick={this.toggleSideNavMenu}
            >
              <i className="fa fa-bars" />
            </a>
            <form role="search" className="navbar-form-custom">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search for something..."
                  className="form-control"
                  name="top-search"
                  id="top-search"
                  disabled
                />
              </div>
            </form>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <a className="logout-link" onClick={this.logout}>
                <i className="fa fa-sign-out" />
                Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

SearchBar.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar),
);
