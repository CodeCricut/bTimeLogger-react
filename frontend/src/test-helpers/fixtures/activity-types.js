import { ActivityTypeModel } from "../../activity-types/ActivityTypeModel.js";

const studyingType = new ActivityTypeModel(
    "6121713a797e0308845ec999",
    "Studying"
);

const exerciseType = new ActivityTypeModel(
    "612170912b5a1716dca11c48",
    "Exercise"
);
const codingType = new ActivityTypeModel("6121713a797e0308845ec931", "Coding");
const readingType = new ActivityTypeModel(
    "61217143797e0308845ec934",
    "Reading"
);

const invalidType = new ActivityTypeModel(
    "invalid id",
    "Invalid type (invalid id)"
);

const allTypes = [studyingType, exerciseType, codingType, readingType];
const emptyTypes = [];

export {
    studyingType,
    exerciseType,
    codingType,
    readingType,
    invalidType,
    allTypes,
    emptyTypes,
};
