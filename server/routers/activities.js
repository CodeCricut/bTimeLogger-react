import express from "express";
import Activity from "../model/Activity.js";

const router = express.Router();
// TODO: remove duplication/cleanpu

router.get("/", async (req, res) => {
    try {
        const activities = await Activity.find({});
        res.json(activities);
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send();
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("No ID provided.");

        let activity = await Activity.findById(id);
        if (!activity) throw new Error("Invalid ID.");

        res.status(200);
        res.json(activity);
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send(e.toString());
    }
});

router.post("/start-new", async (req, res) => {
    try {
        const toStart = {
            ...req.body,
            startTime: new Date(),
            endTime: null,
            trashed: false,
        };
        let activity = new Activity(toStart);

        await activity.save();
        res.status(200);
        res.json(activity);
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send(e.toString());
    }
});

router.post("/create-completed", async (req, res) => {
    try {
        const toCreate = {
            ...req.body,
            trashed: false,
        };
        // TODO Issue #7: manually create Date objects for startTime and endTime
        // TODO Issue #8: accoridng to api-routes documentation, startTime should be required
        if (!toCreate.endTime)
            throw new Error(
                "Tried to create completed activity without endTime."
            );

        let activity = new Activity(toCreate);

        await activity.save();
        res.status(200);
        res.json(activity);
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send(e.toString());
    }
});

router.patch("/stop/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("No ID provided.");

        let activity = await Activity.findById(id);
        if (!activity) throw new Error("Invalid ID.");

        const endTime = new Date();
        if (activity.startTime > endTime) activity.startTime = endTime;
        activity.endTime = endTime;

        await activity.save();
        res.status(200);
        res.json(activity);
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send(e.toString());
    }
});

router.patch("/resume/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("No ID provided.");

        let activity = await Activity.findById(id);
        if (!activity) throw new Error("Invalid ID.");

        if (!activity.startTime) activity.startTime = new Date();
        activity.endTime = null;

        await activity.save();
        res.status(200);
        res.json(activity);
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send(e.toString());
    }
});

router.patch("/trash/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("No ID provided.");

        let activity = await Activity.findById(id);
        if (!activity) throw new Error("Invalid ID.");

        activity.trashed = true;

        await activity.save();
        res.status(200);
        res.json(activity);
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send(e.toString());
    }
});

router.patch("/untrash/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("No ID provided.");

        let activity = await Activity.findById(id);
        if (!activity) throw new Error("Invalid ID.");

        activity.trashed = false;

        await activity.save();
        res.status(200);
        res.json(activity);
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send(e.toString());
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("No ID provided.");

        let activity = await Activity.findById(id);
        if (!activity) throw new Error("Invalid ID.");

        const { type, startTime, endTime, comment, isTrashed } = req.body;

        if (type) activity.type = type;
        if (startTime) activity.startTime = startTime;
        if (endTime) activity.endTime = endTime;
        if (comment) activity.comment = comment;
        if (isTrashed) activity.isTrashed = isTrashed;

        await activity.save();
        res.status(200);
        res.json(activity);
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send(e.toString());
    }
});

router.delete("/remove/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("No ID provided.");

        await Activity.findOneAndDelete(id);
        res.status(200);
        res.send();
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send(e.toString());
    }
});

export default router;
