import { ActivityModel, mapObjectToModel } from "./ActivityModel.js";

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

describe("mapObjectsToModels", () => {});

describe("get startTimeDate", () => {});

describe("get endTimeDate", () => {});
