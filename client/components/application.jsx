import React, {PropTypes} from "react";
import { connect } from "react-redux";

import SideBarNavigation from "./common/sideBarNavigation.jsx";

class Application extends React.Component {


    render() {
        const currentPath = this.props.location.pathname.replace("/", "");
        return (
            <div id="wrapper">
                <SideBarNavigation pathName={currentPath} />
                {this.props.children}
            </div>
        );
    }
}

Application.propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object
};

export default connect()(Application);