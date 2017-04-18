import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/orderActions';

import TextField from '../common/TextField.jsx';
import Spinner from '../common/spinner/';
import OrderTable from './OrderTable.jsx';

import styles from './orders.css';

const fullWidth = { width: '100%' };

export class Orders extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      orders: props.orders,
      filter: ''
    };

    this.searchOnChange = this.searchOnChange.bind(this);
  }

  componentWillMount() {
    const { orderActions } = this.props;
    orderActions.getAllOrders();
  }

  searchOnChange(event) {
    const { orders } = this.state;

    const filter = event.target.value
      .toLowerCase();

    const filteredOrders = orders
      .filter(order => order
        .orderStatusDescription
        .toLowerCase()
        .includes(filter));

    this.setState({
      filter,
      orders: filteredOrders
    });
  }

  render() {
    const { orders, loading } = this.props;

    const component = loading ?
      (
        <div className={styles['spinner-container']}>
          <div className={styles.spinner}>
            <Spinner size={130} />
          </div>
        </div>
      ) :
      (
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Order History</h5>
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
                      floatingLabelText="Filter Status" />
                  </div>
                </div>
                <OrderTable orders={orders} />
              </div>
            </div>
          </div>
        </div>
      );

    return component;
  }
}

Orders.propTypes = {
  orders: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  orderActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  
  return {
    orders: state.orders,
    loading: state.loading.loadingOrders
  };
}
function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(Orders), styles);
