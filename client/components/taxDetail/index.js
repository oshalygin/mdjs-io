import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/taxActions';
import Snackbar from '../common/snackbar';

import styles from './taxDetail.css';

import TaxDetailForm from './TaxDetailForm.jsx';
import Spinner from '../common/spinner/';

class TaxDetail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      tax: props.tax,
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

    const { tax, errors } = this.state;

    if (Array.isArray(payload)) {
      tax.items = payload;
      return this.setState({ tax });
    }

    if (payload) {
      const property = payload.name;
      tax[property] = payload.value;

      return this.setState({ tax });
    }

    const property = event.target.name;
    tax[property] = event.target.value;

    this.propertyIsValid(property, tax[property], errors);
    return this.setState({ tax });

  }

  closeNotification() {
    this.setState({ notification: false });
  }

  onSave() {
    const { tax } = this.state;
    const { taxActions } = this.props;
    if (!this.formIsValid()) {
      this.displayNotification('Form validation errors');
      return;
    }

    if (tax.taxID) {
      taxActions.updateTax(tax)
        .then(() => this.redirect())
        .catch((error) => {
          this.displayNotification(error.response.data);
        });
    } else {
      taxActions.createTax(tax)
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
    browserHistory.push('taxes');
  }

  propertyIsValid(property, value, errors) {
    const patternTest = property === 'taxName'
      ? new RegExp(/^[a-zA-Z]*$/)
      : new RegExp(/^[0-9]+([,.][0-9]+)?$/g);

    errors[property] = !patternTest.test(value) ? ' ' : false;
    this.setState({ errors });
  }

  formIsValid() {
    const { errors, tax } = this.state;

    // Check to see if there are any form validation errors
    for (const property in errors) {
      if (errors.hasOwnProperty(property)) {
        if (errors[property]) {
          return false;
        }
      }
    }
    
    // Check to see if the user selected items after checking "Individual Items"
    if (tax.taxTypeID && !tax.items.length) {
      return false;
    }

    // Check to see if the taxTypeID was set
    if (!tax.hasOwnProperty('taxTypeID')) {
      return false;
    }

    // tax name and value are required
    return !!tax.taxName && !!tax.value;
  }

  render() {
    const { taxHeading, loading, items } = this.props;
    const { tax, errors } = this.state;

    const formComponent = !loading.createUpdateTax ?
      (
        <TaxDetailForm
          tax={tax}
          items={items}
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
                <h5>{taxHeading}</h5>
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
              label="Save Tax"
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

TaxDetail.propTypes = {
  tax: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.object.isRequired,
  taxHeading: PropTypes.string.isRequired,
  taxActions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

TaxDetail.contextTypes = {
  router: PropTypes.object
};

export function mapStateToProps(state, ownProps) {

  let tax = {
    taxID: 0,
    taxName: '',
    value: 0,
    items: []
  };

  const { taxes } = state;
  const existingTax = taxes
    .find(stateTax => stateTax.taxID == ownProps.params.id || stateTax.taxID === tax.taxID); //eslint-disable-line

  if (!!existingTax) {
    tax = { ...existingTax };
  }

  const taxHeading = (existingTax && existingTax.taxID !== 0)
    ? 'Update Tax'
    : 'New Tax';

  return {
    tax,
    taxHeading,
    loading: state.loading,
    items: state.items,
    errors: {
      taxName: false
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    taxActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(TaxDetail), styles);
