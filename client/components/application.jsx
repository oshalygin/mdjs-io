import React, {PropTypes} from "react";
import { connect } from "react-redux";
import Header from "./common/header.jsx";
import Drawer from "./common/drawer.jsx";

class Application extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

Application.propTypes = {
    children: PropTypes.object.isRequired
};

export default connect()(Application);