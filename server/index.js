import dotenv from "dotenv";
import express from "express";
import typesRouter from "./routers/types.js";
import activitiesRouter from "./routers/activities.js";
import cors from "cors";

import mongoose from "mongoose";

dotenv.config();

const dbConnectionString = "mongodb://localhost/b_time_logger";

try {
    await mongoose.connect(dbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const app = express();
    const port = process.env.SERVER_PORT;

    app.use(cors());
    app.use(express.json());

    app.use("/types", typesRouter);
    app.use("/activities", activitiesRouter);

    app.listen(port, () =>
        console.log(`Listening on http://localhost:${port}`)
    );
} catch (e) {
    console.error.bind(console, "connection error:");
}
