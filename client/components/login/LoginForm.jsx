import React, { PropTypes } from 'react';

const LoginForm = ({onChange, login}) => {
  return (
    <form className="m-t">
      <div className="form-group">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Username"
          onChange={onChange}
          required />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={onChange}
          required />
      </div>
      <button
        type="submit"
        className="btn btn-primary block full-width m-b"
        onClick={login}
        onSubmit={login}>Login</button>

      <a href="#"><small>Forgot password?</small></a>
      <p className="text-muted text-center"><small>Don't have an account?</small></p>
      <a className="btn btn-sm btn-white btn-block" href="#">Create an account</a>
    </form>
  );
};

LoginForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default LoginForm;
