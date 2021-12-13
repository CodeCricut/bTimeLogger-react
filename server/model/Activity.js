import mongoose from "mongoose";
import { TYPE_MODEL_NAME } from "./ActivityType.js";
const { Schema } = mongoose;

const ActivitySchema = new Schema({
    type: { type: Schema.Types.ObjectId, ref: TYPE_MODEL_NAME, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: false },
    comment: { type: String, required: false },
    isTrashed: { type: Boolean, required: true },
});

export const ACTIVITY_MODEL_NAME = "Activity";

/**
 * An Activity represents something the user did between particular points in time.
 * Activities are of a certain Type, and can include information such as comments
 * made by the user.
 */
const Activity = mongoose.model(ACTIVITY_MODEL_NAME, ActivitySchema);

export default Activity;
