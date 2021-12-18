import { jest, expect, describe, it } from "@jest/globals";

import {
    typeReducer,
    TypeState,
    LoadTypesAction,
    DoneLoadingTypesAction,
    TypesErrorAction,
} from "./useTypeReducer.js";

import { allTypes } from "../test-helpers/fixtures/activity-types.js";
import { expectActivityTypeArraysEqual } from "../test-helpers/util/expect-helpers.js";

/**
 * @param {TypeState} expected
 * @param {TypeState} actual
 */
const expectTypeStatesEqual = (expected, actual) => {
    expectActivityTypeArraysEqual(expected, actual);
    expect(actual.isLoading).toBe(expected.isLoading);
    expect(actual.error).toEqual(expected.error);
};

describe("typeReducer", () => {
    it("throws if null state", () => {
        const state = null;
        const action = new LoadTypesAction();

        expect(() => {
            typeReducer(state, action);
        }).toThrow(Error);
    });

    it("throws if no action", () => {
        const state = new TypeState();
        const action = null;

        expect(() => {
            typeReducer(state, action);
        }).toThrow(Error);
    });

    describe("loading types action", () => {
        it("returns TypeState with correct fields", () => {
            const state = new TypeState();
            const action = new LoadTypesAction();

            // Should set isLoading to true, not modify types
            const expected = new TypeState(allTypes, true);

            const actual = typeReducer(state, action);

            expectTypeStatesEqual(expected, actual);
        });

        it("does not modify original state", () => {
            const state = new TypeState(allTypes, false);
            const action = new LoadTypesAction();
            const originalState = { ...state };

            typeReducer(state, action);

            expectTypeStatesEqual(originalState, state);
        });
    });

    describe("done loading types action", () => {
        it("returns TypeState with correct fields", () => {
            const state = new TypeState([], true);
            const action = new DoneLoadingTypesAction([...allTypes]);
            const expected = new TypeState(allTypes, false);

            const actual = typeReducer(state, action);

            expectTypeStatesEqual(expected, actual);
        });

        it("does not modify original state", () => {
            const state = new TypeState([], true);
            const action = new DoneLoadingTypesAction([...allTypes]);
            const originalState = { ...state };

            typeReducer(state, action);

            expectTypeStatesEqual(originalState, state);
        });
    });

    describe("error action", () => {
        it("returns TypeState with correct fields", () => {
            const state = new TypeState(allTypes, true);
            const error = new Error();
            const action = new TypesErrorAction(error);
            const expected = new TypeState(allTypes, false, error);

            const actual = typeReducer(state, action);

            expectTypeStatesEqual(expected, actual);
        });

        it("does not modify original state", () => {
            const state = new TypeState(allTypes, true);
            const error = new Error();
            const action = new TypesErrorAction(error);
            const originalState = { ...state };

            typeReducer(state, action);

            expectTypeStatesEqual(originalState, state);
        });
    });
});
