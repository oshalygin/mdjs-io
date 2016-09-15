import * as actionTypes from "./actionTypes";
import { xhrCallFailure } from "./xhrStatusActions"; //eslint-disable-line

export function loadModifiersSuccess(modifiers) {
    return {
        type: actionTypes.LOAD_MODIFIERS_SUCCESS,
        modifiers
    };
}
