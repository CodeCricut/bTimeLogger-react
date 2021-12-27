import dotenv from "dotenv";
import express from "express";
import typesRouter from "./routers/types.js";
import activitiesRouter from "./routers/activities.js";
import docsRouter from "./routers/docs.js";
import frontendRouter from "./routers/frontend.js";

import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

try {
    await connectToDatabase();
    const port = getPort();

    const app = express();
    setupAppMiddleware(app);
    setupAppRoutes(app);

    app.listen(port, () =>
        console.log(`Listening on http://localhost:${port}`)
    );
} catch (e) {
    console.error("Connection error:" + e);
    process.exit(1);
}

function setupAppMiddleware(app) {
    app.use(cors());
    app.use(express.json());
    return app;
}

async function connectToDatabase() {
    await mongoose.connect(getMongoConnection(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

function setupAppRoutes(app) {
    app.use("/", frontendRouter);
    app.use("/types", typesRouter);
    app.use("/activities", activitiesRouter);
    app.use("/docs", docsRouter);
}

function getPort() {
    const port = process.env.PORT || process.env.TEST_SERVER_PORT;
    if (!port) {
        throw new Error(
            "Tried to start app without port defined. Please define a PORT or TEST_SERVER_PORT environment variable in the .env file."
        );
    }
    return port;
}

function getMongoConnection() {
    const connection = process.env.MONGODB_URI;
    if (!connection) {
        throw new Error(
            "Tried to start app without Mongo DB connection string defined. Please define a MONGODB_URI environment variable in the .env file."
        );
    }
    return connection;
}
