import ActivityType from "../../src/model/ActivityType.js";
import { TypeRepository } from "../../src/repositories/TypeRepository.js";
import { dbConnect, dbDisconnect } from "../dbHandler.utils.js";
import { fakeActivityType } from "../fixtures/index.js";

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("getAll", () => {
    test("should return empty array when no types", async () => {
        const typeRepo = new TypeRepository();
        const expected = [];
        const actual = await typeRepo.getAll();
        expect(actual).toEqual(expected);
    });

    test("should return array when some types", async () => {
        const type = new ActivityType(fakeActivityType);
        await type.save();
        expect(type).toBeTruthy();

        const typeRepo = new TypeRepository();

        const result = await typeRepo.getAll();

        // TODO: make expectActivityTypeArrayEqual and expectActivityTypesEqual
        expect(result).toHaveLength(1);

        const returnedType = result[0];
        expect(returnedType.name).toEqual(fakeActivityType.name);
    });
});
