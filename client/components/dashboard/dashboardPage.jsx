/* eslint-disable max-len */
import React from "react";
// import { Link } from "react-router";

class DashboardPage extends React.Component {

    componentDidMount() {
        componentHandler.upgradeDom(); //eslint-disable-line no-undef
    }

    render() {
        return (
            <div className="text-center m-t-lg">

                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    Button
                </button>
                <h1>
                    Welcome to the Merchant Dashboard
                </h1>
                <small>
                    This is an application skeleton while it's being built out.  Many changes to come, keep getting latest!
                </small>
            </div>
        );
    }
}

export default DashboardPage;