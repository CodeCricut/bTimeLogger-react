import mongoose from "mongoose";
const { Schema } = mongoose;

const ActivityTypeSchema = new Schema({
    name: { type: String, required: true },
});

export const TYPE_MODEL_NAME = "Type";

/**
 * An ActivityType represents the type of activity the user did at a
 * particular point, such as "Reading" or "Sleeping."
 */
const ActivityType = mongoose.model(TYPE_MODEL_NAME, ActivityTypeSchema);

export default ActivityType;
