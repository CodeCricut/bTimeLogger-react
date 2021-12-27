import dotenv from "dotenv";
import express from "express";
import typesRouter from "./routers/types.js";
import activitiesRouter from "./routers/activities.js";
import docsRouter from "./routers/docs.js";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";

dotenv.config();
const __dirname = path.resolve();

// path.join(__dirname, "build")
const clientBuildPath = path.join(__dirname, "frontend/build");
console.log(clientBuildPath);

const connectToDatabase = async () => {
    // MONGODB_URI will be defined in Heroku
    const dbConnectionString =
        process.env.MONGODB_URI || "mongodb://localhost/b_time_logger";
    await mongoose.connect(dbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const setupStaticReactAssets = (app) => {
    app.use(express.static(clientBuildPath));
};

const setUpServerApp = (port) => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    setupStaticReactAssets(app);
    return app;
};

const setAppRoutes = (app) => {
    app.use("/types", typesRouter);
    app.use("/activities", activitiesRouter);
    app.use("/docs", docsRouter);

    // Setup React routing
    app.get("/*", (req, res) => {
        res.sendFile(path.join(clientBuildPath, "index.html"));
    });
};

try {
    await connectToDatabase();

    const port = process.env.PORT || process.env.TEST_SERVER_PORT;
    const app = setUpServerApp(port);
    setAppRoutes(app);

    app.listen(port, () =>
        console.log(`Listening on http://localhost:${port}`)
    );
} catch (e) {
    console.error("Connection error:" + e);
    process.exit(1);
}
