import React from 'react';
import PropTypes from 'prop-types';

import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/categoryActions';
import Snackbar from '../common/snackbar';

import './categoryDetail.css';

import CategoryDetailForm from './CategoryDetailForm.jsx';
import Spinner from '../common/spinner/';

class CategoryDetail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      category: props.category,
      heading: '',
      notification: false,
      notificationMessage: '',
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
    const { category, errors } = this.state;
    let property;

    if (payload) {
      property = payload.name;
      category[property] = payload.value;
      return this.setState({ category });
    }

    property = event.target.name;
    category[property] = event.target.value;

    this.propertyIsValid(property, category[property], errors);
    return this.setState({ category });
  }

  closeNotification() {
    this.setState({ notification: false });
  }

  onSave() {
    const { category } = this.state;
    const { categoryActions } = this.props;
    if (!this.formIsValid()) {
      this.displayNotification('Form validation errors');
      return;
    }

    if (category.categoryID) {
      categoryActions.triggerCategoryUpdate(category);
    } else {
      categoryActions.triggerCategoryCreation(category);
    }
  }

  displayNotification(message) {
    this.setState({
      notification: true,
      notificationMessage: message,
    });
  }

  redirect() {
    browserHistory.push('categories');
  }

  propertyIsValid(property, value, errors) {
    const patternTest =
      property === 'categoryName'
        ? new RegExp(/^[a-zA-Z0-9,. ]*$/)
        : new RegExp(/^[0-9]+([,.][0-9]+)?$/g);

    errors[property] = !patternTest.test(value) ? ' ' : false;
    this.setState({ errors });
  }

  formIsValid() {
    const { errors, category } = this.state;

    for (const property in errors) {
      if (errors.hasOwnProperty(property)) {
        if (errors[property]) {
          return false;
        }
      }
    }
    return !!category.categoryName;
  }

  render() {
    const { categoryHeading, loading } = this.props;
    const { category, errors } = this.state;

    const formComponent = !loading.createUpdateCategory
      ? <CategoryDetailForm
          category={category}
          onChange={this.onChange}
          errors={errors}
        />
      : <div className="ibox-content">
          <div className="row">
            <div styleName="spinner-container">
              <div styleName="spinner">
                <Spinner />
              </div>
            </div>
          </div>
        </div>;

    return (
      <div>
        <div className="row">
          <div className="col-sm-offset-3 col-sm-6">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>
                  {categoryHeading}
                </h5>
              </div>
              {formComponent}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-offset-3 col-sm-6">
            <div styleName="controls-wrapper">
              <RaisedButton
                styleName="left-control"
                label="Back"
                secondary
                onClick={this.redirect}
              />
            </div>
            <RaisedButton
              styleName="right-control"
              label="Save Category"
              primary
              onClick={this.onSave}
            />
          </div>
        </div>
        <Snackbar
          open={this.state.notification}
          action="OK"
          message={this.state.notificationMessage}
          onActionTouchTap={this.closeNotification}
          onRequestClose={this.closeNotification}
        />
      </div>
    );
  }
}

CategoryDetail.propTypes = {
  category: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  categoryHeading: PropTypes.string.isRequired,
  categoryActions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

CategoryDetail.contextTypes = {
  router: PropTypes.object,
};

export function mapStateToProps(state, ownProps) {
  let category = {
    categoryID: 0,
    categoryName: '',
  };

  const { categories } = state;
  const existingCategory = categories.find(
    stateCategory =>
      //eslint-disable-next-line eqeqeq
      stateCategory.categoryID == ownProps.params.id ||
      stateCategory.categoryID === category.categoryID,
  );

  if (!!existingCategory) {
    category = { ...existingCategory };
  }

  const categoryHeading =
    existingCategory && existingCategory.categoryID !== 0
      ? 'Update Category'
      : 'New Category';

  return {
    category,
    categoryHeading,
    loading: state.loading,
    errors: {
      categoryName: false,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoryActions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail);
