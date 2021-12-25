import { jest, expect, describe, it } from "@jest/globals";

import {
    allActivities,
    allActivitiesApiResponse,
    singleExpectedActivity,
    singleActivityApiResponse,
} from "../test-helpers/fixtures/activities.js";

import { ActivityRepository } from "./ActivityRepository.js";
import {
    expectActivitiesEqual,
    expectActivitiesArrayEqual,
} from "../test-helpers/util/expect-helpers.js";
import { ActivityTypeRepository } from "../activity-types/ActivityTypeRepository.js";

import {
    onGetAllActivites,
    onGetActivity,
    onStartNewActivity,
    onCreateCompletedActivity,
    onStopActivity,
    onResumeActivity,
    onTrashActivity,
    onUntrashActivity,
    onUpdateActivity,
    onRemoveActivity,
} from "../test-helpers/api/activities.js";

let typeRepo;
let activityRepo;
beforeEach(() => {
    typeRepo = new ActivityTypeRepository();
    activityRepo = new ActivityRepository(typeRepo);
});

describe("getAll", () => {
    it("return empty array if none", async () => {
        const expected = [];
        onGetAllActivites().reply(200, expected);

        const actual = await activityRepo.getAll();

        expectActivitiesArrayEqual(expected, actual);
    });

    it("return array of activities", async () => {
        const expected = allActivities;

        jest.spyOn(typeRepo, "getById").mockImplementation(
            (id) => expected.find((act) => act.type._id === id).type
        );
        onGetAllActivites().reply(200, allActivitiesApiResponse);

        const actual = await activityRepo.getAll();

        expectActivitiesArrayEqual(expected, actual);
    });

    it("throw if not success", async () => {
        onGetAllActivites().reply(500, []);

        await expect(async () => {
            await activityRepo.getAll();
        }).rejects.toThrow(Error);
    });
});

describe("getById", () => {
    it("returns activity", async () => {
        const expected = singleExpectedActivity;

        jest.spyOn(typeRepo, "getById").mockResolvedValue(expected.type);
        onGetActivity(expected._id).reply(200, singleActivityApiResponse);

        const actual = await activityRepo.getById(expected._id);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const expected = singleExpectedActivity;

        onGetActivity(expected._id).reply(404);

        await expect(async () => {
            await activityRepo.getById(expected._id);
        }).rejects.toThrow(Error);
    });

    it("throws if not given id", async () => {
        await expect(async () => {
            await activityRepo.getById(expected._id);
        }).rejects.toThrow(Error);
    });
});

describe("startNew", () => {
    it("return started activity if success", async () => {
        const expected = singleExpectedActivity;
        jest.spyOn(typeRepo, "getById").mockResolvedValue(expected.type);
        onStartNewActivity().reply(200, singleActivityApiResponse);

        const actual = await activityRepo.startNew(expected);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        onStartNewActivity().reply(400);

        await expect(async () => {
            await activityRepo.startNew(singleExpectedActivity);
        }).rejects.toThrow(Error);
    });

    it("throws if not given activity", async () => {
        await expect(async () => {
            await activityRepo.startNew(null);
        }).rejects.toThrow(Error);
    });
});

describe("createCompleted", () => {
    it("returns created activity if success", async () => {
        const expected = singleExpectedActivity;
        jest.spyOn(typeRepo, "getById").mockResolvedValue(expected.type);
        onCreateCompletedActivity().reply(200, singleActivityApiResponse);

        const actual = await activityRepo.createCompleted(
            singleExpectedActivity
        );

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        onCreateCompletedActivity().reply(400);

        await expect(async () => {
            await activityRepo.createCompleted(singleExpectedActivity);
        }).rejects.toThrow(Error);
    });

    it("throws if not given activity", async () => {
        await expect(async () => {
            await activityRepo.createCompleted(null);
        }).rejects.toThrow(Error);
    });
});

describe("stopActivity", () => {
    it("returns stopped activity if success", async () => {
        const expected = singleExpectedActivity;
        jest.spyOn(typeRepo, "getById").mockResolvedValue(expected.type);
        onStopActivity(expected._id).reply(200, singleActivityApiResponse);

        const actual = await activityRepo.stopActivity(expected._id);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activity = singleExpectedActivity;
        onStopActivity(activity._id).reply(400);

        await expect(async () => {
            await activityRepo.stopActivity(activity._id);
        }).rejects.toThrow(Error);
    });

    it("throws if not given id", async () => {
        await expect(async () => {
            await activityRepo.stopActivity(null);
        }).rejects.toThrow(Error);
    });
});

describe("resumeActivity", () => {
    it("returns resumed activity if success", async () => {
        const expected = singleExpectedActivity;
        jest.spyOn(typeRepo, "getById").mockResolvedValue(expected.type);
        onResumeActivity(expected._id).reply(200, singleActivityApiResponse);

        const actual = await activityRepo.resumeActivity(expected._id);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activity = singleExpectedActivity;
        onResumeActivity(activity._id).reply(400);

        await expect(async () => {
            await activityRepo.resumeActivity(activity._id);
        }).rejects.toThrow(Error);
    });

    it("throws if not given id", async () => {
        await expect(async () => {
            await activityRepo.resumeActivity(null);
        }).rejects.toThrow(Error);
    });
});

describe("trashActivity", () => {
    it("returns trashed activity if success", async () => {
        const expected = singleExpectedActivity;
        jest.spyOn(typeRepo, "getById").mockResolvedValue(expected.type);
        onTrashActivity(expected._id).reply(200, singleActivityApiResponse);

        const actual = await activityRepo.trashActivity(expected._id);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activity = singleExpectedActivity;
        onTrashActivity(activity._id).reply(400);

        await expect(async () => {
            await activityRepo.trashActivity(activity._id);
        }).rejects.toThrow(Error);
    });

    it("throws if not given id", async () => {
        await expect(async () => {
            await activityRepo.trashActivity(null);
        }).rejects.toThrow(Error);
    });
});

describe("untrashActivity", () => {
    it("returns untrashed activity if success", async () => {
        const expected = singleExpectedActivity;
        jest.spyOn(typeRepo, "getById").mockResolvedValue(expected.type);
        onUntrashActivity(expected._id).reply(200, singleActivityApiResponse);

        const actual = await activityRepo.untrashActivity(expected._id);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activity = singleExpectedActivity;
        onUntrashActivity(activity._id).reply(400);

        await expect(async () => {
            await activityRepo.untrashActivity(activity._id);
        }).rejects.toThrow(Error);
    });

    it("throws if not given id", async () => {
        await expect(async () => {
            await activityRepo.untrashActivity(null);
        }).rejects.toThrow(Error);
    });
});

describe("updateActivity", () => {
    it("returns updated activity if success", async () => {
        const expected = singleExpectedActivity;
        jest.spyOn(typeRepo, "getById").mockResolvedValue(expected.type);
        onUpdateActivity(expected._id).reply(200, singleActivityApiResponse);

        const actual = await activityRepo.updateActivity(
            expected._id,
            expected
        );

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activity = singleExpectedActivity;
        onUpdateActivity(activity._id).reply(400);

        await expect(async () => {
            await activityRepo.updateActivity(activity._id, activity);
        }).rejects.toThrow(Error);
    });

    it("throws if id not given", async () => {
        const activity = singleExpectedActivity;

        await expect(async () => {
            await activityRepo.updateActivity(null, activity);
        }).rejects.toThrow(Error);
    });

    it("throws if activity null", async () => {
        const activity = singleExpectedActivity;

        await expect(async () => {
            await activityRepo.updateActivity(activity._id, null);
        }).rejects.toThrow(Error);
    });
});

describe("removeActivity", () => {
    it("does not throw if success", async () => {
        const activity = singleExpectedActivity;
        onRemoveActivity(activity._id).reply(200);

        await activityRepo.removeActivity(activity._id);
    });

    it("throws if not success", async () => {
        const activity = singleExpectedActivity;
        onRemoveActivity(activity._id).reply(400);

        await expect(async () => {
            await activityRepo.removeActivity(activity._id);
        }).rejects.toThrow(Error);
    });

    it("throws if id not given", async () => {
        await expect(async () => {
            await activityRepo.removeActivity(null);
        }).rejects.toThrow(Error);
    });
});
