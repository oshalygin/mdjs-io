import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../../utilities/muiTheme';

import Snackbar from '../common/snackbar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/registrationActions';

import './registration.css';

import Spinner from '../common/spinner/';
import RegistrationForm from './RegistrationForm.jsx';
import Version from '../common/version';
import { validateEmail } from '../../utilities/validation';

class Registration extends React.Component {
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

  submit(event) {
    event.preventDefault();
    const { user } = this.state;
    const { registrationActions } = this.props;

    if (this.validateForm()) {
      registrationActions.triggerRegistration(user);
    }
  }

  validateForm() {
    const { user, formErrors } = this.state;
    const { email, password, confirmPassword } = user;

    let isValid = true;
    let errors = { ...formErrors };

    if (password !== confirmPassword) {
      errors = { ...errors, confirmPassword: true };
      isValid = false;
    } else {
      errors = { ...errors, confirmPassword: false };
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

  onChange(event) {
    const property = event.target.name;
    const { user } = this.state;
    user[property] = event.target.value;
  }

  render() {
    const { loading } = this.props;
    const { formErrors } = this.state;

    const heading = loading ? 'Processing Registration' : 'Registration';
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div styleName="registration-container">
          <div className="middle-box text-center loginscreen animated fadeInDown">
            <div>
              <div>
                <h1 className="logo-name" styleName="logo-name">
                  WR
                </h1>
              </div>
              <div styleName="content-container">
                <h3>
                  {heading}
                </h3>
                <p>
                  {!loading ? 'Create your account' : ''}
                </p>
                <RegistrationForm
                  hidden={loading}
                  errors={formErrors}
                  onChange={this.onChange}
                  onSubmit={this.submit}
                />
                {loading &&
                  <div styleName="content-container-spinner">
                    <Spinner />
                  </div>}
              </div>
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

Registration.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  registrationActions: PropTypes.object.isRequired,
};

Registration.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    loading: state.loading.loadingRegistration,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registrationActions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
