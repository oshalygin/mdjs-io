import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/modifierActions';

import TextField from '../common/TextField.jsx';
import ModifierTable from './ModifierTable.jsx';

import styles from './modifiers.css';

const fullWidth = { width: '100%' };

export class Modifiers extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modifiers: props.modifiers,
      filter: ''
    };

    this.deactivate = this.deactivate.bind(this);
    this.navigateToNewModifierPage = this.navigateToNewModifierPage.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  navigateToNewModifierPage() {
    browserHistory.push('modifier');
  }

  deactivate(modifierId) {
    const { modifiers } = this.state;
    const { modifierActions } = this.props;

    const deactivatedModifier = modifiers
      .find(modifier => modifier.modifierID === modifierId);

    modifierActions.deactivateModifier(deactivatedModifier)
      .then(() => {
        //TODO: #68 - Add Snackbar control that indicates success
      })
      .catch(() => {
        //TODO: #68 - Add Snackbar control that indicates failure
      });
  }

  searchOnChange(event) {
    const { modifiers } = this.props;

    const filter = event.target.value
      .toLowerCase();

    const filteredModifiers = modifiers
      .filter(modifier => modifier
        .modifierName
        .toLowerCase()
        .includes(filter));

    this.setState({
      filter,
      modifiers: filteredModifiers
    });
  }

  render() {
    const { modifiers } = this.props;

    return (
      <div className="row">
        <div className="col-lg-12">
          <RaisedButton
            label="New Modifier"
            className={styles['new-modifier-button']}
            primary
            onClick={this.navigateToNewModifierPage}
          />
        </div>
        <div className="col-lg-12">
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5>Modifiers</h5>
            </div>
            <div className="ibox-content">
              <div className="row">
                <div className="col-sm-3">
                  <TextField
                    name="filter"
                    type="text"
                    onChange={this.searchOnChange}
                    errorText={this.state.error}
                    style={fullWidth}
                    floatingLabelText="Filter" />
                </div>
              </div>
              <ModifierTable
                modifiers={modifiers}
                deactivate={this.deactivate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modifiers.propTypes = {
  modifiers: PropTypes.array.isRequired,
  modifierActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    modifiers: state.modifiers
  };
}
function mapDispatchToProps(dispatch) {
  return {
    modifierActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(Modifiers), styles);
