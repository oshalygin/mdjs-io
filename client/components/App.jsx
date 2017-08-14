import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import history from '../utilities/history';

import * as userActionCreators from '../actions/userActions';
import * as configurationActionCreators from '../actions/configurationActions';
import * as versionActionCreators from '../actions/versionActions';

import DashboardApplication from './DashboardApplication.jsx';
import Login from './login';
import Home from './home';

class App extends React.Component {
  componentWillMount() {
    const { versionActions, configurationActions, userActions } = this.props;
    versionActions.getVersion();
    configurationActions.retrieveApplicationConfiguration();
    userActions.retrieveLoggedInUser();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/dashboard" component={DashboardApplication} />
            <Route path="/login" component={Login} />
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
  userActions: PropTypes.object.isRequired,
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
    userActions: bindActionCreators(userActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
