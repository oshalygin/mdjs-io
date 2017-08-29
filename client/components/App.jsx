import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../utilities/history';

import * as configurationActionCreators from '../actions/configurationActions';
import * as versionActionCreators from '../actions/versionActions';

import AuthorizedRoute from './common/authorizedRoute';
import DashboardApplication from './DashboardApplication.jsx';
import Login from './login';
import Registration from './registration';
import Home from './home';

class App extends React.Component {
  componentWillMount() {
    const { versionActions, configurationActions } = this.props;
    versionActions.getVersion();
    configurationActions.retrieveApplicationConfiguration();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <AuthorizedRoute
              path="/dashboard"
              component={DashboardApplication}
            />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object,
  versionActions: PropTypes.object.isRequired,
  configurationActions: PropTypes.object.isRequired,
};

function mapStateToProps() {
  return {};
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
