// import { v4 as uuid } from "uuid";

// const START_ACTIVITY = "START_ACTIVITY",
//     CREATE_COMPLETED_ACTIVITY = "CREATE_COMPLETED_ACTIVITY",
//     STOP_ACTIVITY = "STOP_ACTIVITY",
//     RESUME_ACTIVITY = "RESUME_ACTIVITY",
//     TRASH_ACTIVITY = "REMOVE_ACTIVITY",
//     EDIT_ACTIVITY = "EDIT_ACTIVITY";

// const startActivity = (state, activity) => {
//     try {
//         if (!activity) throw new Error("Tried to start null activity.");
//         if (!activity.type)
//             throw new Error("Tried to start acitivity without type.");

//         // make api call
//         const newActivity = {
//             ...activity,
//             startTime: new Date(),
//             endTime: null,
//             trashed: false,
//         };
//         if (!activity.comment) newActivity.comment = "";
//         if (!activity._id) newActivity._id = uuid();

//         return [...state, newActivity];
//     } catch (e) {
//         return { ...state, loading: false, error: e };
//     }
// };

// const createCompletedActivity = (state, activity) => {
//     if (!activity) throw new Error("Tried to start null activity.");
//     if (!activity.type)
//         throw new Error("Tried to start acitivity without type.");
//     if (!activity.endTime)
//         throw new Error("Tried creating completed activity without endTime.");
//     if (!activity.startTime)
//         throw new Error("Tried creating completed activity without startTime.");

//     const newActivity = {
//         ...activity,
//         trashed: false,
//     };
//     if (!activity.comment) newActivity.comment = "";
//     if (!activity._id) newActivity._id = new Date();

//     return [...state, newActivity];
// };

// const stopActivity = (state, activityId) => {
//     if (!activityId) throw new Error("Tried stopping activity with null id");

//     const activity = state.find((act) => act._id === activityId);
//     if (!activity) throw new Error("Tried stopping activity with invalid id.");

//     const allButActivity = state.filter((act) => act._id !== activity._id);

//     const stoppedActivity = {
//         ...activity,
//         endTime: new Date(),
//     };

//     return [...allButActivity, stoppedActivity];
// };

// const resumeActivity = (state, activityId) => {
//     if (!activityId) throw new Error("Tried resuming activity with null id");

//     const activity = state.find((act) => act._id === activityId);
//     if (!activity) throw new Error("Tried resuming activity with invalid id.");

//     const allButActivity = state.filter((act) => act._id !== activity._id);

//     const resumedActivity = {
//         ...activity,
//         endTime: null,
//     };

//     return [...allButActivity, resumedActivity];
// };

// const trashActivity = (state, activityId) => {
//     if (!activityId) throw new Error("Tried trashing activity with null id");

//     const activity = state.find((act) => act._id === activityId);
//     if (!activity) throw new Error("Tried resuming activity with invalid id.");

//     const allButActivity = state.filter((act) => act._id !== activity._id);

//     const trashedActivity = {
//         ...activity,
//         trashed: true,
//     };

//     return [...allButActivity, trashedActivity];
// };

// const editActivity = (state, updatedActivity) => {
//     if (!updatedActivity) throw new Error("Tried editing null activity");

//     const activity = state.find((act) => act._id === updatedactivity._id);
//     if (!activity) throw new Error("Tried editing activity with invalid id.");

//     const allButActivity = state.filter((act) => act.id !== activity._id);

//     return [...allButActivity, updatedActivity];
// };

// const reducer = (state, { type, payload }) => {
//     switch (type) {
//         case START_ACTIVITY:
//             return startActivity(state, payload);
//         case CREATE_COMPLETED_ACTIVITY:
//             return createCompletedActivity(state, payload);
//         case STOP_ACTIVITY:
//             return stopActivity(state, payload);
//         case RESUME_ACTIVITY:
//             return resumeActivity(state, payload);
//         case TRASH_ACTIVITY:
//             return trashActivity(state, payload);
//         case EDIT_ACTIVITY:
//             return editActivity(state, payload);
//         // TODO: RESTORE_ACTIVITY
//         default:
//             return state; // normally I would prefer to throw error, but with a combined-reducer setup,
//         // the wrong reducer may be used for an action
//     }
// };

// export default reducer;
// export {
//     startActivity,
//     createCompletedActivity,
//     stopActivity,
//     resumeActivity,
//     trashActivity,
//     editActivity,
//     START_ACTIVITY,
//     CREATE_COMPLETED_ACTIVITY,
//     STOP_ACTIVITY,
//     RESUME_ACTIVITY,
//     TRASH_ACTIVITY,
//     EDIT_ACTIVITY,
// };
