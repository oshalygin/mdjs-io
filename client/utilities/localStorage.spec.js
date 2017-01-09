import { expect } from "chai";
import { loadState, saveState } from "./localStorage";

describe("Local Storage", () => {
    global.localStorage = {
        getItem: function (key) {
            return JSON.stringify({
                [key]: {
                    items: [{ type: "Mexican" }]
                }
            });
        },
        setItem: function (key, object) {
            return { success: true, object };
        }
    };
    it("Loading the state properly returns the object from the key", () => {

        const actual = !!loadState().state.items;
        expect(actual).is.true; //eslint-disable-line no-unused-expressions

    });

    it("Persisting the state properly saves the object to the state", () => {
        const state = {
            items: [
                { type: "Mexican" }
            ]
        };
        saveState(state);
    });
});