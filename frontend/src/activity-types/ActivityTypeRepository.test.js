import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { allTypes } from "../test-helpers/fixtures/activity-types.js";
import { ActivityTypeRepository } from "./ActivityTypeRepository.js";
import {
    expectActivityTypeArraysEqual,
    expectActivityTypesEqual,
} from "../test-helpers/util/expect-helpers.js";

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

describe("getById", () => {
    it("return type", async () => {
        const typeRepo = new ActivityTypeRepository();

        const expected = allTypes[0];
        axiosMock.onGet(`/types/${expected._id}`).reply(200, expected);

        const actual = await typeRepo.getById(expected._id);

        expectActivityTypesEqual(expected, actual);
    });

    it("throw if not success", async () => {
        const typeRepo = new ActivityTypeRepository();

        const expected = allTypes[0];
        axiosMock.onGet(`/types/${expected._id}`).reply(404);

        await expect(async () => {
            await typeRepo.getById(expected._id);
        }).rejects.toThrow(Error);
    });

    it("throw if not given id", async () => {
        const typeRepo = new ActivityTypeRepository();

        await expect(async () => {
            await typeRepo.getById(null);
        });
    });
});

describe("getByName", () => {
    it("returns type", async () => {
        const typeRepo = new ActivityTypeRepository();

        const expected = allTypes[0];
        axiosMock.onGet(`/types`).reply((config) => {
            if (config.params.name === expected.name) return [200, expected];
            else return [404];
        });

        const actual = await typeRepo.getByName(expected.name);

        expectActivityTypesEqual(expected, actual);
    });

    it("throw if not success", async () => {
        const typeRepo = new ActivityTypeRepository();
        const expected = allTypes[0];
        axiosMock.onGet(`/types`).reply(404);

        await expect(async () => {
            await typeRepo.getByName(expected.name);
        }).rejects.toThrow(Error);
    });

    it("throw if not given name", async () => {
        const typeRepo = new ActivityTypeRepository();

        await expect(async () => {
            await typeRepo.getByName(null);
        });
    });
});

describe("add", () => {
    it("return added type if success", async () => {
        const typeRepo = new ActivityTypeRepository();

        const expected = allTypes[0];
        axiosMock.onPost(`/types/add`).reply(200, expected);

        const actual = await typeRepo.add({ name: expected.name });

        expectActivityTypeArraysEqual(expected, actual);
    });

    it("throw if not success", async () => {
        const typeRepo = new ActivityTypeRepository();
        axiosMock.onPost(`/types/add`).reply(400);

        await expect(async () => {
            await typeRepo.add(allTypes[0]._id);
        }).rejects.toThrow(Error);
    });

    it("throw if not given type", async () => {
        const typeRepo = new ActivityTypeRepository();
        axiosMock.onPost(`/types/add`).reply(200);

        await expect(async () => {
            await typeRepo.add(null);
        }).rejects.toThrow(Error);
    });
});

describe("remove", () => {
    it("returns nothing if success", async () => {
        const typeRepo = new ActivityTypeRepository();

        const type = allTypes[0];
        axiosMock.onDelete(`/types/remove/${type._id}`).reply(200);

        const actual = await typeRepo.remove(type._id);
        expect(actual).toBeFalsy();
    });

    it("throw if not success", async () => {
        const typeRepo = new ActivityTypeRepository();

        const type = allTypes[0];
        axiosMock.onDelete(`/types/remove/${type._id}`).reply(404);

        await expect(async () => {
            await typeRepo.remove(type._id);
        }).rejects.toThrow(Error);
    });

    it("throw if not given id", async () => {
        await expect(async () => {
            await typeRepo.remove(null);
        }).rejects.toThrow(Error);
    });
});
