import express from "express";
import path from "path";

const baseDirectory = path.resolve();

const router = express.Router();

router.use("/", express.static(getClientBuildPath()));
router.get("/", (req, res) => {
    res.sendFile(path.join(getClientBuildPath(), "index.html"));
});

function getClientBuildPath() {
    const clientBuildPath = path.join(baseDirectory, "frontend/build");
    if (!clientBuildPath) {
        throw new Error(
            `Could not resolve client build path.\tBase directory:${baseDirectory}`
        );
    }
    return clientBuildPath;
}

export default router;
