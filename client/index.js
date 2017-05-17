/* eslint-disable import/default */
/* eslint-disable react/jsx-no-bind */

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { retrieveUser } from './reducers/initialState';
import { hostLocation } from './utilities/endpoints';

// To load styles globally without CSS modules, use the !style!css!{{path}} format.
// https://github.com/css-modules/css-modules/pull/65#issuecomment-248280248
import '!style!css!../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '!style!css!../node_modules/font-awesome/css/font-awesome.min.css';
import '!style!css!./styles/colors.css';

import '!style!css!../node_modules/animate.css/animate.min.css';

import '!style!css!../node_modules/dashboard-styles/dist/dashboard.min.css';
import '!style!css!./styles/spinner.css';

import './images/favicon.ico';
import './images/apple-touch-icon.png';
import './images/favicon-16x16.png';
import './images/favicon-32x32.png';
import './images/mstile-150x150.png';
import './images/safari-pinned-tab.svg';

import '../node_modules/jquery/dist/jquery.min';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import '../node_modules/metismenu/dist/metisMenu.min';

import './inspinia.js';

import pace from '../node_modules/pace-progress/pace.min';
pace.start();

// Necessary for Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Application from './components/Application.jsx';
import Dashboard from './components/dashboard';
import ItemPage from './components/item';
import ItemDetailPage from './components/itemDetail';
import CategoryDetailPage from './components/categoryDetail';
import CategoriesPage from './components/categories';
import TaxesPage from './components/taxes';
import TaxDetailPage from './components/taxDetail';
import ModifiersPage from './components/modifiers';
import ModifierDetailPage from './components/modifierDetail';
import DiscountPage from './components/discounts';
import DiscountDetailPage from './components/discountDetail';
import OrderPage from './components/orders';

import Login from './components/login';

const environment = process.env.NODE_ENV; // eslint-disable-line no-process-env
if (environment === 'production') {

  const errorHandler = new StackdriverErrorReporter(); //eslint-disable-line no-undef
  errorHandler.start({
    key: 'AIzaSyBsQeaYpBv6U-axYGImjX6yUTaZ7LACDxQ',
    projectId: 'merchant-dash',
    service: hostLocation
  });

}

const store = configureStore();

function isAuthorized(nextState, replace, callback) {
  if (nextState.location.pathname === '/login') {
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
      replace('/login');
    }
    callback();
  });
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Application} onEnter={(nextState, replace, callback) => isAuthorized(nextState, replace, callback)}>
        <IndexRoute component={Dashboard} />
        <Route path="login" component={Login} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="items" component={ItemPage} />
        <Route path="item(/:id)" component={ItemDetailPage} />
        <Route path="category(/:id)" component={CategoryDetailPage} />
        <Route path="categories" component={CategoriesPage} />
        <Route path="taxes" component={TaxesPage} />
        <Route path="modifiers" component={ModifiersPage} />
        <Route path="modifier(/:id)" component={ModifierDetailPage} />
        <Route path="tax(/:id)" component={TaxDetailPage} />
        <Route path="discounts" component={DiscountPage} />
        <Route path="discount(/:id)" component={DiscountDetailPage} />
        <Route path="orders" component={OrderPage} />
        <Route path="users" component={Dashboard} />
        <Redirect to="dashboard" from="*" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('application')
);
