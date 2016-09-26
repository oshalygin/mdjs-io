import React, { PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as itemActions from "../../actions/itemActions";
import { itemPriceTypes } from "../../utilities/constants";
import toastr from "toastr";

import ItemDetailForm from "./itemDetailForm.jsx";
import Spinner from "../common/spinner.jsx";

class ItemDetailPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            errors: {},
            item: {},
            heading: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.redirect = this.redirect.bind(this);
        this.propertyIsValid = this.propertyIsValid.bind(this);
        this.formIsValid = this.formIsValid.bind(this);
    }

    componentDidMount() {
        componentHandler.upgradeDom(); //eslint-disable-line no-undef

    }

    componentDidUpdate() {
        componentHandler.upgradeDom(); //eslint-disable-line no-undef
    }

    onChange(event) {
        let {item} = this.props;

        if (event.target.tagName === "LI") {
            const property = event.target.attributes.getNamedItem("name").value;
            item[property] = event.target.attributes.getNamedItem("data-value").value;
            this.setState({});
        } else {
            const property = event.target.name;
            const pattern = event.target.pattern;
            item[property] = event.target.value;
            this.propertyIsValid(property, item[property], pattern);
        }
    }

    onSave() {
        const { item } = this.props;
        if (!this.formIsValid()) {
            toastr.error("Form Validation Errors!");
            return;
        }

        this.props.itemActions.createOrUpdateItem(item)
            .then(() => this.redirect())
            .catch(error => toastr.error(error));

    }

    redirect() {
        this.context.router.push("/items");
    }

    propertyIsValid(property, value, pattern) {
        let {errors} = this.props;
        const regexPattern = pattern.replace("\"", "");
        const patternTest = new RegExp(regexPattern);

        errors[property] = !patternTest.exec(value)[0];
        this.setState({});
    }

    formIsValid() {
        let {errors, item} = this.props;

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
        const {itemHeading, item, errors, loading} = this.props;

        let formComponent = !loading.createUpdateItem
            ? (<ItemDetailForm item={item} onChange={this.onChange} errors={errors} />)
            : (
                <div className="ibox-content">
                    <div className="row">
                        <div className="col-md-12">
                            <Spinner />
                        </div>
                    </div>
                </div>
            );

        return (
            <div className="row">
                <div className="col-lg-offset-3 col-lg-6">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>{itemHeading}</h5>
                        </div>
                        {formComponent}
                    </div>
                </div>
                <div className="col-lg-offset-3 col-lg-3">
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={this.onSave}>
                        Save Item
                    </button>
                </div>
                <div className="col-lg-offset-1 col-lg-2 text-right">
                    <Link to="items" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                        View All Items
                    </Link>
                </div>
            </div>
        );
    }
}

ItemDetailPage.propTypes = {
    item: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
    itemHeading: PropTypes.string.isRequired,
    itemActions: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

ItemDetailPage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let item = {
        name: "",
        label: "",
        price: 0,
        color: null,
        photoURL: "",
        itemCategoryID: null,
        isActive: null,
        priceTypeID: itemPriceTypes[0].value
    };

    let itemHeading = "New Item";

    if (ownProps.params.id) {
        const {items} = state;
        const existingItem = items.filter(stateItem => stateItem.itemID == ownProps.params.id)[0]; //eslint-disable-line eqeqeq

        if (!!existingItem) {
            item = Object.assign({}, existingItem);
            itemHeading = "Update Item";
        }
    }

    return {
        item: item,
        itemHeading: itemHeading,
        loading: state.loading,
        errors: {
            name: false,
            label: false,
            price: false
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        itemActions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailPage);