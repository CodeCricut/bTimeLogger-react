import { dbConnect, dbDisconnect, resetDb } from "../dbHandler.utils.js";
import request from "supertest";
import { NON_EXISTANT_ID } from "../fixtures/index.js";
import dotenv from "dotenv";
import express from "express";
import typesRouter from "../../src/routers/types.js";
import activitiesRouter from "../../src/routers/activities.js";
import cors from "cors";
import {
    expectActivityTypeArraysEqual,
    expectActivityTypesEqual,
} from "../util/expect-helpers.js";

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

describe("get all activity types", () => {
    test("should return types", async () => {
        const type = await addTestType("TEST NAME");

        const types = await request(app)
            .get("/types")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expectActivityTypeArraysEqual([type], types);
    });
});

describe("get activity type by id", () => {
    test("should return type given id", async () => {
        const type = await addTestType("TEST NAME");

        const returnedType = await request(app)
            .get(`/types/${type._id}`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expectActivityTypesEqual(type, returnedType);
    });

    test("should return invalid request given invalid id", async () => {
        await request(app)
            .get(`/types/INVALID-ID`)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return not found given non-existant id", async () => {
        await request(app)
            .get(`/types/${NON_EXISTANT_ID}`)
            .expect("Content-Type", /html/)
            .expect(404);
    });
});

describe("add activity type", () => {
    test("should return added type", async () => {
        const type = { name: "TEST TYPE NAME" };
        const addedType = await request(app)
            .post("/types/add")
            .send(type)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => response.body);

        expectActivityTypesEqual(type, addedType);
    });

    test("should return invalid request given no type", async () => {
        await request(app)
            .post(`/types/add`)
            .send({ name: null })
            .set("Accept", "application/json")
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return invalid request given duplicate type", async () => {
        const name = "TEST TYPE NAME";
        await addTestType(name);

        await request(app)
            .post(`/types/add`)
            .send({ name })
            .set("Accept", "application/json")
            .expect("Content-Type", /html/)
            .expect(400);
    });
});

describe("remove activity type", () => {
    test("should remove type", async () => {
        const type = await addTestType("TEST TYPE NAME");

        // Remove
        await request(app).delete(`/types/remove/${type._id}`).expect(200);

        // Expect to be removed
        await request(app)
            .get(`/types/${type._id}`)
            .expect("Content-Type", /html/)
            .expect(404);
    });

    test("should return invalid request given invalid id", async () => {
        await request(app)
            .delete(`/types/remove/INVALID-ID`)
            .expect("Content-Type", /html/)
            .expect(400);
    });

    test("should return not found given non-existant id", async () => {
        await request(app)
            .delete(`/types/remove/${NON_EXISTANT_ID}`)
            .expect("Content-Type", /html/)
            .expect(404);
    });
});
