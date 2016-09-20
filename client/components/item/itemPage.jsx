import React, { PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as itemActions from "../../actions/itemActions";

import TextInput from "../common/textInput.jsx";


class ItemPage extends React.Component {

    componentDidMount() {
        componentHandler.upgradeDom(); //eslint-disable-line no-undef
    }

    render() {
        return (
            <div className="row">

                <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Items</h5>
                        </div>
                        <div className="ibox-content">
                            <div className="row">
                                <div className="col-sm-3">
                                    <TextInput
                                        name="searchItems"
                                        label="search"
                                        placeholder="Search"
                                        />
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th />
                                            <th>Project </th>
                                            <th>Completed </th>
                                            <th>Task</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1">
                                                    <input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" />
                                                </label>
                                            </td>
                                            <td>Project<small>This is example of project</small></td>
                                            <td><span className="pie">0.52/1.561</span></td>
                                            <td>20%</td>
                                            <td>Jul 14, 2013</td>
                                            <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-2">
                                                    <input type="checkbox" id="checkbox-2" className="mdl-checkbox__input" />
                                                </label>
                                            </td>
                                            <td>Alpha project</td>
                                            <td><span className="pie">6,9</span></td>
                                            <td>40%</td>
                                            <td>Jul 16, 2013</td>
                                            <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-3">
                                                    <input type="checkbox" id="checkbox-3" className="mdl-checkbox__input" />
                                                </label>
                                            </td>
                                            <td>Betha project</td>
                                            <td><span className="pie">3,1</span></td>
                                            <td>75%</td>
                                            <td>Jul 18, 2013</td>
                                            <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-4">
                                                    <input type="checkbox" id="checkbox-4" className="mdl-checkbox__input" />
                                                </label>
                                            </td>
                                            <td>Gamma project</td>
                                            <td><span className="pie">4,9</span></td>
                                            <td>18%</td>
                                            <td>Jul 22, 2013</td>
                                            <td><a href="#"><i className="fa fa-check text-navy"></i></a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ItemPage.propTypes = {
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