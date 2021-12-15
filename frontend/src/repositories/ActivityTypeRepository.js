import axios from "axios";

/**
 * Class for interacting with the ActivityType model using the REST API.
 */
class ActivityTypeRepository {
    /**
     * Get an array of all activity types
     * @returns {Promise<Array<ActivityTypeApiModel>>}
     * @throws TODO
     */
    async getAll() {}

    /**
     * Get an activity type by its id
     * @param {string} id The id of the type
     * @returns {Promise<ActivityTypeApiModel>}
     * @throws TODO
     */
    async getById(id) {}

    /**
     * Add a new type and return it.
     * @param {ActivityTypeApiModel} type The activity type to add
     * @param {string} type.name The name of the type to add
     * @returns {Promise<ActivityTypeApiModel>} The added activity
     * @throws TODO
     */
    async add(type) {}

    /**
     * Delete a type from the database.
     * @param {string} id The id of the type to remove
     * @returns {Promise}
     * @throws TODO
     */
    async remove(id) {}
}

export { ActivityTypeRepository };
