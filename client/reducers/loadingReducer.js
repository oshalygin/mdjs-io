import * as actionTypes from "../actions/actionTypes"; //eslint-disable-line no-unused-vars
import initialState from "./initialState";

export default function loadingReducer(state = initialState.loading, action) {
    switch (action.type) {
        case actionTypes.LOADING_USER:
            {
                return {...state,
                    loadingUser: true
                };
            }
        case actionTypes.LOADING_CREATING_ITEM:
            {
                return {...state,
                    creatingItem: true
                };
            }
        case actionTypes.LOADING_CREATING_ITEM_SUCCESS:
            {
                return {...state,
                    creatingItem: false
                };
            }
        case actionTypes.LOADED_USER_SUCCESS:
            {
                return {...state,
                    loadingUser: false
                };
            }
        case actionTypes.LOADED_USER_FAILURE:
            {
                return {...state,
                    loadingUser: false
                };
            }
        default:
            {
                return state;
            }
    }
}