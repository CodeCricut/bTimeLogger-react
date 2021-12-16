import { ActivityTypeModel, mapObjectToModel } from "./ActivityTypeModel.js";
import { expectActivityTypesEqual } from "../test-helpers/util/expect-helpers.js";

describe("mapObjectToModel", () => {
    it("return ActivityTypeModel with correct fields", () => {
        const name = "name",
            _id = "id";
        const obj = { name, _id };
        const expected = new ActivityTypeModel(_id, name);

        const actual = mapObjectToModel(obj);

        expectActivityTypesEqual(expected, actual);
    });

    it("throw if not given object", () => {
        expect(() => {
            mapObjectToModel(null);
        }).toThrow(Error);
    });

    it("throw if object missing _id", () => {
        expect(() => {
            mapObjectToModel({ name: "name" });
        }).toThrow(Error);
    });

    it("throw if object missing name", () => {
        expect(() => {
            mapObjectToModel({ _id: "id" });
        }).toThrow(Error);
    });
});
