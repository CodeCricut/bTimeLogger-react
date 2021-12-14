export const expectActivityTypesEqual = (expected, actual) => {
    expect(expected.name).toEqual(actual.name);
};

export const expectActivityTypeArraysEqual = (expected, actual) => {
    if (expected.length !== actual.length)
        fail("Activity type arrays were of different lengths.");
    for (let i = 0; i < expected.length; i++) {
        expectActivityTypesEqual(expected[i], actual[i]);
    }
};

export const expectActivitiesEqual = (expected, actual) => {
    expect(expected.type).toEqual(actual.type);
    expect(expected.startTime).toEqual(actual.startTime);
    expect(expected.endTime).toEqual(actual.endTime);
    expect(expected.comment).toEqual(actual.comment);
    expect(expected.trashed).toBe(actual.trashed);
};

export const expectActivitiesArrayEqual = (expected, actual) => {
    if (expected.length !== actual.length)
        fail("Activity arrays were of different lengths.");
    for (let i = 0; i < expected.length; i++) {
        expectActivitiesEqual(expected[i], actual[i]);
    }
};
