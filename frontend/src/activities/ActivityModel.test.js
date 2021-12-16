import {
    ActivityModel,
    mapObjectToModel,
    mapObjectsToModels,
} from "./ActivityModel.js";

import {
    expectActivitiesEqual,
    expectActivitiesArrayEqual,
} from "../test-helpers/util/expect-helpers.js";

import { allActivities } from "../test-helpers/fixtures/activities.js";

describe("mapObjectToModel", () => {
    it("returns ActivityModel with correct fields", () => {
        const activity = allActivities[0];
        const expected = new ActivityModel(
            activity._id,
            activity.type,
            activity.comment,
            activity.startTime,
            activity.endTime,
            activity.trashed
        );

        const actual = mapObjectToModel(activity);

        expectActivitiesEqual(expected, actual);
    });

    it("throws if object not given", () => {
        expect(() => {
            mapObjectToModel(null);
        }).toThrow(Error);
    });

    it("throw if object missing _id", () => {
        const activity = allActivities[0];
        expect(() => {
            mapObjectToModel({ ...activity, _id: null });
        }).toThrow(Error);
    });

    it("throw if object missing startTime", () => {
        const activity = allActivities[0];
        expect(() => {
            mapObjectToModel({ ...activity, startTime: null });
        }).toThrow(Error);
    });

    it("throw if object missing trashed", () => {
        const activity = allActivities[0];
        expect(() => {
            mapObjectToModel({ ...activity, trashed: null });
        }).toThrow(Error);
    });

    it("should not throw if missing non-required fields", () => {
        const activity = allActivities[0];
        const expected = new ActivityModel(
            activity._id,
            activity.type,
            null, // comment
            activity.startTime,
            null, // endTime
            activity.trashed
        );

        const actual = mapObjectToModel({
            ...activity,
            comment: null,
            endTime: null,
        });

        expectActivitiesEqual(expected, actual);
    });
});

describe("mapObjectsToModels", () => {
    it("return array of models with correct fields", () => {
        const activity0 = allActivities[0];
        const expected = [
            new ActivityModel(
                activity0._id,
                activity0.type,
                activity0.comment,
                activity0.startTime,
                activity0.endTime,
                activity0.trashed
            ),
        ];

        const actual = mapObjectsToModels([activity0]);

        expectActivitiesArrayEqual(expected, actual);
    });

    it("throw if objects null", () => {
        expect(() => {
            mapObjectsToModels(null);
        }).toThrow();
    });

    it("return empty if empty objects array", () => {
        const expected = [];
        const actual = mapObjectsToModels([]);
        expectActivitiesArrayEqual(expected, actual);
    });
});

describe("get startTimeDate", () => {
    it("returns date if valid startTime", () => {
        const expected = new Date();

        const model = new ActivityModel();
        model.startTime = expected.toISOString();

        const actual = model.startTimeDate;

        expect(actual).toEqual(expected);
    });

    it("returns null if null startTime", () => {
        const model = new ActivityModel();

        const actual = model.startTimeDate;

        expect(actual).toBeNull();
    });

    it("returns null if invalid startTime", () => {
        const model = new ActivityModel();
        model.startTime = "INVALID DATE";

        const actual = model.startTimeDate;

        expect(actual).toEqual(null);
    });
});

describe("get endTimeDate", () => {
    it("returns date if valid startTime", () => {
        const expected = new Date();

        const model = new ActivityModel();
        model.endTime = expected.toISOString();

        const actual = model.endTimeDate;

        expect(actual).toEqual(expected);
    });

    it("returns null if null endTime", () => {
        const model = new ActivityModel();

        const actual = model.endTimeDate;

        expect(actual).toBeNull();
    });

    it("returns null if invalid endTime", () => {
        const model = new ActivityModel();
        model.endTime = "INVALID DATE";

        const actual = model.endTimeDate;

        expect(actual).toEqual(null);
    });
});
