import { expect } from "@jest/globals";

export const expectActivityTypesEqual = (expected, actual) => {
    expect(actual.name).toEqual(expected.name);
    expect(actual._id).toEqual(expected._id);
};

export const expectActivityTypeArraysEqual = (expected, actual) => {
    if (expected.length !== actual.length)
        fail("Activity type arrays were of different lengths.");
    for (let i = 0; i < expected.length; i++) {
        expectActivityTypesEqual(expected[i], actual[i]);
    }
};

export const expectActivitiesEqual = (expected, actual) => {
    expect(actual._id).toEqual(expected._id);
    expect(actual.type).toEqual(expected.type);
    expectActivityTypesEqual(expected.type, actual.type);
    expect(actual.comment).toEqual(expected.comment);
    expect(actual.startTime).toEqual(expected.startTime);
    expect(actual.endTime).toEqual(expected.endTime);
    expect(actual.trashed).toBe(expected.trashed);
};

export const expectActivitiesArrayEqual = (expected, actual) => {
    if (expected.length !== actual.length)
        fail("Activity arrays were of different lengths.");
    for (let i = 0; i < expected.length; i++) {
        expectActivitiesEqual(expected[i], actual[i]);
    }
};
