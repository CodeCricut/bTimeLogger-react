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
import { TypeRepository } from "../../src/repositories/TypeRepository.js";
import InvalidDateError from "../../src/repositories/errors/InvalidDateError.js";

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
        jest.spyOn(Date, "now").mockImplementation(() => mockStartTime);
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

describe("createCompleted", () => {
    test("should initialize correct fields given activity", async () => {
        const actRepo = new ActivityRepository();
        const type = await addFakeActivityType();

        const st = new Date(1234567890123);
        const et = new Date(Date.now());
        const expected = {
            ...fakeActivity,
            type: type._id,
            startTime: st,
            endTime: et,
            trashed: false,
        };

        const actual = await actRepo.createCompleted({
            ...fakeActivity,
            type: type._id,
            startTime: st,
            endTime: et,
        });

        expectActivitiesEqual(expected, actual);
    });

    test("should throw if not missing type", async () => {
        const actRepo = new ActivityRepository();

        const st = new Date(1234567890123);
        const et = new Date(Date.now());

        await expect(async () => {
            await actRepo.createCompleted({
                ...fakeActivity,
                type: null,
                startTime: st,
                endTime: et,
            });
        }).rejects.toThrow(MissingModelInfoError);
    });

    test("should throw if not given activity", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.createCompleted(null);
        }).rejects.toThrow(MissingModelInfoError);
    });

    test("should throw if not given start time", async () => {
        const actRepo = new ActivityRepository();

        const et = new Date(Date.now());

        await expect(async () => {
            await actRepo.createCompleted({
                ...fakeActivity,
                type: null,
                startTime: null,
                endTime: et,
            });
        }).rejects.toThrow(MissingModelInfoError);
    });

    test("should throw if not given end time", async () => {
        const actRepo = new ActivityRepository();

        const st = new Date(1234567890123);

        await expect(async () => {
            await actRepo.createCompleted({
                ...fakeActivity,
                type: null,
                startTime: st,
                endTime: null,
            });
        }).rejects.toThrow(MissingModelInfoError);
    });

    test("should throw if given invalid start time", async () => {
        const actRepo = new ActivityRepository();

        const st = "invalid date";
        const et = new Date(Date.now());

        await expect(async () => {
            await actRepo.createCompleted({
                ...fakeActivity,
                type: null,
                startTime: st,
                endTime: et,
            });
        }).rejects.toThrow(InvalidDateError);
    });

    test("should throw if given invalid end time", async () => {
        const actRepo = new ActivityRepository();

        const st = new Date(1234567890123);
        const et = "invalid time";

        await expect(async () => {
            await actRepo.createCompleted({
                ...fakeActivity,
                type: null,
                startTime: st,
                endTime: et,
            });
        }).rejects.toThrow(InvalidDateError);
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

describe("trash", () => {
    test("should trash valid activity", async () => {
        const activity = await addFakeActivity();
        const actRepo = new ActivityRepository();

        await actRepo.trash(activity.id);

        const trashedActivity = await actRepo.getById(activity.id);

        // toObject converts the Mongoose model to an object with properties of the Activity schema
        expectActivitiesEqual(
            {
                ...activity.toObject(),
                trashed: true,
            },
            trashedActivity
        );
    });

    test("should throw if no id given", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.trash(null);
        }).rejects.toThrow(IdNotProvidedError);
    });

    test("should throw if invalid id given", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.trash("invalid id");
        }).rejects.toThrow(InvalidIdFormatError);
    });

    test("should throw if activity doesn't exist", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.trash(NON_EXISTANT_ID);
        }).rejects.toThrow(NotFoundError);
    });
});

describe("untrash", () => {
    test("should untrash valid activity", async () => {
        const actRepo = new ActivityRepository();

        const activity = await addFakeActivity();
        await actRepo.trash(activity.id);
        const trashedActivity = await actRepo.getById(activity.id);
        expect(trashedActivity.trashed).toBe(true);

        await actRepo.untrash(trashedActivity.id);
        const untrashed = await actRepo.getById(trashedActivity.id);

        // toObject converts the Mongoose model to an object with properties of the Activity schema
        expectActivitiesEqual(
            {
                ...trashedActivity.toObject(),
                trashed: false,
            },
            untrashed
        );
    });

    test("should throw if no id given", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.untrash(null);
        }).rejects.toThrow(IdNotProvidedError);
    });

    test("should throw if invalid id given", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.untrash("invalid id");
        }).rejects.toThrow(InvalidIdFormatError);
    });

    test("should throw if activity doesn't exist", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.untrash(NON_EXISTANT_ID);
        }).rejects.toThrow(NotFoundError);
    });
});

describe("update", () => {
    test("should not update when no properties on object given", async () => {
        const actRepo = new ActivityRepository();
        const expected = await addFakeActivity();

        const actual = await actRepo.update(expected.id, {});

        // toObject converts the Mongoose model to an object with properties of the Activity schema
        expectActivitiesEqual(expected, actual);
    });

    test("should update type if given", async () => {
        const actRepo = new ActivityRepository();
        const activity = await addFakeActivity();
        const newType = await new TypeRepository().add("NEW ACTIVITY TYPE");

        const actual = await actRepo.update(activity.id, {
            type: newType.id,
        });

        expectActivitiesEqual(
            { ...activity.toObject(), type: newType._id },
            actual
        );
    });

    test("should update startTime if given", async () => {
        const actRepo = new ActivityRepository();
        const activity = await addFakeActivity();

        const newDate = new Date(1234567890123);
        const actual = await actRepo.update(activity.id, {
            startTime: newDate.toISOString(),
        });

        expectActivitiesEqual(
            { ...activity.toObject(), startTime: newDate },
            actual
        );
    });

    test("should update endTime if given", async () => {
        const actRepo = new ActivityRepository();
        const activity = await addFakeActivity();

        const newDate = new Date(1234567890123);
        const actual = await actRepo.update(activity.id, {
            endTime: newDate.toISOString(),
        });

        expectActivitiesEqual(
            { ...activity.toObject(), endTime: newDate },
            actual
        );
    });

    test("should update comment if given", async () => {
        const actRepo = new ActivityRepository();
        const activity = await addFakeActivity();

        const newComment = "NEW COMMENT";
        const actual = await actRepo.update(activity.id, {
            comment: newComment,
        });

        expectActivitiesEqual(
            { ...activity.toObject(), comment: newComment },
            actual
        );
    });

    test("should update trashed if given", async () => {
        const actRepo = new ActivityRepository();
        const activity = await addFakeActivity();

        const newTrashed = true;
        const actual = await actRepo.update(activity.id, {
            trashed: newTrashed,
        });

        expectActivitiesEqual(
            { ...activity.toObject(), trashed: newTrashed },
            actual
        );
    });

    test("should throw if invalid start time given", async () => {
        const actRepo = new ActivityRepository();
        const activity = await addFakeActivity();

        await expect(async () => {
            await actRepo.update(activity.id, {
                startTime: "INVALID DATE",
            });
        }).rejects.toThrow(InvalidDateError);
    });

    test("should throw if invalid end time given", async () => {
        const actRepo = new ActivityRepository();
        const activity = await addFakeActivity();

        await expect(async () => {
            await actRepo.update(activity.id, {
                endTime: "INVALID DATE",
            });
        }).rejects.toThrow(InvalidDateError);
    });

    test("should throw if null activity given", async () => {
        const actRepo = new ActivityRepository();
        const expected = await addFakeActivity();
        await expect(async () => {
            await actRepo.update(expected.id, null);
        }).rejects.toThrow(MissingModelInfoError);
    });

    test("should throw if no id given", async () => {
        const actRepo = new ActivityRepository();
        const expected = await addFakeActivity();
        await expect(async () => {
            await actRepo.update(null, {});
        }).rejects.toThrow(IdNotProvidedError);
    });

    test("should throw if invalid id given", async () => {
        const actRepo = new ActivityRepository();
        const expected = await addFakeActivity();
        await expect(async () => {
            await actRepo.update("INVALID ID", {});
        }).rejects.toThrow(InvalidIdFormatError);
    });

    test("should throw if activity doesn't exist", async () => {
        const actRepo = new ActivityRepository();
        const expected = await addFakeActivity();
        await expect(async () => {
            await actRepo.update(NON_EXISTANT_ID, {});
        }).rejects.toThrow(NotFoundError);
    });
});

describe("remove", () => {
    test("should delete activity from database", async () => {
        const actRepo = new ActivityRepository();
        const activity = await addFakeActivity();

        await actRepo.remove(activity.id);

        await expect(async () => {
            await actRepo.getById(activity.id);
        }).rejects.toThrow(NotFoundError);
    });

    test("should throw if no id given", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.remove(null);
        }).rejects.toThrow(IdNotProvidedError);
    });

    test("should throw if invalid id given", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.remove("INVALID ID");
        }).rejects.toThrow(InvalidIdFormatError);
    });

    test("should throw if activity not found", async () => {
        const actRepo = new ActivityRepository();

        await expect(async () => {
            await actRepo.remove(NON_EXISTANT_ID);
        }).rejects.toThrow(NotFoundError);
    });
});
