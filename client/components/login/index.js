import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '../common/snackbar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actionCreators from '../../actions/userActions';

import './login.css';

import Spinner from '../common/spinner/';
import LoginForm from './LoginForm.jsx';
import Version from '../common/version';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      loading: false,
      formErrors: false,
      notification: false,
      notificationMessage: '',
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    this.redirect = this.redirect.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  login(event) {
    event.preventDefault();
    const { user } = this.state;
    const { login, loginValidationErrors } = this.props.userActions;

    login(user).then(() => this.redirect()).catch(() => {
      this.setState({
        notification: true,
        notificationMessage: 'Invalid Username or Password',
      });

      loginValidationErrors();
      this.setState({ formErrors: true });
    });
  }

  closeNotification() {
    this.setState({ notification: false });
  }

  redirect() {
    browserHistory.push('/dashboard');
  }

  onChange(event) {
    const property = event.target.name;
    const { user } = this.state;
    user[property] = event.target.value;
  }

  render() {
    const { loading } = this.props;
    const { formErrors } = this.state;
    return (
      <div>
        <div className="middle-box text-center loginscreen animated fadeInDown">
          <div>
            <div>
              <h1 className="logo-name">MD</h1>
            </div>
            <h3>Welcome to Merchant Dashboard</h3>
            <p>The ultimate merchant dashboard experience</p>
            <p>Login to get started</p>
            <LoginForm
              hidden={loading}
              errors={formErrors}
              onChange={this.onChange}
              login={this.login}
            />
            <Spinner hidden={!loading} />
            <p className="m-t">
              {' '}<small>
                Merchant Dashboard is a registered trademark of Merchant
                Dashboard, LLC.
              </small>{' '}
            </p>
          </div>
        </div>
        <Snackbar
          open={this.state.notification}
          action="OK"
          message={this.state.notificationMessage}
          onActionTouchTap={this.closeNotification}
          onRequestClose={this.closeNotification}
        />
        <Version />
      </div>
    );
  }
}

LoginPage.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  userActions: PropTypes.object.isRequired,
};

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    loading: state.loading.loadingUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
