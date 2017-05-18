import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/discountActions';
import Snackbar from '../common/snackbar';

import styles from './discountDetail.css';

import DiscountDetailForm from './DiscountDetailForm.jsx';
import Spinner from '../common/spinner/';

class DiscountDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      discount: props.discount,
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

    const { discount, errors } = this.state;

    if (Array.isArray(payload)) {
      discount.items = payload;
      return this.setState({ discount });
    }

    if (payload) {
      const property = payload.name;
      discount[property] = payload.value;

      return this.setState({ discount });
    }

    const property = event.target.name;
    discount[property] = event.target.value;

    this.propertyIsValid(property, discount[property], errors);
    return this.setState({ discount });

  }

  closeNotification() {
    this.setState({ notification: false });
  }

  onSave() {
    const { discount } = this.state;
    const { discountActions } = this.props;
    if (!this.formIsValid()) {
      this.displayNotification('Form validation errors');
      return;
    }

    if (discount.discountID) {
      discountActions.updateDiscount(discount)
        .then(() => this.redirect())
        .catch((error) => {
          this.displayNotification(error.response.data);
        });
    } else {
      discountActions.createDiscount(discount)
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
    browserHistory.push('discounts');
  }

  propertyIsValid(property, value, errors) {
    const patternTest = property === 'discountName'
      ? new RegExp(/^[a-zA-Z0-9,.% ]*$/)
      : new RegExp(/^[0-9]+([,.][0-9]+)?$/g);

    errors[property] = !patternTest.test(value) ? ' ' : false;
    this.setState({ errors });
  }

  formIsValid() {
    const { errors, discount } = this.state;

    // Check to see if there are any form validation errors
    for (const property in errors) {
      if (errors.hasOwnProperty(property)) {
        if (errors[property]) {
          return false;
        }
      }
    }

    // Check to see if the user selected items after checking "Individual Items"
    if (discount.applyTypeID && !discount.items.length) {
      return false;
    }

    // Check to see if the applyTypeID was set
    if (!discount.hasOwnProperty('applyTypeID')) {
      return false;
    }

    // discount name and value are required
    return !!discount.discountName && !!discount.value;
  }

  render() {
    const { discountHeading, loading, items } = this.props;
    const { discount, errors } = this.state;

    const formComponent = !loading.createUpdateDiscount ?
      (
        <DiscountDetailForm
          discount={discount}
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
                <h5>{discountHeading}</h5>
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
              label="Save Discount"
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

DiscountDetail.propTypes = {
  discount: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.object.isRequired,
  discountHeading: PropTypes.string.isRequired,
  discountActions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

DiscountDetail.contextTypes = {
  router: PropTypes.object
};

export function mapStateToProps(state, ownProps) {

  let discount = {
    discountID: 0,
    discountName: '',
    discountTypeID: 0,
    value: 0,
    items: []
  };

  const { discounts } = state;
  const existingDiscount = discounts
    .find(stateDiscount => stateDiscount.discountID == ownProps.params.id || stateDiscount.discountID === discount.discountID); //eslint-disable-line

  if (!!existingDiscount) {
    discount = { ...existingDiscount };
  }

  const discountHeading = (existingDiscount && existingDiscount.discountID !== 0)
    ? 'Update Discount'
    : 'New Discount';

  return {
    discount,
    discountHeading,
    loading: state.loading,
    items: state.items,
    errors: {
      discountName: false
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    discountActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(DiscountDetail), styles);
