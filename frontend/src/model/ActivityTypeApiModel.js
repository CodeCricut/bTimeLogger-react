/**
 * Represents a single activity type as returned by the API.
 */
class ActivityTypeApiModel {
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

    /**
     * Simple accessor alternative to the `_id` property.
     * @type {string}
     */
    get id() {
        return this._id;
    }
}

export { ActivityTypeApiModel };
