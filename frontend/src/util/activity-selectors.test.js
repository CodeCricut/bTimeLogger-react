import { describe, it } from "@jest/globals";
import {
    arrayJoinShared,
    selectActivitesBetweenDates,
    selectActivitiesAfterDate,
    selectActivitiesBeforeDate,
    selectActivitiesWithText,
} from "./activity-selectors.js";

const COMMENT_TEXT = "COMMENT_TEXT",
    TYPE_NAME_TEXT = "TYPE_NAME_TEXT",
    OTHER_TEXT = "OTHER_TEXT";

const activities = [
    {
        type: { name: TYPE_NAME_TEXT },
        comment: OTHER_TEXT,
        startTime: new Date(2021, 8, 21),
        endTime: new Date(2021, 8, 22),
    },
    {
        type: { name: OTHER_TEXT },
        comment: COMMENT_TEXT,
        startTime: new Date(2000, 1, 1),
        endTime: new Date(2010, 1, 1),
    },
];
const END_TIME = new Date(2005, 1, 1);
const END_TIME_ACTIVITIES = [activities[1]]; // the activity which should be selected by selectActivitiesBeforeDate(_, END_TIME);
const START_TIME = new Date(2015, 1, 1);
const START_TIME_ACTIVITIES = [activities[0]]; // the activity which should be selected by selectActivitiesBeforeDate(_, END_TIME);

describe("selectActivitesWithText", () => {
    it("selects activities with text in comment", () => {
        const selected = selectActivitiesWithText(activities, COMMENT_TEXT);
        expect(selected.length).toBe(1);
    });

    it("selects activities with text in type name", () => {
        const selected = selectActivitiesWithText(activities, TYPE_NAME_TEXT);
        expect(selected.length).toBe(1);
    });
});

describe("selectActivitiesBeforeDate", () => {
    it("selects activities starting before date", () => {
        const actsBeforeDate = selectActivitiesBeforeDate(activities, END_TIME);
        expect(actsBeforeDate).toEqual(END_TIME_ACTIVITIES);
    });
});

describe("selectActivitiesAfterDate", () => {
    it("selects activites ending after date", () => {
        const actsAfterDate = selectActivitiesAfterDate(activities, START_TIME);
        expect(actsAfterDate).toEqual(START_TIME_ACTIVITIES);
    });
});

describe("selectActivitiesBetweenDates", () => {
    it("selects activites between dates", () => {
        let actsBetweenDate = selectActivitesBetweenDates(
            activities,
            START_TIME,
            END_TIME
        ); // none should be selected
        expect(actsBetweenDate.length).toBe(0);

        actsBetweenDate = selectActivitesBetweenDates(
            activities,
            START_TIME,
            activities[0].endTime
        );
        expect(actsBetweenDate).toEqual([activities[0]]);

        actsBetweenDate = selectActivitesBetweenDates(
            activities,
            activities[1].startTime,
            END_TIME
        );
        expect(actsBetweenDate).toEqual([activities[1]]);

        actsBetweenDate = selectActivitesBetweenDates(
            activities,
            new Date(1980, 1, 1),
            new Date(2030, 1, 1)
        );
        expect(actsBetweenDate).toEqual(activities);
    });
});

describe("arrayJoinedShared", () => {
    it("should return an array of elements present in both arrays, should not mutate original arrays", () => {
        const arrA = ["a", "b", "c"];
        const arrB = ["b", "c", "d", "e"];

        const joined = arrayJoinShared(arrA, arrB);

        expect(joined).toEqual(["b", "c"]);
        expect(arrA.length).toBe(3);
        expect(arrB.length).toBe(4);
    });
});
