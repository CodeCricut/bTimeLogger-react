import {
    ActivityTypeModel,
    mapObjectsToModels,
    mapObjectToModel,
} from "./ActivityTypeModel.js";
import {
    expectActivityTypeArraysEqual,
    expectActivityTypesEqual,
} from "../test-helpers/util/expect-helpers.js";

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

describe("mapObjectsToModels", () => {
    it("return array of models with correct fields", () => {
        const objs = [
            { _id: "id1", name: "name1" },
            { _id: "id2", name: "name2" },
        ];
        const expected = [
            new ActivityTypeModel("id1", "name1"),
            new ActivityTypeModel("id2", "name2"),
        ];

        const actual = mapObjectsToModels(objs);

        expectActivityTypeArraysEqual(expected, actual);
    });

    it("throw if objects null", () => {
        expect(() => {
            mapObjectsToModels(null);
        }).toThrow();
    });

    it("return empty if empty objects array", () => {
        const expected = [];
        const actual = mapObjectsToModels([]);
        expectActivityTypeArraysEqual(expected, actual);
    });
});
