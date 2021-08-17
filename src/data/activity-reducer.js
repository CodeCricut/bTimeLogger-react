import { v4 as uuid } from "uuid";

const START_ACTIVITY = "START_ACTIVITY",
    CREATE_COMPLETED_ACTIVITY = "CREATE_COMPLETED_ACTIVITY",
    STOP_ACTIVITY = "STOP_ACTIVITY",
    RESUME_ACTIVITY = "RESUME_ACTIVITY",
    TRASH_ACTIVITY = "REMOVE_ACTIVITY";

const startActivity = (state, activity) => {
    if (!activity) throw new Error("Tried to start null activity.");
    if (!activity.type)
        throw new Error("Tried to start acitivity without type.");

    const newActivity = {
        ...activity,
        startTime: new Date(),
        endTime: null,
        id: uuid(),
        trashed: false,
    };
    if (!activity.comment) newActivity.comment = "";

    return [...state, newActivity];
};

const createCompletedActivity = (state, activity) => {
    if (!activity) throw new Error("Tried to start null activity.");
    if (!activity.type)
        throw new Error("Tried to start acitivity without type.");
    if (!activity.endTime)
        throw new Error("Tried creating completed activity without endTime.");

    const newActivity = {
        ...activity,
        id: uuid(),
        trashed: false,
    };
    if (!activity.comment) newActivity.comment = "";
    if (!activity.startTime) newActivity.startTime = new Date();
    if (!activity.endTime) newActivity.endTime = new Date();

    return [...state, newActivity];
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case START_ACTIVITY:
            return startActivity(state, payload);
        case CREATE_COMPLETED_ACTIVITY:
            return createCompletedActivity(state, payload);
        // TODO other types
        default:
            return state; // normally I would prefer to throw error, but with a combined-reducer setup,
        // the wrong reducer may be used for an action
    }
};

export default reducer;
export {
    START_ACTIVITY,
    CREATE_COMPLETED_ACTIVITY,
    STOP_ACTIVITY,
    RESUME_ACTIVITY,
    TRASH_ACTIVITY,
};
