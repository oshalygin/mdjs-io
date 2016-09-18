import React, { PropTypes } from "react";
import { connect } from "react-redux";

import SideBarNavigation from "./common/sideBarNavigation.jsx";
import SearchBar from "./common/searchBar.jsx";
import DashboardPage from "./dashboard/dashboardPage.jsx";

class Application extends React.Component {


    render() {
        const currentPath = this.props.location.pathname.replace("/", "");
        if (currentPath === "login") {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }
        return (
            <div id="wrapper">
                <SideBarNavigation pathName={currentPath} />
                <div id="page-wrapper" className="gray-bg">
                    <SearchBar />
                    <DashboardPage />
                </div>
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