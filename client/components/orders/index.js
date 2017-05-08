import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/orderActions';

import TextField from '../common/TextField.jsx';
import Spinner from '../common/spinner/';
import Snackbar from '../common/snackbar';
import OrderList from './OrderList.jsx';

import styles from './orders.css';

const fullWidth = { width: '100%' };

export class Orders extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      orders: props.orders,
      filter: '',
      notification: false,
      notificationMessage: ''
    };

    this.searchOnChange = this.searchOnChange.bind(this);
    this.onExpandChange = this.onExpandChange.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.displayNotification = this.displayNotification.bind(this);
  }

  componentWillMount() {
    const { orderActions } = this.props;
    orderActions.getAllOrders();
  }


  closeNotification() {
    this.setState({ notification: false });
  }

  displayNotification(message) {
    this.setState({
      notification: true,
      notificationMessage: message
    });
  }

  onExpandChange(orderId) {
    const { orderActions, orders } = this.props;
    const selectedOrder = orders.find(order => order.orderID === orderId);
    
    if (selectedOrder.expanded) {
      return orderActions.hideOrderDetail(orderId)
        .catch((error) => {
          this.displayNotification(error);
        });
    }

    return orderActions.getOrderDetails(orderId)
      .catch((error) => {
        this.displayNotification(error.response.data);
      });
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
                <OrderList
                  onExpandChange={this.onExpandChange}
                  orders={orders} />
              </div>
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

    return component;
  }
}

Orders.propTypes = {
  orders: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  orderActions: PropTypes.object.isRequired
};

export function mapStateToProps(state) {

  return {
    orders: state.orders.orderList,
    loading: state.loading.loadingOrders
  };
}
function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(Orders), styles);
