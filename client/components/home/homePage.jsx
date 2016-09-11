/* eslint-disable max-len */
import React from "react";
import { Link } from "react-router";

class HomePage extends React.Component {
    render() {
        const undecoratedButton = {
            textDecoration: "none"
        };
        return (
            <div id="wrapper">
                <nav className="navbar-default navbar-static-side" role="navigation">
                    <div className="sidebar-collapse">
                        <ul className="nav metismenu" id="side-menu">
                            <li className="nav-header">
                                <div className="dropdown profile-element">
                                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                        <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">David Williams</strong>
                                        </span> <span className="text-muted text-xs block">Art Director <b className="caret"></b></span> </span> </a>
                                    <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                        <li><a href="#">Logout</a></li>
                                    </ul>
                                </div>
                                <div className="logo-element">
                                    IN+
                                </div>
                            </li>
                            <li className="active">
                                <a href="index.html"><i className="fa fa-th-large"></i> <span className="nav-label">Main view</span></a>
                            </li>
                            <li>
                                <a href="minor.html"><i className="fa fa-th-large"></i> <span className="nav-label">Minor view</span> </a>
                            </li>
                        </ul>

                    </div>
                </nav>

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
                                        Welcome in INSPINIA Static SeedProject
                                    </h1>
                                    <small>
                                        It is an application skeleton for a typical web app.You can use it to quickly bootstrap your webapp projects and dev environment for these projects.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="pull-right">
                            10GB of <strong>250GB</strong> Free.
                        </div>
                        <div>
                            <strong>Copyright</strong> Example Company &copy; 2014-2017
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default HomePage;