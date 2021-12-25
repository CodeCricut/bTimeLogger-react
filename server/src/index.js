import dotenv from "dotenv";
import express from "express";
import typesRouter from "./routers/types.js";
import activitiesRouter from "./routers/activities.js";
import docsRouter from "./routers/docs.js";
import cors from "cors";

import mongoose from "mongoose";

dotenv.config();

const connectToDatabase = async () => {
    const dbConnectionString = "mongodb://localhost/b_time_logger";
    await mongoose.connect(dbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const setUpServerApp = (port) => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    return app;
};

const setAppRoutes = (app) => {
    app.use("/types", typesRouter);
    app.use("/activities", activitiesRouter);
    app.use("/docs", docsRouter);
};

try {
    await connectToDatabase();

    const port = process.env.SERVER_PORT;
    const app = setUpServerApp(port);
    setAppRoutes(app);

    app.listen(port, () =>
        console.log(`Listening on http://localhost:${port}`)
    );
} catch (e) {
    console.error("Connection error:" + e);
    process.exit(1);
}
