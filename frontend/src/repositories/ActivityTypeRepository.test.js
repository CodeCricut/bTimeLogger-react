import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { allTypes } from "../test-helpers/fixtures/activity-types.js";
import { ActivityTypeRepository } from "./ActivityTypeRepository.js";
import { expectActivityTypeArraysEqual } from "../test-helpers/util/expect-helpers.js";

// Allows us to mock the behavior of axios (used for API calls)
const axiosMock = new MockAdapter(axios);

describe("getAll", () => {
    it("return empty array if none", async () => {
        const typeRepo = new ActivityTypeRepository();

        const expected = [];
        axiosMock.onGet("/types").reply(200, expected);

        const actual = await typeRepo.getAll();

        expectActivityTypeArraysEqual(expected, actual);
    });

    it("return array of types", async () => {
        const typeRepo = new ActivityTypeRepository();

        const expected = allTypes;
        axiosMock.onGet("/types").reply(200, expected);

        const actual = await typeRepo.getAll();

        expectActivityTypeArraysEqual(expected, actual);
    });

    it("throw if not success", async () => {
        const typeRepo = new ActivityTypeRepository();

        axiosMock.onGet("/types").reply(500, []);

        await expect(async () => {
            await typeRepo.getAll();
        }).rejects.toThrow(Error);
    });
});
