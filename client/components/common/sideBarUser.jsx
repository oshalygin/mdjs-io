import React, { PropTypes } from "react";
import { bindActionCreators } from "react-redux";
import * as userActions from "../../actions/"

class SideBarUser extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: props.user
        };
    }

}

SideBarUser.propTypes = {
    user: PropTypes.object.isRequired,
    userActions: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBarUser);
