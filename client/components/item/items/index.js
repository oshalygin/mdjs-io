import React from 'react';
import PropTypes from 'prop-types';

import history from '../../../utilities/history';
import RaisedButton from 'material-ui/RaisedButton';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/itemActions';

import TextField from '../../common/TextField.jsx';
import ItemsTable from './ItemsTable.jsx';

import './items.css';

const fullWidth = { width: '100%' };

export class Items extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: props.items,
      query: '',
      filter: '',
    };

    this.deactivate = this.deactivate.bind(this);
    this.navigateToNewItemPage = this.navigateToNewItemPage.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  navigateToNewItemPage() {
    history.push('/dashboard/items/new');
  }

  deactivate(itemId) {
    const { items } = this.state;
    const { itemActions } = this.props;

    const deactivatedItem = items.find(item => item.itemID === itemId);

    itemActions
      .deactivateItem(deactivatedItem)
      .then(() => {
        //TODO: #68 - Add Snackbar control that indicates success
      })
      .catch(() => {
        //TODO: #68 - Add Snackbar control that indicates failure
      });
  }

  searchOnChange(event) {
    const { items } = this.props;

    const filter = event.target.value.toLowerCase();
    const filteredItems = items.filter(item =>
      item.label.toLowerCase().includes(filter),
    );

    this.setState({
      filter,
      items: filteredItems,
    });
  }

  render() {
    const { items } = this.props;

    return (
      <div className="row">
        <div className="col-lg-12">
          <RaisedButton
            label="New Item"
            styleName="newItemButton"
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
                    floatingLabelText="Filter"
                  />
                </div>
              </div>
              <ItemsTable items={items} deactivate={this.deactivate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Items.propTypes = {
  items: PropTypes.array.isRequired,
  itemActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    itemActions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
