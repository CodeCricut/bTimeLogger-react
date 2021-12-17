import { useReducer } from "react";
import { ActivityModel } from "./ActivityModel";

class ActivityState {
    /**
     * All loaded activities in the current state.
     * @param {Array<ActivityModel>}
     */
    activities;

    /**
     * Are activities loaded.
     * @type {boolean}
     */
    isLoading;

    /**
     * The error, if any, associated with the activities.
     * @type {Error}
     */
    error;

    constructor(activities = [], isLoading = false, error = null) {
        this.activities = activities;
        this.isLoading = isLoading;
        this.error = error;
    }
}

class ActivityReducerAction {
    static LOADING_ACTIVITIES = "LOADING_ACTIVITIES";
    static DONE_LOADING_ACTIVITIES = "DONE_LOADING_ACTIVITIES";
    static ACTIVITIES_ERROR = "ACTIVITIES_ERROR";

    /**
     * The type of action to take
     * @type {string}
     */
    type;

    /** The data associated with the action. Type is dependent upon the type of action. */
    payload;

    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}

/** Action for ActivityReducer to load activities. */
class LoadActivitiesAction extends ActivityReducerAction {
    constructor() {
        super(ActivityReducerAction.LOADING_ACTIVITIES, null);
    }
}

/** Action for ActivityReducer indicating activites are done being loaded. */
class DoneLoadingActivitesAction extends ActivityReducerAction {
    /**
     * @param {Array<ActivityModel>} activities The activities which were loaded
     */
    constructor(activities) {
        super(ActivityReducerAction.DONE_LOADING_ACTIVITIES, activities);
    }
}

/** Action for ActivityReducer indicating there was is an error in the activity state. */
class ActivitiesErrorAction extends ActivityReducerAction {
    /**
     * @param {Error} error The error that occured in the activity state.
     */
    constructor(error) {
        super(ActivityReducerAction.ACTIVITIES_ERROR, error);
    }
}

const initialState = new ActivityState();

/**
 * Reducer function for modifying the state with an action. Original state will be unmodified and a new state will be returned.
 * @param {ActivityState} state The previous state which will remain unmodified.
 * @param {ActivityReducerAction} action The action to apply to the state.
 * @returns {ActivityState} The new state which is the result of the action applied to the state.
 */
const activityReducer = (state, action) => {
    const { type, payload } = action;
    if (!state) throw new Error("No state passed to activity-reducer.");
    if (!type) throw new Error("Called reducer without action type.");

    switch (type) {
        case ActivityReducerAction.LOADING_ACTIVITIES: {
            const activities = [...state.activities];
            const isLoading = true;
            return new ActivityState(activities, isLoading);
        }
        case ActivityReducerAction.DONE_LOADING_ACTIVITIES: {
            const activities = [...payload];
            const isLoading = false;
            return new ActivityState(activities, isLoading);
        }
        case ActivityReducerAction.ACTIVITIES_ERROR: {
            const activities = [...state.activities];
            const isLoading = false;
            const error = payload;
            return new ActivityState(activities, isLoading, error);
        }
        default:
            throw new Error("Invalid action type.");
    }
};

/**
 *
 * @returns {[ActivityState, Dispatch<ActivityReducerAction>]}
 */
const useActivityReducer = () => useReducer(activityReducer, initialState);

export {
    activityReducer,
    useActivityReducer,
    ActivityState,
    LoadActivitiesAction,
    DoneLoadingActivitesAction,
    ActivitiesErrorAction,
};
