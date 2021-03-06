import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../common/TextField.jsx';
import RaisedButton from 'material-ui/RaisedButton';

import './registration.css';

const RegistrationForm = ({
  hidden,
  errors,
  onChange,
  onSubmit,
  navigateToLogin,
}) => {
  const formDisplay = hidden ? { display: 'none' } : { display: 'initial' };

  const errorTextDisplay = errors.server
    ? { display: 'initial' }
    : { display: 'none' };

  return (
    <form style={formDisplay} className="m-t">
      <div styleName="login-container">
        <div styleName="login-field-container">
          <div style={errorTextDisplay} styleName="error-text">
            {errors.server}
          </div>
          <div styleName="form-controls">
            <TextField
              floatingLabelFixed
              floatingLabelText="Email Address"
              name="email"
              type="text"
              errorText={errors.email ? 'Not a valid email address' : ''}
              fullWidth
              onChange={onChange}
            />
            <TextField
              floatingLabelFixed
              floatingLabelText="Password"
              name="password"
              type="password"
              fullWidth
              onChange={onChange}
            />
            <TextField
              floatingLabelFixed
              floatingLabelText="Confirm Password"
              name="confirmPassword"
              type="password"
              errorText={
                errors.confirmPassword ? 'Password does not match' : ''
              }
              fullWidth
              onChange={onChange}
            />
            <TextField
              floatingLabelFixed
              floatingLabelText="First Name"
              name="firstName"
              type="text"
              fullWidth
              onChange={onChange}
            />
            <TextField
              floatingLabelFixed
              floatingLabelText="Last Name"
              name="lastName"
              type="text"
              fullWidth
              onChange={onChange}
            />
            <TextField
              floatingLabelFixed
              floatingLabelText="Phone Number"
              name="phoneNumber"
              errorText={errors.phoneNumber ? 'Invalid phone number' : ''}
              type="text"
              fullWidth
              onChange={onChange}
            />
            <TextField
              floatingLabelFixed
              floatingLabelText="Referrer"
              name="referrer"
              type="text"
              fullWidth
              onChange={onChange}
            />
          </div>
        </div>
        <RaisedButton
          type="submit"
          label="register"
          fullWidth
          primary
          onClick={onSubmit}
          onSubmit={onSubmit}
        />
      </div>
      <p className="text-muted text-center">
        <small>Already have an account?</small>
      </p>
      <RaisedButton
        type="button"
        label="login"
        primary={false}
        fullWidth
        onClick={navigateToLogin}
      />
    </form>
  );
};

RegistrationForm.propTypes = {
  hidden: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  navigateToLogin: PropTypes.func.isRequired,
};

export default RegistrationForm;
