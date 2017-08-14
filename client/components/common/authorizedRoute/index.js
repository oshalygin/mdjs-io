/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import R from 'ramda';

import Spinner from '../spinner';

class AuthorizedRoute extends React.Component {
  render() {
    const { Component, loading, user, ...rest } = this.props;
    const loggedIn = !R.isEmpty(user);

    return (
      <Route
        {...rest}
        render={props => {
          if (loading) {
            return (
              <div>
                <Spinner hidden={!loading} />
              </div>
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
  Component: PropTypes.any.isRequired,
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
