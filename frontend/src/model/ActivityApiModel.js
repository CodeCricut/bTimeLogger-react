/**
 * Represents a single activity as returned by the API.
 */
class ActivityApiModel {
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
}

export { ActivityApiModel };
