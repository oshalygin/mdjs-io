import { combineReducers } from "redux";
import items from "./itemReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
    items,
    user
});

export default rootReducer;