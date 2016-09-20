import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as itemActions from "../../actions/itemActions";

import ItemForm from "./itemForm.jsx";


class ItemDetailPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            item: {},
            heading: ""
        };
    }

    componentDidUpdate() {
        componentHandler.upgradeDom(); //eslint-disable-line no-undef
    }

    componentDidMount() {
        componentHandler.upgradeDom(); //eslint-disable-line no-undef
    }

    render() {
        const {itemHeading, item} = this.props;
        return (
            <div className="row">
                <div className="col-lg-offset-3 col-lg-6">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>{itemHeading}</h5>
                        </div>
                        <ItemForm item={item} />
                    </div>
                </div>
                <div className="col-lg-offset-3 col-lg-6">
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                        Show All Items
                    </button>
                </div>
            </div>
        );
    }
}

ItemDetailPage.propTypes = {
    item: PropTypes.object.isRequired,
    itemHeading: PropTypes.string.isRequired
};

ItemDetailPage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let item = {
        itemID: "",
        label: "",
        name: "",
        lastUpdatedBy: null,
        price: null,
        color: null,
        photoURL: "",
        priceTypeId: null,
        itemCategoryID: null,
        isActive: null
    };
    let itemHeading = "New Item";


    if (ownProps.params.id) {
        const itemExists = state.items.find(existingItem => existingItem.itemID == ownProps.params.id); //eslint-disable-line eqeqeq

        if (itemExists) {
            item = itemExists;
            itemHeading = "Update Item";
        }
    }

    return {
        item: item,
        itemHeading: itemHeading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        itemActions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailPage);