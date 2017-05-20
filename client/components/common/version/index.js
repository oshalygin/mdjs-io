import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import './version.css';

class Version extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { version } = this.props;
    return (
      <div styleName="package-version-container">
        <div styleName="package-version">{version}</div>
      </div>
    );
  }
}

Version.propTypes = {
  version: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    version: state.version
  };
}

export default connect(mapStateToProps)(Version);
