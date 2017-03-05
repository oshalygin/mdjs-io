import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/itemActions';


import TextField from '../common/TextField.jsx';
import ItemTable from './ItemTable.jsx';

import styles from './item.css';

const fullWidth = { width: '100%' };

export class Item extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: props.items,
      query: '',
      filter: ''
    };

    this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.navigateToNewItemPage = this.navigateToNewItemPage.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  navigateToNewItemPage() {
    browserHistory.push('item');
  }

  checkboxChangeHandler(event) { //eslint-disable-line no-unused-vars
    //TODO: #17 - Handle Bulk Item Actions
  }

  deactivate(itemId) {
    const { items } = this.state;
    const { itemActions } = this.props;
    
    const deactivatedItem = items
      .filter(item => item.itemID === itemId)[0];
    
    itemActions.deactivateItem(deactivatedItem)
      .then(() => {
        //TODO: #68 - Add Snackbar control that indicates success
      })
      .catch(() => {
        //TODO: #68 - Add Snackbar control that indicates failure
      });
  }

  searchOnChange(event) {
    const newFilter = event.target.value;
    this.setState({filter: newFilter}); //TODO:  #16 - Filter functionality
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
                    name="filter"
                    type="text"
                    onChange={this.searchOnChange}
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
    itemActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(Item), styles);
