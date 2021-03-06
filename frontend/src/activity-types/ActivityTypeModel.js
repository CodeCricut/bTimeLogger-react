/**
 * Represents a single activity type.
 *
 * The model relates closely to the `ActivityType` model in the server app, and is used to
 * both post and receive activity types from the REST API.
 */
class ActivityTypeModel {
    /**
     * The string representation of the type's id.
     * @type {string}
     */
    _id;

    /**
     * The name of the type.
     * @type {string}
     */
    name;

    constructor(id, name) {
        this._id = id;
        this.name = name;
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
    if (!obj) throw new Error("Object is null");
    if (!obj._id) throw new Error("Object missing _id field.");
    if (!obj.name) throw new Error("Object missing name field.");

    return new ActivityTypeModel(obj._id, obj.name);
};

const mapObjectsToModels = (objects) => {
    const models = [];
    for (const obj of objects) {
        models.push(mapObjectToModel(obj));
    }
    return models;
};

export { ActivityTypeModel, mapObjectToModel, mapObjectsToModels };
