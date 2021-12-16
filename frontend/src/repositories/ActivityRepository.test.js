import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { allActivities } from "../test-helpers/fixtures/activities.js";

import { ActivityRepository } from "./ActivityRepository.js";
import {
    expectActivitiesEqual,
    expectActivitiesArrayEqual,
} from "../test-helpers/util/expect-helpers.js";

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
        axiosMock.onGet("/activities").reply(200, expected);

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
