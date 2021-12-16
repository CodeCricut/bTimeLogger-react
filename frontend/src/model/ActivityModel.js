/**
 * Represents a single activity.
 */
class ActivityModel {
    /**
     * The string representation of the activity's id.
     * @type {string}
     */
    _id;

    /**
     * The id of the activity type associated with this activity.
     * @type {string}
     */
    type;

    /**
     * The activity's comment.
     * @type {string}
     */
    comment;

    /**
     * The string representation of this activity's start time.
     * @type {string}
     */
    startTime;

    /**
     * The string representation of this activity's end time.
     * @type {string}
     */
    endTime;

    /**
     * A boolean representing if this activity is trashed or not.
     * @type {string}
     */
    trashed;

    constructor(id, type, comment, startTime, endTime, trashed) {
        this._id = id;
        this.type = type;
        this.comment = comment;
        this.startTime = startTime;
        this.endTime = endTime;
        this.trashed = trashed;
    }

    /**
     * Get the `Date` of the start time.
     */
    get startTimeDate() {
        return new Date(startTime);
    }

    /**
     * Get the `Date` of the end time.
     */
    get endTimeDate() {
        return new Date(endTime);
    }

    /**
     * Simple accessor alternative to the `_id` property.
     * @type {string}
     */
    get id() {
        return this._id;
    }
}

const mapObjectToModel = (obj) => {
    if (!obj) throw new Error("Tried to map null object.");
    if (!obj._id)
        throw new Error("Tried to map object without required field _id.");
    if (!obj.startTime)
        throw new Error(
            "Tried to map object without required field startTime."
        );
    if (obj.trashed == null)
        // Null or undefined
        throw new Error("Tried to map object without required field trashed");

    return new ActivityModel(
        obj._id,
        obj.type,
        obj.comment,
        obj.startTime,
        obj.endTime,
        obj.trashed
    );
};

const mapObjectsToModels = (objects) => {
    const models = [];
    for (const obj of objects) {
        models.push(mapObjectToModel(obj));
    }
    return models;
};

export { ActivityModel, mapObjectToModel, mapObjectsToModels };
