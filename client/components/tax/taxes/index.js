import React from 'react';
import PropTypes from 'prop-types';

import history from '../../../utilities/history';
import RaisedButton from 'material-ui/RaisedButton';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/taxActions';

import TextField from '../../common/TextField.jsx';
import TaxTable from './TaxTable.jsx';

import './taxes.css';

const fullWidth = { width: '100%' };

export class Taxes extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      taxes: props.taxes,
      filter: '',
    };

    this.deactivate = this.deactivate.bind(this);
    this.navigateToNewTaxPage = this.navigateToNewTaxPage.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  navigateToNewTaxPage() {
    history.push('/dashboard/taxes/new');
  }

  deactivate(taxId) {
    const { taxes } = this.state;
    const { taxActions } = this.props;

    const deactivatedTax = taxes.find(tax => tax.taxID === taxId);

    taxActions
      .deactivateTax(deactivatedTax)
      .then(() => {
        //TODO: #68 - Add Snackbar control that indicates success
      })
      .catch(() => {
        //TODO: #68 - Add Snackbar control that indicates failure
      });
  }

  searchOnChange(event) {
    const { taxes } = this.props;

    const filter = event.target.value.toLowerCase();

    const filteredTaxes = taxes.filter(tax =>
      tax.taxName.toLowerCase().includes(filter),
    );

    this.setState({
      filter,
      taxes: filteredTaxes,
    });
  }

  render() {
    const { taxes } = this.props;

    return (
      <div className="row">
        <div className="col-lg-12">
          <RaisedButton
            label="New Tax"
            styleName="new-tax-button"
            primary
            onClick={this.navigateToNewTaxPage}
          />
        </div>
        <div className="col-lg-12">
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5>Taxes</h5>
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
              <TaxTable taxes={taxes} deactivate={this.deactivate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Taxes.propTypes = {
  taxes: PropTypes.array.isRequired,
  taxActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    taxes: state.taxes,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    taxActions: bindActionCreators(actionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Taxes);
