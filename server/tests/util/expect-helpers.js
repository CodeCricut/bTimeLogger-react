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
