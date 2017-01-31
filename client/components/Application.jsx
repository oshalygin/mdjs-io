import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import SideBarNavigation from './common/SideBarNavigation.jsx';
import SearchBar from './common/SearchBar.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../utilities/muiTheme.js';

class Application extends React.Component {


  render() {
    const currentPath = this.props.location.pathname.replace('/', '');
    if (currentPath === 'login') {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          {this.props.children}
        </MuiThemeProvider>
      );
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id="wrapper">
          <SideBarNavigation pathName={currentPath} />
          <div id="page-wrapper" className="gray-bg">
            <SearchBar />
            <div className="wrapper wrapper-content animated fadeInRight">
              <div className="row">
                <div className="col-lg-12">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }

}

Application.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object
};

export default connect()(Application);
