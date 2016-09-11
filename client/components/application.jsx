import React, {PropTypes} from "react";
import { connect } from "react-redux";

import SideBarNavigation from "./common/sideBarNavigation.jsx";

class Application extends React.Component {
    render() {
        return (
            <div id="wrapper">
                <SideBarNavigation />
                {this.props.children}
            </div>
        );
    }
}

Application.propTypes = {
    children: PropTypes.object.isRequired
};

export default connect()(Application);