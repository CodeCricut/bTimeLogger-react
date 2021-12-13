import express from "express";
import ActivityType from "../model/ActivityType.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const types = await ActivityType.find({});
        res.json(types);
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send();
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("ID not provided.");
        const type = await ActivityType.findById(id);
        if (!type) throw new Error("Invalid ID.");

        res.status(200);
        res.json(type);
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send(e.toString());
    }
});

router.post("/add", async (req, res) => {
    try {
        const type = new ActivityType(req.body);

        if ((await ActivityType.count({ name: type.name })) > 0) {
            throw new Error(`Already added type with name ${type.name}`);
        }

        await type.save();
        res.status(200);
        res.json(type);
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
        await ActivityType.findByIdAndDelete(id);
        res.status(200);
        res.send();
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send(e.toString());
    }
});

export default router;
