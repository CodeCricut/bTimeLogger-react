import ActivityType from "../../src/model/ActivityType.js";
import { TypeRepository } from "../../src/repositories/TypeRepository.js";
import { dbConnect, dbDisconnect, resetDb } from "../dbHandler.utils.js";
import { fakeActivityType } from "../fixtures/index.js";
import { expectActivityTypeArraysEqual } from "../util/expect-helpers.js";

beforeAll(async () => {
    dbConnect(); // awaiting will let afterEach run; must run to completion
});

afterAll(async () => {
    dbDisconnect();
});

afterEach(async () => resetDb());

describe("getAll", () => {
    test("should return empty array when no types", async () => {
        const typeRepo = new TypeRepository();
        const expected = [];
        const actual = await typeRepo.getAll();
        expectActivityTypeArraysEqual(expected, actual);
    });

    test("should return array when some types", async () => {
        const type = new ActivityType(fakeActivityType);
        await type.save();
        expect(type).toBeTruthy();

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
        const type = new ActivityType(fakeActivityType);
        await type.save();
        expect(type).toBeTruthy();

        expect(actual).toHaveLength(0);
        expectActivityTypeArraysEqual(expected, actual);
    });
});
