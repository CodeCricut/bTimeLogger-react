import axios from "axios";
import { ActivityModel } from "../model/ActivityModel.js";
import {
    ActivityTypeModel,
    mapObjectToModel,
    mapObjectsToModels,
} from "../model/ActivityTypeModel.js";

/**
 * Class for interacting with the ActivityModel using the REST API.
 */
class ActivityRepository {
    /**
     * Get an array of all activities.
     * @returns {Promise<Array<ActivityModel>>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async getAll() {}

    /**
     * Get an activity by it's ID
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async getById() {}

    /**
     * Start a new activity and return it.
     * @param {ActivityModel} activity The activity to start.
     * @param {string} activity.type The id of the type to associate with this activity.
     * @param {string} activity.comment Optional comment to associate with this activity.
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async startNew(activity) {}

    /**
     * Create a completed activity and return it.
     * @param {ActivityModel} activity The activity to create.
     * @param {string} activity.startTime Required string representation of the activity's start date.
     * @param {string} activity.endTime Required string representation of the activity's end date.
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async createCompleted(activity) {}

    /**
     * Stop the activity with the given id and return it.
     * @param {string} id The id of the activity to stop.
     * @returns {Promise<ActivityModel>} The stopped activity.
     * @throws {Error} Will throw if API does not indicate success.
     */
    async stopActivity(id) {}

    /**
     * Resume the activity with the given id and return it.
     * @param {string} id The id of the activity to resume.
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async resumeActivity(id) {}

    /**
     * Trash the given activity and return it. A trashed activity is not
     * removed from the database, but will have its `trashed` property
     * set to true.
     * @param {string} id The id of activity to trash
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async trashActivity(id) {}

    /**
     * Untrash the given activity and return it.
     * @param {string} id The id of the activity to untrash.
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async untrashActivity(id) {}

    /**
     * Update the given activity and return it.
     * @param {string} id The id of the activity to update.
     * @param {ActivityModel} activity The model containing the updated properties.
     * Missing/null properties will not be updated.
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async updateActivity(id, activity) {}

    /**
     * Completely remove an activity from the database.
     * @param {string} id The id of the activity to remove.
     * @returns {Promise}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async removeActivity(id) {}
}

export { ActivityRepository };
