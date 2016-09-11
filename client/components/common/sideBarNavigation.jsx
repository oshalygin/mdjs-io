import React from "react";
import { IndexLink } from "react-router";

const Navigation = () => {
    return (
        <nav className="navbar-default navbar-static-side" role="navigation">
                    <div className="sidebar-collapse">
                        <ul className="nav metismenu" id="side-menu">
                            <li className="nav-header">
                                <div className="dropdown profile-element">
                                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                        <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">Oleg Shalygin</strong>
                                        </span>
                                        <span className="text-muted text-xs block">
                                        Software Developer <b className="caret"></b>
                                        </span>
                                        </span>
                                        </a>
                                    <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                        <li><a href="#">Logout</a></li>
                                    </ul>
                                </div>
                                <div className="logo-element">
                                    WR+
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
    );
};

export default Navigation;