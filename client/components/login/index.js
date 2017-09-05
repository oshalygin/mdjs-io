import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../../utilities/muiTheme';

import Snackbar from '../common/snackbar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/userActions';
import history from '../../utilities/history';

import './login.css';

import Spinner from '../common/spinner/';
import LoginForm from './LoginForm.jsx';
import Version from '../common/version';
import { validateEmail } from '../../utilities/validation';

class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      loading: false,
      formErrors: {},
      notification: false,
      notificationMessage: '',
    };

    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notificationMessage) {
      const { notificationMessage } = nextProps;

      this.setState({
        notification: true,
        formErrors: { ...this.state.formErrors, server: notificationMessage },
        notificationMessage,
      });
    }
  }

  submit(event) {
    event.preventDefault();
    const { user } = this.state;
    const { userActions } = this.props;

    if (this.validateForm()) {
      userActions.userLogin(user);
    }
  }

  validateForm() {
    const { user, formErrors } = this.state;
    const { email, password } = user;

    let isValid = true;
    let errors = { ...formErrors };

    if (!password) {
      errors = { ...errors, password: true };
      isValid = false;
    } else {
      errors = { ...errors, password: false };
    }

    if (!validateEmail(email)) {
      errors = { ...errors, email: true };
      isValid = false;
    } else {
      errors = { ...errors, email: false };
    }

    this.setState({ formErrors: errors });
    return isValid;
  }

  closeNotification() {
    this.setState({ notification: false });
  }

  navigateToRegistration() {
    history.push('/registration');
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div className="middle-box text-center loginscreen animated fadeInDown">
            <div>
              <div>
                <h1 className="logo-name">WR</h1>
              </div>
              <h3>Welcome to the Western Register Dashboard</h3>
              <p>Login to get started</p>
              <LoginForm
                hidden={loading}
                errors={formErrors}
                onChange={this.onChange}
                navigateToRegistration={this.navigateToRegistration}
                onSubmit={this.submit}
              />
              <Spinner hidden={!loading} />
              <p className="m-t">
                <small>
                  Western Register is a registered trademark of Western
                  Register, LLC.
                </small>
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
      </MuiThemeProvider>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  userActions: PropTypes.object.isRequired,
  notificationMessage: PropTypes.string,
};

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    loading: state.loading.loadingUserLogin,
    notificationMessage: state.notification,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
