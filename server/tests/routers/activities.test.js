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

describe("get all activities", () => {});
describe("get activity by id", () => {});
describe("start new activity", () => {});
describe("create completed activity", () => {});
describe("stop activity", () => {});
describe("resume activity", () => {});
describe("trash activity", () => {});
describe("untrash activity", () => {});
describe("update activity", () => {});
describe("remove activity", () => {});
