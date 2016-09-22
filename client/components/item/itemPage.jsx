import React, { PropTypes } from "react";
import { Link } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as itemActions from "../../actions/itemActions";

import TextInput from "../common/textInput.jsx";
import ItemTable from "./itemTable.jsx";

class ItemPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            items: [],
            query: ""
        };

        this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
    }

    componentDidUpdate() {
        componentHandler.upgradeDom(); //eslint-disable-line no-undef
    }

    componentDidMount() {
        componentHandler.upgradeDom(); //eslint-disable-line no-undef
    }

    checkboxChangeHandler(event) {
        const checkedItem = this.props.items
            .filter(item => item.itemID == event.target.id)[0]; //eslint-disable-line eqeqeq
        this.props.itemActions.itemChecked(checkedItem);
    }

    render() {
        const {items} = this.props;

        const newItemButtonDecorationAndOffset = {
            textDecoration: "none",
            marginBottom: "1.2em"
        };

        return (
            <div className="row">
                <div className="col-lg-12">
                    <Link to="item" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
                        style={newItemButtonDecorationAndOffset}>
                        New Item
                    </Link>
                </div>
                <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Items</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="row">
                                <div className="col-sm-3">
                                    <TextInput
                                        name="filteredItems"
                                        label="filter"
                                        placeholder="Filter"
                                        />
                                </div>
                            </div>
                            <ItemTable
                                items={items}
                                checked={this.checkboxChangeHandler} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ItemPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);