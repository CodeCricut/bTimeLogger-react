import { ActivityModel } from "../../activities/ActivityModel.js";
import {
    allTypes,
    codingType,
    exerciseType,
    invalidType,
    studyingType,
} from "./activity-types.js";
import { startTime, endTime, invalidDate } from "./dates.js";

const completedStudyingActivity = new ActivityModel(
    "612174530de71f4c48ab23e5",
    studyingType,
    "Completed studying activity.",
    startTime,
    endTime,
    false
);

const startedExerciseActivity = new ActivityModel(
    "612174530de71f4c48ab2300",
    exerciseType,
    "Started exercise activity",
    startTime,
    null,
    false
);

const trashedCodingActivity = new ActivityModel(
    "612174530de71f4c48ab2301",
    codingType,
    "Trashed coding activity",
    startTime,
    endTime,
    true
);

const invalidIdActivity = new ActivityModel(
    "INVALID ID",
    studyingType,
    "Invalid id activity",
    startTime,
    endTime,
    false
);
const invalidTypeActivity = new ActivityModel(
    "612174530de71f4c48ab2302",
    invalidType,
    "Invalid type activity",
    startTime,
    endTime,
    false
);
const invalidDateActivity = new ActivityModel(
    "612174530de71f4c48ab2303",
    studyingType,
    "Invalid date activity",
    invalidDate,
    invalidDate,
    false
);

const singleExpectedActivity = completedStudyingActivity;
/**
 * Same as singleExpectedActivity, except the type is the ID of the type rather than the ActivityTypeModel
 */
const singleActivityApiResponse = {
    ...completedStudyingActivity,
    type: completedStudyingActivity.type._id,
};

/**
 * All activity fixtures where each activity has its type property populated with a ActivityTypeModel
 */
const allActivitiesWithTypes = [
    completedStudyingActivity,
    startedExerciseActivity,
    trashedCodingActivity,
];

/**
 * All activity fixtures where each activity has its type property populated with a string representing an ID of an ActivityTypeModel
 */
const allActivitiesApiResponse = [
    { ...completedStudyingActivity, type: completedStudyingActivity.type._id },
    { ...startedExerciseActivity, type: startedExerciseActivity.type._id },
    { ...trashedCodingActivity, type: trashedCodingActivity.type._id },
];

export {
    completedStudyingActivity,
    startedExerciseActivity,
    trashedCodingActivity,
    invalidIdActivity,
    invalidTypeActivity,
    invalidDateActivity,
    allActivitiesWithTypes as allActivities,
    allActivitiesApiResponse,
    singleExpectedActivity,
    singleActivityApiResponse,
};
