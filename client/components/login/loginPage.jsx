import React, { PropTypes } from "react";
import toastr from "toastr";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions.js";

class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {}
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    login(event) {
        event.preventDefault();
        let {user} = this.state;
        this.props.userActions.login({...user})
            .then(() => this.redirect())
            .catch((error => {
                toastr.error(error);
            }));
    }

    redirect() {
        console.log("redirecting to the home page");
        this.context.router.push("/home");
    }

    onChange(event) {
        const property = event.target.name;
        let {user} = this.state;
        user[property] = event.target.value;
    }

    render() {
        return (
            <div className="middle-box text-center loginscreen animated fadeInDown">
                <div>
                    <div>
                        <h1 className="logo-name">WR</h1>
                    </div>
                    <h3>Welcome to Western Register</h3>
                    <p>
                        The ultimate merchant dashboard experience
                    </p>
                    <p>Login to get started</p>
                    <form className="m-t">
                        <div className="form-group">
                            <input
                                type = "email"
                                name = "email"
                                className = "form-control"
                                placeholder = "Username"
                                onChange = {this.onChange}
                                required />
                        </div>
                        <div className="form-group">
                            <input
                                type = "password"
                                name = "password"
                                className = "form-control"
                                placeholder = "Password"
                                onChange = {this.onChange}
                                required />
                        </div>
                        <button
                            type = "submit"
                            className = "btn btn-primary block full-width m-b"
                            onClick = {this.login}
                            onSubmit = {this.login}>Login</button>

                        <a href="#"><small>Forgot password?</small></a>
                        <p className="text-muted text-center"><small>Don't have an account?</small></p>
                        <a className="btn btn-sm btn-white btn-block" href="#">Create an account</a>
                    </form>
                    <p className="m-t"> <small>Western Register is a registered trademark of Western Register, LLC.</small> </p>
                </div>
            </div>
        );
    }

}

LoginPage.propTypes = {
    user: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
};

LoginPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
