import {
    allTypes,
    codingType,
    emptyTypes,
    readingType,
    studyingType,
} from "../test-helpers/fixtures/activity-types.js";
import { ActivityTypeRepository } from "./ActivityTypeRepository.js";
import {
    expectActivityTypeArraysEqual,
    expectActivityTypesEqual,
} from "../test-helpers/util/expect-helpers.js";
import { describe, it, beforeEach } from "@jest/globals";

import {
    onAddType,
    onGetAllTypes,
    onGetType,
    onRemoveType,
    returnOnGetByName,
} from "../test-helpers/api/types.js";

let typeRepo;

beforeEach(() => {
    typeRepo = new ActivityTypeRepository();
});

describe("getAll", () => {
    it("return empty array if none", async () => {
        const expected = [];
        onGetAllTypes().reply(200, expected);

        const actual = await typeRepo.getAll();

        expectActivityTypeArraysEqual(expected, actual);
    });

    it("return array of types", async () => {
        const expected = allTypes;
        onGetAllTypes().reply(200, expected);

        const actual = await typeRepo.getAll();

        expectActivityTypeArraysEqual(expected, actual);
    });

    it("throw if not success", async () => {
        onGetAllTypes().reply(500, []);

        await expect(async () => {
            await typeRepo.getAll();
        }).rejects.toThrow(Error);
    });
});

describe("getById", () => {
    it("return type", async () => {
        const expected = codingType;
        onGetType(expected._id).reply(200, expected);

        const actual = await typeRepo.getById(expected._id);

        expectActivityTypesEqual(expected, actual);
    });

    it("throw if not success", async () => {
        const expected = codingType;
        onGetType(expected._id).reply(404);

        await expect(async () => {
            await typeRepo.getById(expected._id);
        }).rejects.toThrow(Error);
    });

    it("throw if not given id", async () => {
        await expect(async () => {
            await typeRepo.getById(null);
        });
    });
});

describe("getByName", () => {
    it("returns type", async () => {
        const expected = codingType;
        returnOnGetByName(expected.name, 200, expected);

        const actual = await typeRepo.getByName(expected.name);

        expectActivityTypesEqual(expected, actual);
    });

    it("throw if not success", async () => {
        const expected = codingType;
        returnOnGetByName(expected.name, 404);

        await expect(async () => {
            await typeRepo.getByName(expected.name);
        }).rejects.toThrow(Error);
    });

    it("throw if not given name", async () => {
        await expect(async () => {
            await typeRepo.getByName(null);
        });
    });
});

describe("add", () => {
    it("return added type if success", async () => {
        const expected = codingType;
        onAddType().reply(200, expected);

        const actual = await typeRepo.add({ name: expected.name });

        expectActivityTypeArraysEqual(expected, actual);
    });

    it("throw if not success", async () => {
        onAddType().reply(400);

        await expect(async () => {
            await typeRepo.add(codingType._id);
        }).rejects.toThrow(Error);
    });

    it("throw if not given type", async () => {
        onAddType().reply(200);

        await expect(async () => {
            await typeRepo.add(null);
        }).rejects.toThrow(Error);
    });
});

describe("remove", () => {
    it("returns nothing if success", async () => {
        const type = codingType;
        onRemoveType(type._id).reply(200);

        const actual = await typeRepo.remove(type._id);
        expect(actual).toBeFalsy();
    });

    it("throw if not success", async () => {
        const type = codingType;
        onRemoveType(type._id).reply(404);

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
