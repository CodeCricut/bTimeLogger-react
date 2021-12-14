import { isValidDate } from "../helpers/date-helpers.js";
import Activity from "../model/Activity.js";
import IdNotProvidedError from "./errors/IdNotProvidedError.js";
import InvalidIdFormatError from "./errors/InvalidIdFormatError.js";
import MissingModelInfoError from "./errors/MissingModelInfoError.js";
import NotFoundError from "./errors/NotFoundError.js";
import InvalidDateError from "./errors/InvalidDateError.js";

class ActivityRepository {
    constructor() {}

    /**
     * Get all activities in the database
     * @returns {Promise<Array<number>>} A promise which will resolve to an array of all activities
     */
    async getAll() {
        return await Activity.find({});
    }

    /**
     * Get an activity by its ID
     * @param {string} id The id of the activity to get
     * @returns {Promise<Activity>} A promise which will resolve to the activity retrieved by ID
     * @throws {IdNotProvidedError} Will throw if id not provided
     * @throws {InvalidIdFormatError} Will throw if id is not valid ObjectId
     * @throws {NotFoundError} Will throw if no activity can be found with the given ID
     */
    async getById(id) {
        if (!id) throw new IdNotProvidedError();

        let activity;
        try {
            activity = await Activity.findById(id);
        } catch (e) {
            throw new InvalidIdFormatError();
        }

        if (!activity) throw new NotFoundError();

        return activity;
    }

    /**
     * Start a new activity and return it. Started activities will have
     * their start times populated with the current time, end times reset,
     * and will not be trashed.
     * @param {Object} activity The activity to start
     * @param {string} activity.type The type of activity
     * @param {string} activity.comment The user comment for this activity
     * @returns {Promise<Activity>} A promise which will resolve to the started activity
     * @throws {MissingModelInfoError} Will throw if the activity or a required field on the activity is null.
     */
    async startNew(activity) {
        if (!activity)
            throw new MissingModelInfoError("Tried to start a null activity.");

        let startedActivity;
        try {
            startedActivity = new Activity({
                ...activity,
                startTime: new Date(Date.now()),
                endTime: null,
                trashed: false,
            });
            await startedActivity.save();
        } catch (e) {
            throw new MissingModelInfoError(
                "Could not create activity because one or more fields were missing."
            );
        }

        return startedActivity;
    }

    /**
     * Create a completed activity. Completed activities must have their start and
     * end times populated, and will not be trashed.
     * @param {Object} activity
     * @param {string} activity.startTime The date string representing the start time of the activity
     * @param {string} activity.endTime The date string representing the end time of the activity
     * @returns {Promise<Activity>} A promise which will resolve to the created activity
     * @throws {MissingModelInfoError} Will throw if activity is null, or any fields are missing or invalid.
     * @throws {InvalidDateError} Will throw if the startTime or endTime date strings are invalid.
     */
    async createCompleted(activity) {
        if (!activity)
            throw new MissingModelInfoError(
                "Tried to create a completed activity which was null."
            );
        if (!activity.startTime || !activity.endTime)
            throw new MissingModelInfoError(
                "Tried to create an activity without a start or end time."
            );
        const startTime = new Date(activity.startTime);
        if (!isValidDate(startTime))
            throw new InvalidDateError("Format for startTime date is invalid.");
        const endTime = new Date(activity.endTime);
        if (!isValidDate(endTime))
            throw new InvalidDateError("Format for endTime date is invalid");

        let createdActivity;
        try {
            createdActivity = new Activity({
                ...activity,
                startTime,
                endTime,
                trashed: false,
            });
            await createdActivity.save();
        } catch (e) {
            throw new MissingModelInfoError(
                "Could not create activity because one or more fields were missing or invalid."
            );
        }

        return createdActivity;
    }

    /**
     * Stop the given activity and return it. Stopped activities will have
     * their end times set to the current time.
     * @param {string} id The id of the activity to stop
     * @returns {Promise<Activity>} A promise which will resolve to the stopped activity
     * @throws {IdNotProvidedError} Will throw if id not provided
     * @throws {InvalidIdFormatError} Will throw if the given ID is not a valid ObjectID
     * @throws {NotFoundError} Will throw if an activity with the given ID cannot be found.
     */
    async stop(id) {
        if (!id) throw new IdNotProvidedError();

        let activity;
        try {
            activity = await Activity.findById(id);
        } catch (e) {
            throw new InvalidIdFormatError();
        }

        if (!activity)
            throw new NotFoundError("Activity with the given ID not found.");

        // TODO: document this behavior of forcing start time to be before end time
        const x = Date.now();
        const endTime = new Date(x);
        if (activity.startTime > endTime) activity.startTime = endTime;
        activity.endTime = endTime;
        await activity.save();

        return activity;
    }

    /**
     * Resume the given activity. Resumed activities will have their start times set
     * to the current time, and their end times will be reset.
     * @param {string} id The id of the activity to resume
     * @returns {Promise<Activity>} A promise which will resolve to the resumed activity
     * @throws {IdNotProvidedError} Will throw if id not provided
     * @throws {InvalidIdFormatError} Will throw if the given ID is not a valid ObjectID
     * @throws {NotFoundError} Will throw if an activity with the given ID cannot be found.
     */
    async resume(id) {
        if (!id) throw new IdNotProvidedError();

        let activity;
        try {
            activity = await Activity.findById(id);
        } catch (e) {
            throw new InvalidIdFormatError();
        }

        if (!activity)
            throw new NotFoundError("Activity with the given ID not found.");

        activity.startTime = new Date(Date.now());
        activity.endTime = null;
        await activity.save();

        return activity;
    }

    /**
     * Trash the given activity.
     * @param {string} id The id of the activity to trash
     * @returns {Promise<Activity>} A promise which will resolve to the trashed activity
     * @throws {IdNotProvidedError} Will throw if id not provided
     * @throws {InvalidIdFormatError} Will throw if the given ID is not a valid ObjectID
     * @throws {NotFoundError} Will throw if an activity with the given ID cannot be found.
     */
    async trash(id) {
        if (!id) throw new IdNotProvidedError();

        let activity;
        try {
            activity = await Activity.findById(id);
        } catch (e) {
            throw new InvalidIdFormatError();
        }

        if (!activity)
            throw new NotFoundError("Activity with the given ID not found.");

        activity.trashed = true;
        await activity.save();

        return activity;
    }

    /**
     * Untrash the given activity.
     * @param {string} id The id of the activity to untrash
     * @returns {Promise<Activity>} A promise which will resolve to the untrashed activity
     * @throws {IdNotProvidedError} Will throw if id not provided
     * @throws {InvalidIdFormatError} Will throw if the given ID is not a valid ObjectID
     * @throws {NotFoundError} Will throw if an activity with the given ID cannot be found.
     */
    async untrash(id) {
        if (!id) throw new IdNotProvidedError();

        let activity;
        try {
            activity = await Activity.findById(id);
        } catch (e) {
            throw new InvalidIdFormatError();
        }

        if (!activity)
            throw new NotFoundError("Activity with the given ID not found.");

        activity.trashed = false;
        await activity.save();

        return activity;
    }

    /**
     * @param {string} id The id of the activity to update
     * @param {Object} updateActivity The activity object with the updated fields
     * @param {string} updateActivity.type The ID of the type of the updated type. Will not update type if null.
     * @param {string} updateActivity.startTime The date string representing the start time of the
     * updated activity. Will not update start time if null.
     * @param {string} updateActivity.endTime The date string representing the end time of the
     * updated activity. Will not update end time if null.
     * @param {string} updateActivity.comment The comment of the updated activity. Will not update comment if null.
     * @param {boolean} updateActivity.trashed The trashed status of the updated activity. Will not update if null.
     * @returns {Promise<Activity>} A promise which will resolve to the updated activity
     * @throws {IdNotProvidedError} Will throw if id not provided
     * @throws {InvalidIdFormatError} Will throw if the given ID is not a valid ObjectID
     * @throws {NotFoundError} Will throw if an activity with the given ID cannot be found.
     * @throws {InvalidDateError} Will throw if the startTime or endTime date strings are invalid.
     * @throws {MissingModelInfoError} Will throw if the fields provided are incomplete or invalid.
     */
    async update(id, updateActivity) {
        if (!id) throw new IdNotProvidedError();
        if (!updateActivity)
            throw new MissingModelInfoError(
                "Tried to update activity with null object."
            );
        const { type, startTime, endTime, comment, trashed } = updateActivity;

        let activity;
        try {
            activity = await Activity.findById(id);
        } catch (e) {
            throw new InvalidIdFormatError();
        }

        if (!activity)
            throw new NotFoundError("Activity with the given ID not found.");

        // Only update properties if not undefined or null
        if (type != null) activity.type = type;
        if (startTime != null) {
            const stDate = new Date(startTime);
            if (!isValidDate(stDate))
                throw new InvalidDateError("Start time date is invalid.");
            activity.startTime = stDate;
        }
        if (endTime != null) {
            const etDate = new Date(endTime);
            if (!isValidDate(etDate))
                throw new InvalidDateError("End time date is invalid.");
            activity.endTime = etDate;
        }
        if (comment != null) activity.comment = comment;
        if (trashed != null) activity.trashed = trashed;

        try {
            await activity.save();
        } catch (e) {
            console.log(e);
            throw new MissingModelInfoError(
                "Tried to update activity with incomplete or invalid info"
            );
        }

        return activity;
    }

    /**
     * Completely remove an activity from the database.
     * @param {string} id The id of the activity to delete from the database
     * @returns {Promise} A promise which will resolve once the activity has been deleted
     * @throws {IdNotProvidedError} Will throw if id not provided
     * @throws {InvalidIdFormatError} Will throw if the given ID is not a valid ObjectID
     * @throws {NotFoundError} Will throw if an activity with the given ID cannot be found.
     */
    async remove(id) {
        if (!id) throw new IdNotProvidedError();

        let activity;
        try {
            activity = await Activity.findById(id);
        } catch (e) {
            throw new InvalidIdFormatError();
        }

        if (!activity)
            throw new NotFoundError("Activity with the given ID not found.");

        await Activity.findByIdAndDelete(id);
    }
}

export { ActivityRepository };
