/* eslint-disable import/default */
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Router, Route, IndexRoute, browserHistory, Redirect } from "react-router";
import { Provider } from "react-redux";
import { retrieveUser } from "./reducers/initialState";


import "./styles/material.icons.css";
import "./styles/material.style.min.css";
import "../node_modules/material-design-lite/material.min.js";

import "../node_modules/mdl-selectfield/dist/mdl-selectfield.min.css";
import "../node_modules/mdl-selectfield/dist/mdl-selectfield.min.js";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/toastr/build/toastr.min.css";

import "../node_modules/animate.css/animate.min.css";
import "./styles/toastrOptions";



import "./styles/style.css";
import "./styles/spinner.css";
import "./styles/dashboard.style.css";

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
import DashboardPage from "./components/dashboard/dashboardPage.jsx";
import ItemPage from "./components/item/itemPage.jsx";
import ItemDetailPage from "./components/itemDetail/itemDetailPage.jsx";

import LoginPage from "./components/login/loginPage.jsx";

const store = configureStore();

function isAuthorized(nextState, replace, callback) {
    if (nextState.location.pathname === "/login") {
        callback();
        return;
    }
    const state = store.getState();
    if (state.user && state.user.loggedIn === true) {
        callback();
        return;
    }

    retrieveUser((store.dispatch), (error) => {
        if (!!error) {
            replace("/login");
        }
        callback();
    });
}


render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Application} onEnter={(nextState, replace, callback) => isAuthorized(nextState, replace, callback)}>
                <IndexRoute component={DashboardPage} />
                <Route path="login" component={LoginPage} />
                <Route path="dashboard" component={DashboardPage} />
                <Route path="items" component={ItemPage} />
                <Route path="item(/:id)" component={ItemDetailPage} />
                <Route path="item-categories" component={DashboardPage} />
                <Route path="modifiers" component={DashboardPage} />
                <Route path="taxes" component={DashboardPage} />
                <Route path="discounts" component={DashboardPage} />
                <Route path="orders" component={DashboardPage} />
                <Route path="users" component={DashboardPage} />
                <Redirect to="dashboard" from="*" />
            </Route>
        </Router>
    </Provider>,
    document.getElementById("application")
);
