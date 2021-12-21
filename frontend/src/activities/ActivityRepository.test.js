import axios from "axios";
import MockAdapter from "axios-mock-adapter";
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

// Allows us to mock the behavior of axios (used for API calls)
const axiosMock = new MockAdapter(axios);

describe("getAll", () => {
    it("return empty array if none", async () => {
        const activityRepo = new ActivityRepository();

        const expected = [];
        axiosMock.onGet("/activities").reply(200, expected);

        const actual = await activityRepo.getAll();

        expectActivitiesArrayEqual(expected, actual);
    });

    it("return array of activities", async () => {
        const activityRepo = new ActivityRepository();

        const expected = allActivities;
        axiosMock.onGet("/activities").reply(200, allActivitiesApiResponse);

        const actual = await activityRepo.getAll();

        expectActivitiesArrayEqual(expected, actual);
    });

    it("throw if not success", async () => {
        const activityRepo = new ActivityRepository();

        axiosMock.onGet("/activities").reply(500, []);

        await expect(async () => {
            await activityRepo.getAll();
        }).rejects.toThrow(Error);
    });
});

describe("getById", () => {
    it("returns activity", async () => {
        const typeRepo = new ActivityTypeRepository();
        const activityRepo = new ActivityRepository(typeRepo);

        const expected = singleExpectedActivity;

        jest.spyOn(typeRepo, "getById").mockResolvedValue(expected.type);
        axiosMock
            .onGet(`/activities/${expected._id}`)
            .reply(200, singleActivityApiResponse);

        const actual = await activityRepo.getById(expected._id);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activityRepo = new ActivityRepository();
        const expected = singleExpectedActivity;

        axiosMock.onGet(`/activities/${expected._id}`).reply(404);

        await expect(async () => {
            await activityRepo.getById(expected._id);
        }).rejects.toThrow(Error);
    });

    it("throws if not given id", async () => {
        const activityRepo = new ActivityRepository();

        await expect(async () => {
            await activityRepo.getById(expected._id);
        }).rejects.toThrow(Error);
    });
});

describe("startNew", () => {
    it("return started activity if success", async () => {
        const activityRepo = new ActivityRepository();

        const expected = singleExpectedActivity;
        axiosMock
            .onPost(`/activities/start-new`)
            .reply(200, singleActivityApiResponse);

        const actual = await activityRepo.startNew(expected);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activityRepo = new ActivityRepository();

        axiosMock.onPost(`/activities/start-new`).reply(400);

        await expect(async () => {
            await activityRepo.startNew(singleExpectedActivity);
        }).rejects.toThrow(Error);
    });

    it("throws if not given activity", async () => {
        const activityRepo = new ActivityRepository();

        await expect(async () => {
            await activityRepo.startNew(null);
        }).rejects.toThrow(Error);
    });
});

describe("createCompleted", () => {
    it("returns created activity if success", async () => {
        const activityRepo = new ActivityRepository();

        const expected = singleExpectedActivity;
        axiosMock
            .onPost(`/activities/create-completed`)
            .reply(200, singleActivityApiResponse);

        const actual = await activityRepo.createCompleted(
            singleExpectedActivity
        );

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activityRepo = new ActivityRepository();

        axiosMock.onPost(`/activities/create-completed`).reply(400);

        await expect(async () => {
            await activityRepo.createCompleted(singleExpectedActivity);
        }).rejects.toThrow(Error);
    });

    it("throws if not given activity", async () => {
        const activityRepo = new ActivityRepository();

        await expect(async () => {
            await activityRepo.createCompleted(null);
        }).rejects.toThrow(Error);
    });
});

describe("stopActivity", () => {
    it("returns stopped activity if success", async () => {
        const activityRepo = new ActivityRepository();

        const expected = singleExpectedActivity;
        axiosMock
            .onPatch(`/activities/stop/${expected._id}`)
            .reply(200, singleActivityApiResponse);

        const actual = await activityRepo.stopActivity(expected._id);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activityRepo = new ActivityRepository();

        const activity = singleExpectedActivity;
        axiosMock.onPatch(`/activities/stop/${activity._id}`).reply(400);

        await expect(async () => {
            await activityRepo.stopActivity(activity._id);
        }).rejects.toThrow(Error);
    });

    it("throws if not given id", async () => {
        const activityRepo = new ActivityRepository();

        await expect(async () => {
            await activityRepo.stopActivity(null);
        }).rejects.toThrow(Error);
    });
});

describe("resumeActivity", () => {
    it("returns resumed activity if success", async () => {
        const activityRepo = new ActivityRepository();

        const expected = singleExpectedActivity;
        axiosMock
            .onPatch(`/activities/resume/${expected._id}`)
            .reply(200, singleActivityApiResponse);

        const actual = await activityRepo.resumeActivity(expected._id);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activityRepo = new ActivityRepository();

        const activity = singleExpectedActivity;
        axiosMock.onPatch(`/activities/resume/${activity._id}`).reply(400);

        await expect(async () => {
            await activityRepo.resumeActivity(activity._id);
        }).rejects.toThrow(Error);
    });

    it("throws if not given id", async () => {
        const activityRepo = new ActivityRepository();

        await expect(async () => {
            await activityRepo.resumeActivity(null);
        }).rejects.toThrow(Error);
    });
});

describe("trashActivity", () => {
    it("returns trashed activity if success", async () => {
        const activityRepo = new ActivityRepository();

        const expected = singleExpectedActivity;
        axiosMock
            .onPatch(`/activities/trash/${expected._id}`)
            .reply(200, singleActivityApiResponse);

        const actual = await activityRepo.trashActivity(expected._id);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activityRepo = new ActivityRepository();

        const activity = singleExpectedActivity;
        axiosMock.onPatch(`/activities/trash/${activity._id}`).reply(400);

        await expect(async () => {
            await activityRepo.trashActivity(activity._id);
        }).rejects.toThrow(Error);
    });

    it("throws if not given id", async () => {
        const activityRepo = new ActivityRepository();

        await expect(async () => {
            await activityRepo.trashActivity(null);
        }).rejects.toThrow(Error);
    });
});

describe("untrashActivity", () => {
    it("returns untrashed activity if success", async () => {
        const activityRepo = new ActivityRepository();

        const expected = singleExpectedActivity;
        axiosMock
            .onPatch(`/activities/untrash/${expected._id}`)
            .reply(200, singleActivityApiResponse);

        const actual = await activityRepo.untrashActivity(expected._id);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activityRepo = new ActivityRepository();

        const activity = singleExpectedActivity;
        axiosMock.onPatch(`/activities/untrash/${activity._id}`).reply(400);

        await expect(async () => {
            await activityRepo.untrashActivity(activity._id);
        }).rejects.toThrow(Error);
    });

    it("throws if not given id", async () => {
        const activityRepo = new ActivityRepository();

        await expect(async () => {
            await activityRepo.untrashActivity(null);
        }).rejects.toThrow(Error);
    });
});

describe("updateActivity", () => {
    it("returns updated activity if success", async () => {
        const activityRepo = new ActivityRepository();

        const expected = singleExpectedActivity;
        axiosMock
            .onPut(`/activities/update/${expected._id}`)
            .reply(200, singleActivityApiResponse);

        const actual = await activityRepo.updateActivity(
            expected._id,
            expected
        );

        expectActivitiesEqual(expected, actual);
    });

    it("throws if not success", async () => {
        const activityRepo = new ActivityRepository();

        const activity = singleExpectedActivity;
        axiosMock.onPut(`/activities/update/${activity._id}`).reply(400);

        await expect(async () => {
            await activityRepo.updateActivity(activity._id, activity);
        }).rejects.toThrow(Error);
    });

    it("throws if id not given", async () => {
        const activityRepo = new ActivityRepository();

        const activity = singleExpectedActivity;

        await expect(async () => {
            await activityRepo.updateActivity(null, activity);
        }).rejects.toThrow(Error);
    });

    it("throws if activity null", async () => {
        const activityRepo = new ActivityRepository();

        const activity = singleExpectedActivity;

        await expect(async () => {
            await activityRepo.updateActivity(activity._id, null);
        }).rejects.toThrow(Error);
    });
});

describe("removeActivity", () => {
    it("does not throw if success", async () => {
        const activityRepo = new ActivityRepository();

        const activity = singleExpectedActivity;
        axiosMock.onDelete(`/activities/remove/${activity._id}`).reply(200);

        await activityRepo.removeActivity(activity._id);
    });

    it("throws if not success", async () => {
        const activityRepo = new ActivityRepository();

        const activity = singleExpectedActivity;
        axiosMock.onDelete(`/activities/remove/${activity._id}`).reply(400);

        await expect(async () => {
            await activityRepo.removeActivity(activity._id);
        }).rejects.toThrow(Error);
    });

    it("throws if id not given", async () => {
        const activityRepo = new ActivityRepository();

        await expect(async () => {
            await activityRepo.removeActivity(null);
        }).rejects.toThrow(Error);
    });
});
