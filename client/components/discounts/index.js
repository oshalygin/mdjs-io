import React from 'react';
import PropTypes from 'prop-types';

import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/discountActions';

import TextField from '../common/TextField.jsx';
import DiscountTable from './DiscountTable.jsx';

import './discounts.css';

const fullWidth = { width: '100%' };

export class Discounts extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      discounts: props.discounts,
      filter: '',
    };

    this.deactivate = this.deactivate.bind(this);
    this.navigateToNewDiscountPage = this.navigateToNewDiscountPage.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  navigateToNewDiscountPage() {
    browserHistory.push('discount');
  }

  deactivate(discountId) {
    const { discounts } = this.state;
    const { discountActions } = this.props;

    const deactivatedDiscount = discounts.find(
      discount => discount.discountID === discountId,
    );

    discountActions
      .deactivateDiscount(deactivatedDiscount)
      .then(() => {
        //TODO: #68 - Add Snackbar control that indicates success
      })
      .catch(() => {
        //TODO: #68 - Add Snackbar control that indicates failure
      });
  }

  searchOnChange(event) {
    const { discounts } = this.props;

    const filter = event.target.value.toLowerCase();

    const filteredDiscounts = discounts.filter(discount =>
      discount.discountName.toLowerCase().includes(filter),
    );

    this.setState({
      filter,
      discounts: filteredDiscounts,
    });
  }

  render() {
    const { discounts } = this.props;

    return (
      <div className="row">
        <div className="col-lg-12">
          <RaisedButton
            label="New Discount"
            styleName="new-discount-button"
            primary
            onClick={this.navigateToNewDiscountPage}
          />
        </div>
        <div className="col-lg-12">
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5>Discounts</h5>
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
              <DiscountTable
                discounts={discounts}
                deactivate={this.deactivate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Discounts.propTypes = {
  discounts: PropTypes.array.isRequired,
  discountActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    discounts: state.discounts,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    discountActions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discounts);
