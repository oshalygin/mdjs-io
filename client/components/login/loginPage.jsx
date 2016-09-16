import React, { PropTypes } from "react";
import toastr from "toastr";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions.js";

import Spinner from "../common/spinner.jsx";
import LoginForm from "./loginForm.jsx";

class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {},
            loading: {}
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
            .catch(error => toastr.error(error));
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
    const {loading} = this.props;
    let formComponent = !loading.loadingUser
        ? (<LoginForm onChange={this.onChange} login={this.login} />)
        : (<Spinner />);

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
                {formComponent}

                <p className="m-t"> <small>Western Register is a registered trademark of Western Register, LLC.</small> </p>
            </div>
        </div>
    );
}

}

LoginPage.propTypes = {
    user: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
};

LoginPage.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user,
        loading: state.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
