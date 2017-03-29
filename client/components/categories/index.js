import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/categoryActions';

import TextField from '../common/TextField.jsx';
import CategoriesTable from './CategoriesTable.jsx';

import styles from './categories.css';

const fullWidth = { width: '100%' };

export class Categories extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      categories: props.categories,
      filter: ''
    };

    this.deactivate = this.deactivate.bind(this);
    this.navigateToNewCategoryPage = this.navigateToNewCategoryPage.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  navigateToNewCategoryPage() {
    browserHistory.push('category');
  }

  deactivate(categoryId) {
    const { categories } = this.state;
    const { categoryActions } = this.props;

    const deactivatedCategory = categories
      .find(category => category.categoryID === categoryId);

    categoryActions.deactivateCategory(deactivatedCategory)
      .then(() => {
        //TODO: #68 - Add Snackbar control that indicates success
      })
      .catch(() => {
        //TODO: #68 - Add Snackbar control that indicates failure
      });
  }

  searchOnChange(event) {
    const { categories } = this.props;

    const filter = event.target.value
      .toLowerCase();
    
    const filteredCategories = categories.filter(category => category.categoryName.toLowerCase().includes(filter));

    this.setState({
      filter,
      categories: filteredCategories
    });
  }

  render() {
    const { categories } = this.state;
    
    return (
      <div className="row">
        <div className="col-lg-12">
          <RaisedButton
            label="New Category"
            className={styles.newCategoryButton}
            primary
            onClick={this.navigateToNewCategoryPage}
          />
        </div>
        <div className="col-lg-12">
          <div className="ibox float-e-margins">
            <div className="ibox-title">
              <h5>Item Categories</h5>
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
              <CategoriesTable
                categories={categories}
                deactivate={this.deactivate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  categoryActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}
function mapDispatchToProps(dispatch) {
  return {
    categoryActions: bindActionCreators(actionCreators, dispatch)
  };
}

export default CSSModules(connect(mapStateToProps, mapDispatchToProps)(Categories), styles);
