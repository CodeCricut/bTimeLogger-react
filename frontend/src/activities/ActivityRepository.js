import axios from "axios";

import { ActivityTypeRepository } from "../activity-types/ActivityTypeRepository.js";
import {
    ActivityModel,
    mapObjectToModel,
    mapObjectsToModels,
} from "./ActivityModel.js";

/**
 * Class for interacting with the ActivityModel using the REST API.
 */
class ActivityRepository {
    #typeRepository;

    /**
     * @param {ActivityTypeRepository} typeRepository The repository used to load types for activities.
     */
    constructor(typeRepository = new ActivityTypeRepository()) {
        this.#typeRepository = typeRepository;
    }

    /**
     * Get an array of all activities.
     * @returns {Promise<Array<ActivityModel>>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async getAll() {
        const response = await axios.get("/activities");
        if (response.status !== 200) throw new Error(response.error);
        return await this.#mapActivitiesResponseToModels(response);
    }

    /**
     * Get an activity by it's ID
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async getById(id) {
        if (!id) throw new Error("Tried getting activity without id.");
        const response = await axios.get(`/activities/${id}`);
        if (response.status !== 200) throw new Error(response.error);

        return await this.#mapActivityResponseToModel(response);
    }

    /**
     * Start a new activity and return it.
     * @param {ActivityModel} activity The activity to start.
     * @param {string} activity.type The id of the type to associate with this activity.
     * @param {string} activity.comment Optional comment to associate with this activity.
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async startNew(activity) {
        if (!activity)
            throw new Error("Tried starting new activity which was null.");
        const response = await axios.post(`/activities/start-new`, activity);
        if (response.status !== 200) throw new Error(response.error);
        return await this.#mapActivityResponseToModel(response);
    }

    /**
     * Create a completed activity and return it.
     * @param {ActivityModel} activity The activity to create.
     * @param {string} activity.startTime Required string representation of the activity's start date.
     * @param {string} activity.endTime Required string representation of the activity's end date.
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async createCompleted(activity) {
        if (!activity)
            throw new Error(
                "Tried starting create completed activity which was null."
            );
        const response = await axios.post(
            `/activities/create-completed`,
            activity
        );
        if (response.status !== 200) throw new Error(response.error);
        return await this.#mapActivityResponseToModel(response);
    }

    /**
     * Stop the activity with the given id and return it.
     * @param {string} id The id of the activity to stop.
     * @returns {Promise<ActivityModel>} The stopped activity.
     * @throws {Error} Will throw if API does not indicate success.
     */
    async stopActivity(id) {
        if (!id) throw new Error("Tried stopping activity with null id.");
        const response = await axios.patch(`/activities/stop/${id}`);
        if (response.status !== 200) throw new Error(response.error);
        return await this.#mapActivityResponseToModel(response);
    }

    /**
     * Resume the activity with the given id and return it.
     * @param {string} id The id of the activity to resume.
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async resumeActivity(id) {
        if (!id) throw new Error("Tried resuming activity with null id.");
        const response = await axios.patch(`/activities/resume/${id}`);
        if (response.status !== 200) throw new Error(response.error);
        return await this.#mapActivityResponseToModel(response);
    }

    /**
     * Trash the given activity and return it. A trashed activity is not
     * removed from the database, but will have its `trashed` property
     * set to true.
     * @param {string} id The id of activity to trash
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async trashActivity(id) {
        if (!id) throw new Error("Tried trashing activity with null id.");
        const response = await axios.patch(`/activities/trash/${id}`);
        if (response.status !== 200) throw new Error(response.error);
        return await this.#mapActivityResponseToModel(response);
    }

    /**
     * Untrash the given activity and return it.
     * @param {string} id The id of the activity to untrash.
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async untrashActivity(id) {
        if (!id) throw new Error("Tried untrashing activity with null id.");
        const response = await axios.patch(`/activities/untrash/${id}`);
        if (response.status !== 200) throw new Error(response.error);
        return await this.#mapActivityResponseToModel(response);
    }

    /**
     * Update the given activity and return it.
     * @param {string} id The id of the activity to update.
     * @param {ActivityModel} activity The model containing the updated properties.
     * Missing/null properties will not be updated.
     * @returns {Promise<ActivityModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async updateActivity(id, activity) {
        if (!id) throw new Error("Tried updating activity with null id.");
        if (!activity)
            throw new Error("Tried updating activity with null activity.");
        const response = await axios.put(`/activities/update/${id}`, activity);
        if (response.status !== 200) throw new Error(response.error);
        return await this.#mapActivityResponseToModel(response);
    }

    /**
     * Completely remove an activity from the database.
     * @param {string} id The id of the activity to remove.
     * @returns {Promise}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async removeActivity(id) {
        if (!id) throw new Error("Tried removing activity with null id.");
        const response = await axios.delete(`/activities/remove/${id}`);
        if (response.status !== 200) throw new Error(response.error);
    }

    async #mapActivitiesResponseToModels(response) {
        const responseModels = response.data;

        const activities = [];
        for (const model of responseModels) {
            const type = await this.#typeRepository.getById(model.type);
            activities.push(mapObjectToModel({ ...model, type }));
        }

        return activities;
    }

    /**
     * @returns {Promise<ActivityModel>}
     */
    async #mapActivityResponseToModel(response) {
        const responseModel = response.data;

        const type = await this.#typeRepository.getById(responseModel.type);

        return mapObjectToModel({ ...responseModel, type });
    }
}

export { ActivityRepository };
