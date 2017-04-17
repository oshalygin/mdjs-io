import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/itemActions';
import { itemPriceTypes } from '../../utilities/constants';
import Snackbar from '../common/snackbar';

import styles from './itemDetail.css';

import ItemDetailForm from './ItemDetailForm.jsx';
import Spinner from '../common/spinner/';

class ItemDetailPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: {},
      item: props.item,
      heading: '',
      notification: false,
      notificationMessage: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.redirect = this.redirect.bind(this);
    this.propertyIsValid = this.propertyIsValid.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.displayNotification = this.displayNotification.bind(this);
  }

  onChange(event, index, payload) {
    const { item, errors } = this.state;

    if (Array.isArray(payload)) {
      item.modifiers = payload;
      return this.setState({ item });
    }

    if (payload) {
      const property = payload.name;
      item[property] = payload.value;

      return this.setState({ item });
    }

    const property = event.target.name;
    item[property] = event.target.value;

    this.propertyIsValid(property, item[property], errors);
    return this.setState({ item });

  }

  closeNotification() {
    this.setState({ notification: false });
  }

  onSave() {
    const { item } = this.state;
    const { itemActions } = this.props;
    if (!this.formIsValid()) {
      this.displayNotification('Form validation errors');
      return;
    }

    if (item.itemID) {
      itemActions.updateItem(item)
        .then(() => this.redirect())
        .catch((error) => {
          this.displayNotification(error.response.data);
        });
    } else {
      itemActions.createItem(item)
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
    browserHistory.push('items');
  }

  propertyIsValid(property, value, errors) {
    const patternTest = property === 'name' || property === 'label'
      ? new RegExp(/^[a-zA-Z]*$/)
      : new RegExp(/^[0-9]+([,.][0-9]+)?$/g);

    errors[property] = !patternTest.test(value) ? ' ' : false;

    this.setState({ errors });
  }

  onDrop(files) {
    const { item } = this.state;

    item.file = files[0];
    item.photoURL = files[0].preview;
    this.setState({ item });
  }

  formIsValid() {
    const { errors, item } = this.state;

    for (const property in errors) {
      if (errors.hasOwnProperty(property)) {
        if (errors[property]) {
          return false;
        }
      }
    }
    return !!item.name && !!item.price;
  }

  render() {
    const { itemHeading, loading, categories, modifiers } = this.props;
    
    const { item, errors } = this.state;

    const formComponent = !loading.createUpdateItem ?
      (
        <ItemDetailForm
          item={item}
          categories={categories}
          modifiers={modifiers}
          onDrop={this.onDrop}
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
                <h5>{itemHeading}</h5>
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
              label="Save Item"
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

ItemDetailPage.propTypes = {
  item: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  modifiers: PropTypes.array.isRequired,
  loading: PropTypes.object.isRequired,
  itemHeading: PropTypes.string.isRequired,
  itemActions: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

ItemDetailPage.contextTypes = {
  router: PropTypes.object
};

export function mapStateToProps(state, ownProps) {

  const defaultPriceType = itemPriceTypes[0].value; // Each, value = 0
  let item = {
    itemID: 0,
    name: '',
    label: '',
    price: 0,
    color: 0,
    photoURL: '',
    file: null,
    itemCategoryID: 0,
    isActive: 1,
    priceTypeID: defaultPriceType
  };

  const { items } = state;
  const existingItem = items
    .find(stateItem => stateItem.itemID == ownProps.params.id || stateItem.itemID === item.itemID); //eslint-disable-line eqeqeq

  if (!!existingItem) {
    item = { ...existingItem };
  }

  const itemHeading = (existingItem && existingItem.itemID !== 0)
    ? 'Update Item'
    : 'New Item';

  return {
    item,
    
    itemHeading,
    loading: state.loading,
    errors: {
      name: false,
      label: false,
      price: false
    },
    categories: state.categories,
    modifiers: state.modifiers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    itemActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(ItemDetailPage), styles);
