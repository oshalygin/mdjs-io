/* eslint-disable no-console */
import { loadState } from "./localStorage";
const initialState = loadState();

export default {
    items: !!initialState && initialState.items
        ? initialState.items
        : []
};