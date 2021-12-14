import Activity from "../../src/model/Activity.js";
import ActivityType from "../../src/model/ActivityType.js";
import { ActivityRepository } from "../../src/repositories/ActivityRepository.js";
import AlreadyAddedError from "../../src/repositories/errors/AlreadyAddedError.js";
import IdNotProvidedError from "../../src/repositories/errors/IdNotProvidedError.js";
import InvalidIdFormatError from "../../src/repositories/errors/InvalidIdFormatError.js";
import MissingModelInfoError from "../../src/repositories/errors/MissingModelInfoError.js";
import NotFoundError from "../../src/repositories/errors/NotFoundError.js";
import { dbConnect, dbDisconnect, resetDb } from "../dbHandler.utils.js";
import { expectActivitiesArrayEqual } from "../util/expect-helpers.js";
import { fakeActivity, fakeActivityType } from "../fixtures/index.js";

beforeAll(async () => {
    dbConnect(); // awaiting will let afterEach run; must run to completion
});

afterAll(async () => {
    dbDisconnect();
});

afterEach(async () => resetDb());

// TODO: these utility functions for interacting with DB should go somewhere else
const addFakeActivityType = async () => {
    const type = new ActivityType(fakeActivityType);
    await type.save();
    expect(type).toBeTruthy();
    return type;
};

const addFakeActivity = async () => {
    const type = await addFakeActivityType();
    const activity = new Activity({ ...fakeActivity, type: type._id });
    await activity.save();
    expect(activity).toBeTruthy();
    expect(activity.type).toEqual(type._id);
    return activity;
};

describe("getAll", () => {
    test("should return empty array when no activites", async () => {
        const actRepo = new ActivityRepository();
        const expected = [];
        const actual = await actRepo.getAll();
        expectActivitiesArrayEqual(expected, actual);
    });

    test("should return array when some types", async () => {
        const activity = await addFakeActivity();
        const actRepo = new ActivityRepository();

        const expected = [activity];
        const actual = await actRepo.getAll();

        expect(actual).toHaveLength(1);
        expectActivitiesArrayEqual(expected, actual);
    });

    test("should not return types added after call", async () => {
        const actRepo = new ActivityRepository();

        const expected = [];
        const actual = await actRepo.getAll();

        await addFakeActivity();

        expect(actual).toHaveLength(0);
        expectActivitiesArrayEqual(expected, actual);
    });
});
