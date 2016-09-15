/* eslint-disable max-len */
import React from "react";
// import { Link } from "react-router";

class HomePage extends React.Component {
    render() {
        return (
            <div id="page-wrapper" className="gray-bg">
                <div className="row border-bottom">
                    <nav className="navbar navbar-static-top white-bg" role="navigation" style={{ marginBottom: 0 }}>
                        <div className="navbar-header">
                            <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars"></i> </a>
                            <form role="search" className="navbar-form-custom" method="post" action="#">
                                <div className="form-group">
                                    <input type="text" placeholder="Search for something..." className="form-control" name="top-search" id="top-search" />
                                </div>
                            </form>
                        </div>
                        <ul className="nav navbar-top-links navbar-right">
                            <li>
                                <a href="#">
                                    <i className="fa fa-sign-out"></i> Log out
                                </a>
                            </li>
                        </ul>

                    </nav>
                </div>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center m-t-lg">
                                <h1>
                                    Welcome to the Merchant Dashboard
                                </h1>
                                <small>
                                    It is an application skeleton while it is being built out.  Many changes to come, keep getting latest!
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="pull-right">
                        Pending <strong>18</strong> Transactions.
                    </div>
                    <div>
                        <strong>Copyright</strong> Western Register &copy; 2014-2017
                    </div>
                </div>

            </div>
        );
    }
}

export default HomePage;