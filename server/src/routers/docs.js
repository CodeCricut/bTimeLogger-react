import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../../swagger.config.js";

const baseDirectory = path.resolve();

const router = express.Router();

router.use("/api", swaggerUi.serve);
router.get("/api", swaggerUi.setup(swaggerSpec));

// Server jsDocs website
router.use("/server", express.static(getServerDocumentationPath()));
router.get("/server", (req, res) => {
    res.sendFile(path.join(getServerDocumentationPath(), "index.html"));
});

// Frontend jsDocs website
router.use("/frontend", express.static(getFrontendDocumentationPath()));
router.get("/frontend", (req, res) => {
    res.sendFile(path.join(getFrontendDocumentationPath(), "index.html"));
});

function getServerDocumentationPath() {
    const docPath = path.join(baseDirectory, "server/documentation/jsdocs");
    if (!docPath) {
        throw new Error(
            `Could not resolve server documentation build path. Ensure that you run \"npm run generate-docs\" in the base directory.`
        );
    }
    return docPath;
}

function getFrontendDocumentationPath() {
    const docPath = path.join(baseDirectory, "frontend/documentation/jsdocs");
    if (!docPath) {
        throw new Error(
            `Could not resolve server documentation build path. Ensure that you run \"npm run generate-docs\" in the base directory.`
        );
    }
    return docPath;
}

export default router;
