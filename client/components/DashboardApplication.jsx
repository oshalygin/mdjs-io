import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../actions/userActions';
import * as configurationActionCreators from '../actions/configurationActions';
import * as versionActionCreators from '../actions/versionActions';

import SideBarNavigation from './common/sidenav';
import Version from './common/version';
import SearchBar from './common/SearchBar.jsx';

import AuthorizedRoute from './common/authorizedRoute';
import Spinner from './common/spinner';

import Login from './login';
import Dashboard from './dashboard';
import ItemPage from './item';
import CategoriesPage from './categories';
import TaxesPage from './taxes';
import ModifiersPage from './modifiers';
import DiscountPage from './discounts';
import OrderPage from './orders';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../utilities/muiTheme.js';

class Application extends React.Component {
  componentWillMount() {
    const { versionActions, configurationActions, userActions } = this.props;
    versionActions.getVersion();
    configurationActions.retrieveApplicationConfiguration();
    userActions.retrieveLoggedInUser();
  }

  render() {
    const { match, loadingUser } = this.props;
    const path = match.path;
    const currentPath = this.props.location.pathname.replace('/', '');

    const content = (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id="wrapper">
          <SideBarNavigation pathName={currentPath} />
          <div id="page-wrapper" className="gray-bg">
            <SearchBar />
            <div className="wrapper wrapper-content animated fadeInRight">
              <div className="row">
                <div className="col-lg-12">
                  <Switch>
                    <AuthorizedRoute
                      exact
                      path={`${path}`}
                      component={Dashboard}
                    />
                    <Route path={`${path}/login`} component={Login} />
                    <AuthorizedRoute
                      exact
                      path={`${this.props.match.path}items`}
                      component={ItemPage}
                    />
                    <AuthorizedRoute
                      path={`${path}categories`}
                      component={CategoriesPage}
                    />
                    <AuthorizedRoute
                      path={`${path}taxes`}
                      component={TaxesPage}
                    />
                    <AuthorizedRoute
                      path={`${path}modifiers`}
                      component={ModifiersPage}
                    />
                    <AuthorizedRoute
                      path={`${path}discounts`}
                      component={DiscountPage}
                    />
                    <AuthorizedRoute
                      path={`${path}orders`}
                      component={OrderPage}
                    />
                    <Redirect to="/" />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          <Version />
        </div>
      </MuiThemeProvider>
    );

    return loadingUser
      ? <MuiThemeProvider muiTheme={muiTheme}>
          <div
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Spinner size={200} />
          </div>
        </MuiThemeProvider>
      : content;
  }
}

Application.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object,
  loadingUser: PropTypes.bool.isRequired,
  versionActions: PropTypes.object.isRequired,
  configurationActions: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    loadingUser: state.loading.loadingUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    versionActions: bindActionCreators(versionActionCreators, dispatch),
    configurationActions: bindActionCreators(
      configurationActionCreators,
      dispatch,
    ),
    userActions: bindActionCreators(userActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
