import { combineReducers } from "redux";
import items from "./itemReducer";
import user from "./userReducer";
import categories from "./categoriesReducer";

const rootReducer = combineReducers({
    user,
    categories,
    items
});

export default rootReducer;