import {
    dbConnect,
    dbDisconnect,
    resetDb,
} from "../../tests/dbHandler.utils.js";
import request from "supertest";

import dotenv from "dotenv";
import express from "express";
import typesRouter from "./types.js";
import activitiesRouter from "./activities.js";
import cors from "cors";
import {
    expectActivitiesArrayEqual,
    expectActivitiesEqual,
} from "../../tests/util/expect-helpers.js";
import { NON_EXISTANT_ID } from "../../tests/fixtures/index.js";

dotenv.config();

let app;
let server;

beforeAll(async () => {
    await dbConnect();
    app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/types", typesRouter);
    app.use("/activities", activitiesRouter);
    server = app.listen(process.env.TEST_SERVER_PORT);
});

afterAll(async () => {
    await dbDisconnect();
    server.close();
});

afterEach(async () => await resetDb());

/**
 * Add a type using the API.
 * @param {string} name The name of the type to add
 * @returns The JSON representation of the response body
 */
const addTestType = async (name) => {
    const responseBody = await request(app)
        .post("/types/add")
        .send({ name })
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => response.body);

    return responseBody;
};

/**
 * Add an activity using the API.
 * @param {string} typeId The activity type id of this activity's type
 * @returns The added activity
 */
const addTestActivity = async (typeId) => {
    const responseBody = await request(app)
        .post("/activities/create-completed")
        .send({
            type: typeId,
            comment: "started at 9:56, ended at 10:00",
            startTime: "2021-12-13T03:55:30.603Z",
            endTime: "2021-12-13T04:00:16.847Z",
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => response.body);

    return responseBody;
};

describe("get all activities", () => {
    test("should get activities", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const activities = await request(app)
            .get("/activities")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expectActivitiesArrayEqual([activity], activities);
    });
});

describe("get activity by id", () => {
    test("should return activity", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const returned = await request(app)
            .get(`/activities/${activity._id}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expectActivitiesEqual(activity, returned);
    });

    test("should return invalid request if invalid id", async () => {
        await request(app)
            .get(`/activities/INVALID-ID`)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return not found if non-existant id", async () => {
        await request(app)
            .get(`/activities/${NON_EXISTANT_ID}`)
            .expect("Content-Type", /html/)
            .expect(404);
    });
});

describe("start new activity", () => {
    test("should start activity with correct fields", async () => {
        const type = await addTestType("TEST TYPE");

        const activity = {
            type: type._id,
            comment: "activity comment",
        };

        const addedActivity = await request(app)
            .post(`/activities/start-new`)
            .send(activity)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(addedActivity.type).toEqual(activity.type);
        expect(addedActivity.comment).toEqual(activity.comment);
        expect(addedActivity.startTime).toBeTruthy();
        expect(addedActivity.endTime).toBeNull();
        expect(addedActivity.trashed).toBe(false);
    });

    test("should return invalid request if missing type", async () => {
        await request(app)
            .post(`/activities/start-new`)
            .send({
                comment: "activity comment",
            })
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request if invalid type", async () => {
        await request(app)
            .post(`/activities/start-new`)
            .send({
                type: "INVALID TYPE",
                comment: "activity comment",
            })
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request if non-existant type", async () => {
        await request(app)
            .post(`/activities/start-new`)
            .send({
                type: NON_EXISTANT_ID,
                comment: "activity comment",
            })
            .expect("Content-Type", /html/)
            .expect(400);
    });
});

describe("create completed activity", () => {
    test("should create activity with correct fields", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = {
            type: type._id,
            comment: "activity comment",
            startTime: "2021-12-13T03:55:30.603Z",
            endTime: "2021-12-13T04:00:16.847Z",
        };

        const addedActivity = await request(app)
            .post(`/activities/create-completed`)
            .send(activity)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(addedActivity.type).toEqual(activity.type);
        expect(addedActivity.comment).toEqual(activity.comment);
        expect(addedActivity.startTime).toBeTruthy();
        expect(addedActivity.endTime).toBeTruthy();
        expect(addedActivity.trashed).toBe(false);
    });

    test("should return invalid request if missing start time", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = {
            type: type._id,
            comment: "activity comment",
            endTime: "2021-12-13T04:00:16.847Z",
        };

        await request(app)
            .post(`/activities/create-completed`)
            .send(activity)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request if missing end time", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = {
            type: type._id,
            comment: "activity comment",
            startTime: "2021-12-13T03:55:30.603Z",
        };

        await request(app)
            .post(`/activities/create-completed`)
            .send(activity)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request if missing type", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = {
            comment: "activity comment",
            startTime: "2021-12-13T03:55:30.603Z",
            endTime: "2021-12-13T04:00:16.847Z",
        };

        await request(app)
            .post(`/activities/create-completed`)
            .send(activity)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request if invalid type", async () => {
        const activity = {
            type: "INVALID TYPE",
            comment: "activity comment",
            startTime: "2021-12-13T03:55:30.603Z",
            endTime: "2021-12-13T04:00:16.847Z",
        };

        await request(app)
            .post(`/activities/create-completed`)
            .send(activity)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request if non-existant type", async () => {
        const activity = {
            type: NON_EXISTANT_ID,
            comment: "activity comment",
            startTime: "2021-12-13T03:55:30.603Z",
            endTime: "2021-12-13T04:00:16.847Z",
        };

        await request(app)
            .post(`/activities/create-completed`)
            .send(activity)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request if invalid start time", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = {
            type: type._id,
            comment: "activity comment",
            startTime: "INVALID",
            endTime: "2021-12-13T04:00:16.847Z",
        };

        await request(app)
            .post(`/activities/create-completed`)
            .send(activity)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request if invalid end time", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = {
            type: type._id,
            comment: "activity comment",
            startTime: "2021-12-13T03:55:30.603Z",
            endTime: "INVALID",
        };

        await request(app)
            .post(`/activities/create-completed`)
            .send(activity)
            .expect("Content-Type", /html/)
            .expect(400);
    });
});

describe("stop activity", () => {
    test("should set end time to current date", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const stoppedActivity = await request(app)
            .patch(`/activities/stop/${activity._id}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(stoppedActivity._id).toEqual(activity._id);
        expect(stoppedActivity.type).toEqual(activity.type);
        expect(stoppedActivity.startTime).toEqual(activity.startTime);
        // TODO: somehow ensure that the end time is close the current time
        expect(stoppedActivity.endTime).not.toEqual(activity.endTime);
    });

    test("should return invalid request if invalid id", async () => {
        await request(app)
            .patch(`/activities/stop/INVALID-ID`)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return not found if non-existant id", async () => {
        await request(app)
            .patch(`/activities/stop/${NON_EXISTANT_ID}`)
            .expect("Content-Type", /html/)
            .expect(404);
    });
});

describe("resume activity", () => {
    test("should return activity with correct field values", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const resumedActivity = await request(app)
            .patch(`/activities/resume/${activity._id}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(resumedActivity._id).toEqual(activity._id);
        expect(resumedActivity.type).toEqual(activity.type);

        // TODO: somehow ensure that the start time is close the current time
        expect(resumedActivity.startTime).not.toEqual(activity.startTime);

        expect(resumedActivity.endTime).toBe(null);
    });

    test("should return invalid request if invalid id", async () => {
        await request(app)
            .patch(`/activities/resume/INVALID-ID`)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return not found if non-existant id", async () => {
        await request(app)
            .patch(`/activities/resume/${NON_EXISTANT_ID}`)
            .expect("Content-Type", /html/)
            .expect(404);
    });
});

describe("trash activity", () => {
    test("should return activity with correct field values", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const stoppedActivity = await request(app)
            .patch(`/activities/trash/${activity._id}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(stoppedActivity._id).toEqual(activity._id);
        expect(stoppedActivity.type).toEqual(activity.type);
        expect(stoppedActivity.trashed).toBe(true);
    });

    test("should return invalid request if invalid id", async () => {
        await request(app)
            .patch(`/activities/trash/INVALID-ID`)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return not found if non-existant id", async () => {
        await request(app)
            .patch(`/activities/trash/${NON_EXISTANT_ID}`)
            .expect("Content-Type", /html/)
            .expect(404);
    });
});

describe("untrash activity", () => {
    test("should return activity with correct field values", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const stoppedActivity = await request(app)
            .patch(`/activities/untrash/${activity._id}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(stoppedActivity._id).toEqual(activity._id);
        expect(stoppedActivity.type).toEqual(activity.type);
        expect(stoppedActivity.trashed).toBe(false);
    });

    test("should return invalid request if invalid id", async () => {
        await request(app)
            .patch(`/activities/untrash/INVALID-ID`)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return not found if non-existant id", async () => {
        await request(app)
            .patch(`/activities/untrash/${NON_EXISTANT_ID}`)
            .expect("Content-Type", /html/)
            .expect(404);
    });
});

describe("update activity", () => {
    test("should update type", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const newType = await addTestType("UPDATED TEST TYPE");

        const updatedActivity = await request(app)
            .put(`/activities/update/${activity._id}`)
            .send({ ...activity, type: newType._id })
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(updatedActivity._id).toEqual(activity._id);
        expect(updatedActivity.type).not.toEqual(type._id);
        expect(updatedActivity.type).toEqual(newType._id);
    });

    test("should update start time", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const newStartTime = "2021-12-13T03:04:04.603Z";

        const updatedActivity = await request(app)
            .put(`/activities/update/${activity._id}`)
            .send({ ...activity, startTime: newStartTime })
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(updatedActivity._id).toEqual(activity._id);
        expect(updatedActivity.startTime).not.toEqual(activity.startTime);
        expect(updatedActivity.startTime).toEqual(newStartTime);
    });

    test("should update end time", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const newEndTime = "2021-12-13T04:30:16.847Z";

        const updatedActivity = await request(app)
            .put(`/activities/update/${activity._id}`)
            .send({ ...activity, endTime: newEndTime })
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(updatedActivity._id).toEqual(activity._id);
        expect(updatedActivity.endTime).not.toEqual(activity.endTime);
        expect(updatedActivity.endTime).toEqual(newEndTime);
    });

    test("should update comment", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const newComment = "UPDATED COMMENT";

        const updatedActivity = await request(app)
            .put(`/activities/update/${activity._id}`)
            .send({ ...activity, comment: newComment })
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(updatedActivity._id).toEqual(activity._id);
        expect(updatedActivity.comment).not.toEqual(activity.comment);
        expect(updatedActivity.comment).toEqual(newComment);
    });

    test("should update trashed", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const newTrashed = !activity.trashed;

        const updatedActivity = await request(app)
            .put(`/activities/update/${activity._id}`)
            .send({ ...activity, trashed: newTrashed })
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expect(updatedActivity._id).toEqual(activity._id);
        expect(updatedActivity.trashed).not.toEqual(activity.trashed);
        expect(updatedActivity.trashed).toEqual(newTrashed);
    });

    test("should return invalid request if invalid start time", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const newStartTime = "INVALID START TIME";

        await request(app)
            .put(`/activities/update/${activity._id}`)
            .send({ ...activity, startTime: newStartTime })
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request if invalid end time", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        const newEndTime = "INVALID START TIME";

        await request(app)
            .put(`/activities/update/${activity._id}`)
            .send({ ...activity, endTime: newEndTime })
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request if invalid id given", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        await request(app)
            .put(`/activities/update/INVALID-ID`)
            .send({ ...activity })
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return not found if non-existent id given", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        await request(app)
            .put(`/activities/update/${NON_EXISTANT_ID}`)
            .send({ ...activity })
            .expect("Content-Type", /html/)
            .expect(404);
    });
});

describe("remove activity", () => {
    test("should remove activity", async () => {
        const type = await addTestType("TEST TYPE");
        const activity = await addTestActivity(type._id);

        // Remove
        await request(app)
            .delete(`/activities/remove/${activity._id}`)
            .expect(200);

        // Expect to be removed
        await request(app)
            .get(`/activities/${type._id}`)
            .expect("Content-Type", /html/)
            .expect(404);
    });

    test("should return invalid request if invalid id given", async () => {
        await request(app)
            .delete(`/activities/remove/INVALID-ID`)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return not found if non-existent id given", async () => {
        await request(app)
            .delete(`/activities/remove/${NON_EXISTANT_ID}`)
            .expect("Content-Type", /html/)
            .expect(404);
    });
});
