import { selectActivitiesWithText } from "./activity-selectors";

const COMMENT_TEXT = "COMMENT_TEXT",
    TYPE_NAME_TEXT = "TYPE_NAME_TEXT",
    OTHER_TEXT = "OTHER_TEXT";

const activities = [
    {
        type: { name: TYPE_NAME_TEXT },
        comment: OTHER_TEXT,
    },
    {
        type: { name: OTHER_TEXT },
        comment: COMMENT_TEXT,
    },
];
test("should select activities containing text in comment", () => {
    const selected = selectActivitiesWithText(activities, COMMENT_TEXT);
    expect(selected.length).toBe(1);
});

test("should select activities containing text in type name", () => {
    const selected = selectActivitiesWithText(activities, TYPE_NAME_TEXT);
    expect(selected.length).toBe(1);
});
