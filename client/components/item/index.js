import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import toastr from 'toastr';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../../actions/itemActions';


import TextField from '../common/TextField.jsx';
import ItemTable from './ItemTable.jsx';

import styles from './item.css';

const fullWidth = { width: '100%' };

export class Item extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: [],
      query: ''
    };

    this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.navigateToNewItemPage = this.navigateToNewItemPage.bind(this);
  }

  navigateToNewItemPage() {
    browserHistory.push('item');
  }

  checkboxChangeHandler(event) {
    const checkedItem = this.props.items
      .filter(item => item.itemID == event.target.id)[0]; //eslint-disable-line eqeqeq
    this.props.itemActions.itemChecked(checkedItem);
  }

  deactivate(event) {
    const deactivatedItem = this.props.items
      .filter(item => item.itemID == event.target.name)[0]; //eslint-disable-line eqeqeq

    this.props.itemActions.deactivateItem(deactivatedItem)
      .then(() => {

      })
      .catch(() => {
        toastr.error(`could not deactivate the item, ${deactivatedItem.label}`);
      });
  }

  render() {
    const { items } = this.props;

    return (
      <div className="row">
        <div className="col-lg-12">
          <RaisedButton
            label="New Item"
            className={styles.newItemButton}
            primary
            onClick={this.navigateToNewItemPage}
          />
        </div>
        <div className="col-lg-12">
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5>Items</h5>
            </div>
            <div className="ibox-content">
              <div className="row">
                <div className="col-sm-3">
                  <TextField
                    name="username"
                    type="text"
                    onChange={this.onChange}
                    errorText={this.state.error}
                    style={fullWidth}
                    floatingLabelText="Filter" />
                </div>
              </div>
              <ItemTable
                items={items}
                checked={this.checkboxChangeHandler}
                deactivate={this.deactivate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  items: PropTypes.array.isRequired,
  itemActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    items: state.items
  };
}
function mapDispatchToProps(dispatch) {
  return {
    itemActions: bindActionCreators(itemActions, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(Item), styles);
