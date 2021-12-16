import axios from "axios";
import {
    ActivityTypeModel,
    mapObjectToModel,
    mapObjectsToModels,
} from "../model/ActivityTypeModel.js";

/**
 * Class for interacting with the ActivityType model using the REST API.
 */
class ActivityTypeRepository {
    /**
     * Get an array of all activity types
     * @returns {Promise<Array<ActivityTypeModel>>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async getAll() {
        const response = await axios.get("/types");
        if (response.status !== 200) throw new Error(response.error);
        return mapObjectsToModels(response.data);
    }

    /**
     * Get an activity type by its id
     * @param {string} id The id of the type
     * @returns {Promise<ActivityTypeModel>}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async getById(id) {
        if (!id) throw new Error("Tried to get activity type without id.");
        const response = await axios.get(`types/${id}`);
        if (response.status !== 200) throw new Error(response.error);
        return mapObjectToModel(response.data);
    }

    /**
     * Add a new type and return it.
     * @param {ActivityTypeModel} type The activity type to add
     * @param {string} type.name The name of the type to add
     * @returns {Promise<ActivityTypeModel>} The added activity
     * @throws {Error} Will throw if API does not indicate success.
     */
    async add(type) {
        if (!type) throw new Error("Tried adding null type.");
        const response = await axios.post(`types/add`, type);
        if (response.status !== 200) throw new Error(response.error);
        return mapObjectToModel(response.data);
    }

    /**
     * Delete a type from the database.
     * @param {string} id The id of the type to remove
     * @returns {Promise}
     * @throws {Error} Will throw if API does not indicate success.
     */
    async remove(id) {
        if (!id) throw new Error("Tried removing type without id");
        const response = await axios.delete(`types/remove/${id}`);
        if (response.status !== 200) throw new Error(response.error);
    }
}

export { ActivityTypeRepository };
