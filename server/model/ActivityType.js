import mongoose from "mongoose";
const { Schema } = mongoose;

const ActivityTypeSchema = new Schema({
    name: { type: String, required: true },
});

export const TYPE_MODEL_NAME = "Type";
export default mongoose.model(TYPE_MODEL_NAME, ActivityTypeSchema);
