// const TypeRepository = require("../../src/repositories/ActivityRepository.js");
import { TypeRepository } from "../../src/repositories/TypeRepository.js";
// const { dbConnect, dbDisconnect } = require("../dbHandler.utils.js");
import { dbConnect, dbDisconnect } from "../dbHandler.utils.js";

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("getAll", () => {
    test("should return empty array when no types", async () => {
        const typeRepo = new TypeRepository();
        const expected = [];
        const actual = await typeRepo.getAll();
        expect(actual).toEqual(expected);
    });

    test("should return array when some types", () => {});
});
