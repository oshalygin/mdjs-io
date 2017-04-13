/* eslint-disable indent */
import * as actionTypes from '../actions/actionTypes'; //eslint-disable-line no-unused-vars
import initialState from './initialState';

export default function modifierReducer(state = initialState.modifiers, action) {
  switch (action.type) {
    case actionTypes.LOAD_MODIFIERS_SUCCESS: {
      return [...action.modifiers];
    }
    case actionTypes.MODIFIER_CREATED:
    case actionTypes.MODIFIER_UPDATED:
      {
        const modifiers = [...state];
        const currentModifierIndex = modifiers.findIndex(modifier => modifier.modifierID === action.modifier.modifierID);

        if (currentModifierIndex === -1) {
          return [...state, action.modifier];
        } else { //eslint-disable-line no-else-return
          modifiers.splice(currentModifierIndex, 1, action.modifier);
          return [...modifiers];
        }
      }
    case actionTypes.MODIFIER_DEACTIVATED_SUCCESS:
      {
        return state
          .filter(modifier => modifier.modifierID !== action.modifier.modifierID);
      }  
    default: {
      return state;
    }
  }
}
