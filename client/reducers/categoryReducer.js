/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function categoryReducer(state = initialState.categories, action) {
  switch (action.type) {
    case actionTypes.LOAD_CATEGORIES_SUCCESS: {
      return [...action.categories];
    }
    case actionTypes.CATEGORY_CREATED:
    case actionTypes.CATEGORY_UPDATED:
      {
        const categories = [...state];
        const currentCategoryIndex = categories.findIndex(category => category.categoryID === action.category.categoryID);

        if (currentCategoryIndex === -1) {
          return [...state, action.category];
        } else { //eslint-disable-line no-else-return
          categories.splice(currentCategoryIndex, 1, action.category);
          return [...categories];
        }
      }  
    case actionTypes.CATEGORY_DEACTIVATED_SUCCESS:
      {
        return state
          .filter(category => category.categoryID !== action.category.categoryID);
      }  
    default: {
      return state;
    }
  }
}
