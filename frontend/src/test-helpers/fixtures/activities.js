import { allTypes } from "./activity-types.js";

export const allActivities = [
    {
        _id: "_id1",
        type: allTypes[0]._id,
        comment: "comment1",
        startTime: "2021-12-13T04:20:00.361Z",
        endTime: "2021-12-13T04:40:00.361Z",
        trashed: false,
    },
    {
        _id: "_id2",
        type: allTypes[1]._id,
        comment: "comment2",
        startTime: "2021-12-13T04:30:00.361Z",
        endTime: "2021-12-13T04:40:00.361Z",
        trashed: true,
    },
];
