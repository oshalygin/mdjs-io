/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../../../utilities/muiTheme';

import R from 'ramda';

import Spinner from '../spinner';

class AuthorizedRoute extends React.Component {
  render() {
    const { component: Component, loading, user, ...rest } = this.props;
    const loggedIn = !R.isEmpty(user);

    return (
      <Route
        {...rest}
        render={props => {
          if (!loading) {
            return (
              <MuiThemeProvider muiTheme={muiTheme}>
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
            );
          }

          return loggedIn
            ? <div>
                <Component {...props} />
              </div>
            : <div>
                <Redirect to="/login" />
              </div>;
        }}
      />
    );
  }
}

AuthorizedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    loading: state.loading.loadingUser,
  };
}

export default connect(mapStateToProps)(AuthorizedRoute);
