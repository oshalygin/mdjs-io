import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './version.css';

class Version extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { version } = this.props;
    return (
      <div className={styles['package-version-container']}>
        <div className={styles['package-version']}>{version}</div>
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

export default CSSModules(connect(mapStateToProps)(Version, styles));
