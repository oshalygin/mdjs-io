import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import TextField from '../common/TextField.jsx';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './login.css';

const textFieldLoginStyles = {
  color: '#337ab7'
};

const LoginForm = ({ onChange, login }) => {
  return (
    <form className="m-t">
      <div className={styles.loginContainer}>
        <div className={styles.loginFieldContainer}>
          <TextField
            floatingLabelText="Username"
            name="email"
            type="text"
            fullWidth
            floatingLabelStyle={textFieldLoginStyles}
            onChange={onChange} />
          <TextField
            floatingLabelText="Password"
            name="password"
            type="password"
            fullWidth
            floatingLabelStyle={textFieldLoginStyles}
            onChange={onChange} />
        </div>
        <RaisedButton
          type="submit"
          label="Log In"
          fullWidth
          primary
          onClick={login}
          onSubmit={login} />
        <a href="#"><small>Forgot password?</small></a>
      </div>
      <p className="text-muted text-center"><small>Don't have an account?</small></p>
      <a className="btn btn-sm btn-white btn-block" href="#">Create an account</a>
    </form>
  );
};

LoginForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default CSSModules(LoginForm, styles);
