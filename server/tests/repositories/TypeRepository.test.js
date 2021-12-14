import ActivityType from "../../src/model/ActivityType.js";
import AlreadyAddedError from "../../src/repositories/errors/AlreadyAddedError.js";
import IdNotProvidedError from "../../src/repositories/errors/IdNotProvidedError.js";
import InvalidIdFormatError from "../../src/repositories/errors/InvalidIdFormatError.js";
import MissingModelInfoError from "../../src/repositories/errors/MissingModelInfoError.js";
import NotFoundError from "../../src/repositories/errors/NotFoundError.js";
import { TypeRepository } from "../../src/repositories/TypeRepository.js";
import { dbConnect, dbDisconnect, resetDb } from "../dbHandler.utils.js";
import { fakeActivityType, NON_EXISTANT_ID } from "../fixtures/index.js";
import {
    expectActivityTypeArraysEqual,
    expectActivityTypesEqual,
} from "../util/expect-helpers.js";

beforeAll(async () => {
    dbConnect(); // awaiting will let afterEach run; must run to completion
});

afterAll(async () => {
    dbDisconnect();
});

afterEach(async () => resetDb());

const addFakeActivityType = async () => {
    const type = new ActivityType(fakeActivityType);
    await type.save();
    expect(type).toBeTruthy();
    return type;
};

describe("getAll", () => {
    test("should return empty array when no types", async () => {
        const typeRepo = new TypeRepository();
        const expected = [];
        const actual = await typeRepo.getAll();
        expectActivityTypeArraysEqual(expected, actual);
    });

    test("should return array when some types", async () => {
        const type = await addFakeActivityType();

        const typeRepo = new TypeRepository();

        const expected = [type];
        const actual = await typeRepo.getAll();

        expect(actual).toHaveLength(1);
        expectActivityTypeArraysEqual(expected, actual);
    });

    test("should not return types added after call", async () => {
        const typeRepo = new TypeRepository();

        // Get all
        const actual = await typeRepo.getAll();
        const expected = [];

        // Add a type
        await addFakeActivityType();

        expect(actual).toHaveLength(0);
        expectActivityTypeArraysEqual(expected, actual);
    });
});

describe("getById", () => {
    test("should return one with valid id", async () => {
        const expected = await addFakeActivityType();
        const typeRepo = new TypeRepository();

        const actual = await typeRepo.getById(expected.id);

        expectActivityTypesEqual(expected, actual);
    });

    test("should throw if id not provided", async () => {
        const typeRepo = new TypeRepository();
        expect(async () => {
            await typeRepo.getById(null);
        }).rejects.toThrow(IdNotProvidedError);
    });

    test("should throw if invalid id provided", async () => {
        const typeRepo = new TypeRepository();

        expect(async () => {
            await typeRepo.getById("INVALID ID");
        }).rejects.toThrow(InvalidIdFormatError);
    });

    test("should throw if not found", async () => {
        const typeRepo = new TypeRepository();
        expect(async () => {
            await typeRepo.getById(NON_EXISTANT_ID);
        }).rejects.toThrow(NotFoundError);
    });
});

describe("add", () => {
    test("should add if name given", async () => {
        const typeRepo = new TypeRepository();
        const added = await typeRepo.add(fakeActivityType.name);

        const retrieved = await typeRepo.getById(added.id);

        expectActivityTypesEqual(added, retrieved);
    });

    test("should throw if name not given", async () => {
        const typeRepo = new TypeRepository();
        expect(async () => {
            await typeRepo.add("");
        }).rejects.toThrow(MissingModelInfoError);
        expect(async () => {
            await typeRepo.add(null);
        }).rejects.toThrow(MissingModelInfoError);
    });

    test("should throw if type with name already exists", async () => {
        const alreadyAdded = await addFakeActivityType();
        const typeRepo = new TypeRepository();

        expect(async () => {
            await typeRepo.add(alreadyAdded.name);
        }).rejects.toThrow(AlreadyAddedError);
    });
});
