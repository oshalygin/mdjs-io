import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as configurationActionCreators from '../actions/configurationActions';
import * as versionActionCreators from '../actions/versionActions';

import SideBarNavigation from './common/sidenav';
import Version from './common/version';
import SearchBar from './common/SearchBar.jsx';

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
    const { versionActions, configurationActions } = this.props;
    versionActions.getVersion();
    configurationActions.retrieveApplicationConfiguration();
  }

  render() {
    const { match } = this.props;
    const path = match.path;
    const currentPath = this.props.location.pathname.replace('/', '');

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id="wrapper">
          <SideBarNavigation pathName={currentPath} />
          <div id="page-wrapper" className="gray-bg">
            <SearchBar />
            <div className="wrapper wrapper-content animated fadeInRight">
              <div className="row">
                <div className="col-lg-12">
                  <Switch>
                    <Route exact path={`${path}`} component={Dashboard} />
                    <Route path={`${path}/login`} component={Login} />
                    <Route
                      exact
                      path={`${this.props.match.path}items`}
                      component={ItemPage}
                    />
                    <Route
                      path={`${path}categories`}
                      component={CategoriesPage}
                    />
                    <Route path={`${path}taxes`} component={TaxesPage} />
                    <Route
                      path={`${path}modifiers`}
                      component={ModifiersPage}
                    />
                    <Route path={`${path}discounts`} component={DiscountPage} />
                    <Route path={`${path}orders`} component={OrderPage} />
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
  }
}

Application.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object,
  versionActions: PropTypes.object.isRequired,
  configurationActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    versionActions: bindActionCreators(versionActionCreators, dispatch),
    configurationActions: bindActionCreators(
      configurationActionCreators,
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
