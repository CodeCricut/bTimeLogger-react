import { dbConnect, dbDisconnect, resetDb } from "../dbHandler.utils.js";
import request from "supertest";

import dotenv from "dotenv";
import express from "express";
import typesRouter from "../../src/routers/types.js";
import activitiesRouter from "../../src/routers/activities.js";
import cors from "cors";

dotenv.config();

let app;
let server;

beforeAll(async () => {
    app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/types", typesRouter);
    app.use("/activities", activitiesRouter);
    server = app.listen(process.env.TEST_SERVER_PORT);
    dbConnect(); // awaiting will let afterEach run; must run to completion
});

afterAll(async () => {
    dbDisconnect();
    server.close();
});

afterEach(async () => resetDb());

describe("get all activities", () => {
    test("should return OK", (done) => {
        request(app)
            .get("/types")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});