import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/modifierActions';
import Snackbar from '../common/snackbar';

import styles from './modifierDetail.css';

import ModifierDetailForm from './ModifierDetailForm.jsx';
import Spinner from '../common/spinner/';

class ModifierDetail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      modifier: props.modifier,
      heading: '',
      notification: false,
      notificationMessage: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.redirect = this.redirect.bind(this);
    this.propertyIsValid = this.propertyIsValid.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.displayNotification = this.displayNotification.bind(this);
  }

  onChange(event, index, payload) {

    const { modifier, errors } = this.state;
    let property;

    if (payload) {
      property = payload.name;
      modifier[property] = payload.value;
      return this.setState({ modifier });
    }

    property = event.target.name;
    modifier[property] = event.target.value;

    this.propertyIsValid(property, modifier[property], errors);
    return this.setState({ modifier });

  }

  closeNotification() {
    this.setState({ notification: false });
  }

  onSave() {
    const { modifier } = this.state;
    const { modifierActions } = this.props;
    if (!this.formIsValid()) {
      this.displayNotification('Form validation errors');
      return;
    }

    if (modifier.modifierID) {
      modifierActions.updateModifier(modifier)
        .then(() => this.redirect())
        .catch((error) => {
          this.displayNotification(error.response.data);
        });
    } else {
      modifierActions.createModifier(modifier)
        .then(() => this.redirect())
        .catch((error) => {
          this.displayNotification(error.response.data);
        });
    }
  }

  displayNotification(message) {
    this.setState({
      notification: true,
      notificationMessage: message
    });
  }

  redirect() {
    browserHistory.push('modifiers');
  }

  propertyIsValid(property, value, errors) {
    const patternTest = property === 'modifierName'
      ? new RegExp(/^[a-zA-Z0-9,.% ]*$/)
      : new RegExp(/^[0-9]+([,.][0-9]+)?$/g);

    errors[property] = !patternTest.test(value) ? ' ' : false;
    this.setState({ errors });
  }

  formIsValid() {
    const { errors, modifier } = this.state;

    for (const property in errors) {
      if (errors.hasOwnProperty(property)) {
        if (errors[property]) {
          return false;
        }
      }
    }
    return !!modifier.modifierName && !!modifier.modifierPrice;
  }

  render() {
    const { modifierHeading, loading } = this.props;
    const { modifier, errors } = this.state;

    const formComponent = !loading.createUpdateModifier ?
      (
        <ModifierDetailForm
          modifier={modifier}
          onChange={this.onChange}
          errors={errors} />
      ) :
      (
        <div className="ibox-content">
          <div className="row">
            <div className={styles['spinner-container']}>
              <div className={styles.spinner}>
                <Spinner />
              </div>
            </div>
          </div>
        </div>
      );

    return (
      <div>
        <div className="row">
          <div className="col-sm-offset-3 col-sm-6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>{modifierHeading}</h5>
              </div>
              {formComponent}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-offset-3 col-sm-6">
            <div className={styles['controls-wrapper']}>
              <RaisedButton
                className={styles['left-control']}
                label="Back"
                secondary
                onClick={this.redirect} />
            </div>
            <RaisedButton
              className={styles['right-control']}
              label="Save Modifier"
              primary
              onClick={this.onSave} />
          </div>
        </div>
        <Snackbar
          open={this.state.notification}
          action="OK"
          message={this.state.notificationMessage}
          onActionTouchTap={this.closeNotification}
          onRequestClose={this.closeNotification} />
      </div>
    );
  }
}

ModifierDetail.propTypes = {
  modifier: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  modifierHeading: PropTypes.string.isRequired,
  modifierActions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

ModifierDetail.contextTypes = {
  router: PropTypes.object
};

export function mapStateToProps(state, ownProps) {

  let modifier = {
    modifierID: 0,
    modifierName: '',
    modifierPrice: ''
  };

  const { modifiers } = state;
  const existingModifier = modifiers
    .find(stateModifier => stateModifier.modifierID == ownProps.params.id || stateModifier.modifierID === modifier.modifierID); //eslint-disable-line

  if (!!existingModifier) {
    modifier = { ...existingModifier };
  }

  const modifierHeading = (existingModifier && existingModifier.modifierID !== 0)
    ? 'Update Modifier'
    : 'New Modifier';

  return {
    modifier,
    modifierHeading,
    loading: state.loading,
    errors: {
      modifierName: false
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    modifierActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(ModifierDetail), styles);
