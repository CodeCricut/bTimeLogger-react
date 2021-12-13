class ActivityRepository {
    constructor() {}

    /**
     * Get all activities in the database
     * @returns {Array<number>} A promise which will resolve to an array of all activities
     */
    async getAll() {}

    /**
     * Get an activity by its ID
     * @param {string} id The id of the activity to get
     * @returns {Activity} The activity retrieved by ID
     */
    async getById(id) {}

    /**
     * Start a new activity and return it. Started activities will have
     * their start times populated with the current time, end times reset,
     * and will not be trashed.
     * @param {Object} activity The activity to start
     * @param {string} activity.type The type of activity
     * @param {string} activity.comment The user comment for this activity
     * @returns {Activity} The started activity
     */
    async startNew(activity) {}

    /**
     * Create a completed activity. Completed activities must have their start and
     * end times populated, and will not be trashed.
     * @param {Object} activity
     * @param {string} activity.startTime The date string representing the start time of the activity
     * @param {string} activity.endTime The date string representing the end time of the activity
     * @returns {Activity} The created activity
     */
    async createCompleted(activity) {}

    /**
     * Stop the given activity and return it. Stopped activities will have
     * their end times ste to the current time.
     * @param {string} id The id of the activity to stop
     * @returns The stopped activity
     */
    async stop(id) {}

    /**
     * Resume the given activity. Resumed activities will have their start times set
     * to the current time, and their end times will be reset.
     * @param {string} id The id of the activity to resume
     * @returns {Activity} The resumed activity
     */
    async resume(id) {}

    /**
     * Trash the given activity.
     * @param {string} id The id of the activity to trash
     * @returns {Activity} The trashed activity
     */
    async trash(id) {}

    /**
     * Untrash the given activity.
     * @param {string} id The id of the activity to untrash
     * @returns {Activity} The untrashed activity
     */
    async untrash(id) {}

    /**
     * @param {string} id The id of the activity to update
     * @param {Object} activity The activity object with the updated fields
     * @param {string} activity.type The ID of the type of the updated type. Will not update type if null.
     * @param {string} activity.startTime The date string representing the start time of the
     * updated activity. Will not update start time if null.
     * @param {string} activity.endTime The date string representing the end time of the
     * updated activity. Will not update end time if null.
     * @param {string} activity.comment The comment of the updated activity. Will not update comment if null.
     * @param {boolean} actiivty.trashed The trashed status of the updated activity. Will not update if null.
     */
    async update(id, { type, startTime, endTime, comment, isTrashed }) {}

    /**
     * Completely remove an activity from the database.
     * @param {string} id The id of the activity to delete from the database
     */
    async remove(id) {}
}
