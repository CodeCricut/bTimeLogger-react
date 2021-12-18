import {
    ActivitiesErrorAction,
    activityReducer,
    ActivityState,
    DoneLoadingActivitesAction,
    LoadActivitiesAction,
} from "./useActivityReducer";

import { allActivities } from "../test-helpers/fixtures/activities.js";
import { expectActivitiesArrayEqual } from "../test-helpers/util/expect-helpers.js";

/**
 * @param {ActivityState} expected
 * @param {ActivityState} actual
 */
const expectActivityStatesEqual = (expected, actual) => {
    expectActivitiesArrayEqual(expected.activities, actual.activities);
    expect(actual.isLoading).toBe(expected.isLoading);
    expect(actual.error).toEqual(expected.error);
};

describe("activityReducer", () => {
    it("throws if null state", () => {
        const state = null;
        const action = new LoadActivitiesAction();

        expect(() => {
            activityReducer(state, action);
        }).toThrow(Error);
    });

    it("throws if no action", () => {
        const state = new ActivityState();
        const action = null;

        expect(() => {
            activityReducer(state, action);
        }).toThrow(Error);
    });

    describe("loading activities action", () => {
        it("returns ActivityState with correct fields", () => {
            const state = new ActivityState(allActivities, false);
            const action = new LoadActivitiesAction();
            // Should set isLoading to true; not modify activities
            const expected = new ActivityState(allActivities, true);

            const actual = activityReducer(state, action);

            expectActivityStatesEqual(expected, actual);
        });

        it("does not modify original state", () => {
            const state = new ActivityState(allActivities, false);
            const action = new LoadActivitiesAction();
            const originalState = { ...state };

            activityReducer(state, action);

            expectActivityStatesEqual(originalState, state);
        });
    });

    describe("done loading activites action", () => {
        it("returns ActivityState with correct fields", () => {
            const state = new ActivityState([], true);
            const action = new DoneLoadingActivitesAction([...allActivities]);
            const expected = new ActivityState(allActivities, false);

            const actual = activityReducer(state, action);

            expectActivityStatesEqual(expected, actual);
        });

        it("does not modify original state", () => {
            const state = new ActivityState([], true);
            const action = new DoneLoadingActivitesAction([...allActivities]);
            const originalState = { ...state };

            activityReducer(state, action);

            expectActivityStatesEqual(originalState, state);
        });
    });

    describe("error action", () => {
        it("returns ActivityState with correct fields", () => {
            const state = new ActivityState(allActivities, true);
            const error = new Error("error");
            const action = new ActivitiesErrorAction(error);
            const expected = new ActivityState(allActivities, false, error);

            const actual = activityReducer(state, action);

            expectActivityStatesEqual(expected, actual);
        });

        it("does not modify original state", () => {
            const state = new ActivityState(allActivities, true);
            const error = new Error("error");
            const action = new ActivitiesErrorAction(error);
            const originalState = { ...state };

            activityReducer(state, action);

            expectActivityStatesEqual(originalState, state);
        });
    });
});
