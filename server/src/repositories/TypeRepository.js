import ActivityType from "../model/ActivityType.js";
import IdNotProvidedError from "./errors/IdNotProvidedError.js";
import InvalidIdFormatError from "./errors/InvalidIdFormatError.js";
import MissingModelInfoError from "./errors/MissingModelInfoError.js";
import NotFoundError from "./errors/NotFoundError.js";
import AlreadyAddedError from "./errors/AlreadyAddedError.js";

class TypeRepository {
    constructor() {}

    /**
     * Get all types in the database
     * @returns {Promise<Array<Activity>>} A promise which will yield an array of all the type objects
     */
    async getAll() {
        return await ActivityType.find({});
    }

    /**
     * Get a type with the given id.
     * @param {string} id
     * @returns {Promise<ActivityType>} A promise which will resolve to the activity with the given id.
     * @throws {IdNotProvidedError} Will throw if id argument is null
     * @throws {InvalidIdFormatError} Will throw if id is not valid ObjectId
     * @throws {NotFoundError} Will throw if no type can be found with the given id.
     */
    async getById(id) {
        if (!id) throw new IdNotProvidedError();

        let type;
        try {
            type = await ActivityType.findById(id);
        } catch (e) {
            throw new InvalidIdFormatError();
        }

        if (!type) throw new NotFoundError("Type with the given ID not found.");
        return type;
    }

    /**
     * Add a new activity type with the given name
     * @param {string} name The name of the activity type to add
     * @returns {Promise<ActivityType>} A promise which will resolve to the added activity type
     * @throws {MissingModelInfoError} Will throw if the name is not given
     * @throws {AlreadyAddedError} Will throw if a type with the given name already exists
     */
    async add(name) {
        const addAsync = async () => {
            if (!name) throw new MissingModelInfoError("Type name not given");

            const type = new ActivityType({ name });

            if ((await ActivityType.countDocuments({ name: type.name })) > 0) {
                throw new AlreadyAddedError(
                    `Already added type with name '${type.name}'`
                );
            }

            await type.save();

            return type;
        };
        return await addAsync();
    }

    /**
     * Remove the given activity type from the database.
     * @param {string} id
     * @returns {Promise} A promise which will resolve once the type has been deleted.
     * @throws {MissingModelInfoError} Will throw if no id provided.
     * @throws {InvalidIdFormatError} Will throw if id is not valid ObjectId
     * @throws {NotFoundError} Will throw if no type can be found with the given id.
     */
    async delete(id) {
        if (!id) throw new MissingModelInfoError("No ID provided.");

        let type;
        try {
            type = await ActivityType.findById(id);
        } catch (e) {
            throw new InvalidIdFormatError();
        }

        if (!type) throw new NotFoundError("Type with the given ID not found.");

        await ActivityType.findByIdAndDelete(id);
    }
}

export { TypeRepository };