import Activity from "../../src/model/Activity.js";
import ActivityType from "../../src/model/ActivityType.js";
import { ActivityRepository } from "../../src/repositories/ActivityRepository.js";
import AlreadyAddedError from "../../src/repositories/errors/AlreadyAddedError.js";
import IdNotProvidedError from "../../src/repositories/errors/IdNotProvidedError.js";
import InvalidIdFormatError from "../../src/repositories/errors/InvalidIdFormatError.js";
import MissingModelInfoError from "../../src/repositories/errors/MissingModelInfoError.js";
import NotFoundError from "../../src/repositories/errors/NotFoundError.js";
import { dbConnect, dbDisconnect, resetDb } from "../dbHandler.utils.js";
import {
    expectActivitiesArrayEqual,
    expectActivitiesEqual,
} from "../util/expect-helpers.js";
import {
    fakeActivity,
    fakeActivityType,
    NON_EXISTANT_ID,
} from "../fixtures/index.js";
import { jest } from "@jest/globals";

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

describe("getById", () => {
    test("should return one with valid id", async () => {
        const expected = await addFakeActivity();
        const actRepo = new ActivityRepository();

        const actual = await actRepo.getById(expected.id);

        expectActivitiesEqual(expected, actual);
    });

    test("should throw if id not provided", async () => {
        const actRepo = new ActivityRepository();
        await expect(async () => {
            await actRepo.getById(null);
        }).rejects.toThrow(IdNotProvidedError);
    });

    test("should throw if invalid id provided", async () => {
        const actRepo = new ActivityRepository();
        await expect(async () => {
            await actRepo.getById("INVALID ID");
        }).rejects.toThrow(InvalidIdFormatError);
    });

    test("should throw if not found", async () => {
        const actRepo = new ActivityRepository();
        await expect(async () => {
            await actRepo.getById(NON_EXISTANT_ID);
        }).rejects.toThrow(NotFoundError);
    });
});

describe("startNew", () => {
    test("should initialize correct fields given valid activity", async () => {
        const actRepo = new ActivityRepository();
        const type = await addFakeActivityType();

        const mockStartTime = 1234567890123;
        jest.spyOn(Date, "now").mockImplementationOnce(() => mockStartTime);
        const actual = await actRepo.startNew({
            ...fakeActivity,
            type: type._id,
        });

        const expected = {
            ...fakeActivity,
            type: type._id,
            startTime: new Date(mockStartTime),
            endTime: null,
            trashed: false,
        };

        expectActivitiesEqual(expected, actual);
    });

    test("should throw if given null activity", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.startNew(null);
        }).rejects.toThrow(MissingModelInfoError);
    });

    test("should throw if given activity with missing info", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.startNew({
                ...fakeActivity,
                type: null,
            });
        }).rejects.toThrow(MissingModelInfoError);
    });
});

describe("stop", () => {
    test("should set end time to now", async () => {
        const activity = await addFakeActivity();
        const actRepo = new ActivityRepository();

        const mockEndTime = 1234567890123;
        jest.spyOn(Date, "now").mockImplementation(() => mockEndTime);
        await actRepo.stop(activity.id);

        const stoppedActivity = await actRepo.getById(activity.id);

        // toObject converts the Mongoose model to an object with properties of the Activity schema
        expectActivitiesEqual(
            {
                ...activity.toObject(),
                startTime: new Date(mockEndTime), // undocumented feature where start time coerced to be endTime if after endTime
                endTime: new Date(mockEndTime),
            },
            stoppedActivity
        );
    });

    test("should throw if no id given", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.stop(null);
        }).rejects.toThrow(IdNotProvidedError);
    });

    test("should throw if invalid id given", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.stop("invalid id");
        }).rejects.toThrow(InvalidIdFormatError);
    });

    test("should throw if activity doesn't exist", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.stop(NON_EXISTANT_ID);
        }).rejects.toThrow(NotFoundError);
    });
});

describe("resume", () => {
    test("should set start time to now and reset end time", async () => {
        const activity = await addFakeActivity();
        const actRepo = new ActivityRepository();

        const mockStartTime = 1234567890123;
        jest.spyOn(Date, "now").mockImplementation(() => mockStartTime);
        await actRepo.resume(activity.id);

        const resumedActivity = await actRepo.getById(activity.id);

        // toObject converts the Mongoose model to an object with properties of the Activity schema
        expectActivitiesEqual(
            {
                ...activity.toObject(),
                startTime: new Date(mockStartTime), // undocumented feature where start time coerced to be endTime if after endTime
                endTime: null,
            },
            resumedActivity
        );
    });

    test("should throw if no id given", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.resume(null);
        }).rejects.toThrow(IdNotProvidedError);
    });

    test("should throw if invalid id given", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.resume("invalid id");
        }).rejects.toThrow(InvalidIdFormatError);
    });

    test("should throw if activity doesn't exist", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.resume(NON_EXISTANT_ID);
        }).rejects.toThrow(NotFoundError);
    });
});
