/* eslint-disable import/default */
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";

import "../node_modules/material-design-lite/material.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

import "../node_modules/animate.css/animate.min.css";
import "./styles/toastrOptions";

import "../node_modules/material-design-lite/material.min.js";
import "./styles/material.icons.css";
import "./styles/material.style.css";
import "./styles/style.css";


import "./images/favicon.ico";
import "./images/apple-touch-icon.png";
import "./images/favicon-16x16.png";
import "./images/favicon-32x32.png";
import "./images/mstile-150x150.png";
import "./images/safari-pinned-tab.svg";


import "../node_modules/jquery/dist/jquery.min";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
import "../node_modules/metismenu/dist/metisMenu.min";
import "../node_modules/jquery-slimscroll/jquery.slimscroll.min";

import "./inspinia.js";

import pace from "../node_modules/pace-progress/pace.min";
pace.start();

import Application from "./components/application.jsx";
import HomePage from "./components/home/homePage.jsx";

import LoginPage from "./components/login/loginPage.jsx";

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>

            <Route path="/" component={Application}>
                <IndexRoute component={HomePage} />
                <Route path="login" component={LoginPage} />
                <Route path="home" component={HomePage} />
                <Route path="items" component={HomePage} />
                <Route path="item-categories" component={HomePage} />
                <Route path="modifiers" component={HomePage} />
                <Route path="taxes" component={HomePage} />
                <Route path="discounts" component={HomePage} />
                <Route path="orders" component={HomePage} />
                <Route path="users" component={HomePage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("application")
);
