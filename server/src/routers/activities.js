import express from "express";
import { ActivityRepository } from "../repositories/ActivityRepository.js";
import IdNotProvidedError from "../repositories/errors/IdNotProvidedError.js";
import InvalidDateError from "../repositories/errors/InvalidDateError.js";
import InvalidIdFormatError from "../repositories/errors/InvalidIdFormatError.js";
import MissingModelInfoError from "../repositories/errors/MissingModelInfoError.js";
import NotFoundError from "../repositories/errors/NotFoundError.js";

const router = express.Router();
const activityRepo = new ActivityRepository();

router.get("/", async (req, res) => {
    try {
        const activities = await activityRepo.getAll();
        res.json(activities);
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send("Internal server error.");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const activity = await activityRepo.getById(req.params.id);
        res.status(200);
        res.json(activity);
    } catch (e) {
        if (
            e instanceof IdNotProvidedError ||
            e instanceof InvalidIdFormatError
        ) {
            // Invalid req
            res.status(400);
            res.send(e.message);
        } else if (e instanceof NotFoundError) {
            // Not found
            res.status(404);
            res.send(e.message);
        } else {
            // Server error
            console.error(e);
            res.status(500);
            res.send("Internal server error.");
        }
    }
});

router.post("/start-new", async (req, res) => {
    try {
        const activity = await activityRepo.startNew({ ...req.body });
        res.status(200);
        res.json(activity);
    } catch (e) {
        if (e instanceof MissingModelInfoError) {
            // Invalid req
            res.status(400);
            res.send(e.message);
        } else {
            // Server error
            console.error(e);
            res.status(500);
            res.send("Internal server error.");
        }
    }
});

router.post("/create-completed", async (req, res) => {
    try {
        const activity = await activityRepo.createCompleted({ ...req.body });
        res.status(200);
        res.json(activity);
    } catch (e) {
        if (
            e instanceof MissingModelInfoError ||
            e instanceof InvalidDateError
        ) {
            // Invalid req
            res.status(400);
            res.send(e.message);
        } else {
            // Server error
            console.error(e);
            res.status(500);
            res.send("Internal server error.");
        }
    }
});

router.patch("/stop/:id", async (req, res) => {
    try {
        const activity = await activityRepo.stop(req.params.id);
        res.status(200);
        res.json(activity);
    } catch (e) {
        if (
            e instanceof IdNotProvidedError ||
            e instanceof InvalidIdFormatError
        ) {
            // Invalid req
            res.status(400);
            res.send(e.message);
        } else if (e instanceof NotFoundError) {
            // Not found
            res.status(404);
            res.send(e.message);
        } else {
            // Server error
            console.error(e);
            res.status(500);
            res.send("Internal server error.");
        }
    }
});

router.patch("/resume/:id", async (req, res) => {
    try {
        const activity = await activityRepo.resume(req.params.id);
        res.status(200);
        res.json(activity);
    } catch (e) {
        if (
            e instanceof IdNotProvidedError ||
            e instanceof InvalidIdFormatError
        ) {
            // Invalid req
            res.status(400);
            res.send(e.message);
        } else if (e instanceof NotFoundError) {
            // Not found
            res.status(404);
            res.send(e.message);
        } else {
            // Server error
            console.error(e);
            res.status(500);
            res.send("Internal server error.");
        }
    }
});

router.patch("/trash/:id", async (req, res) => {
    try {
        const activity = await activityRepo.trash(req.params.id);
        res.status(200);
        res.json(activity);
    } catch (e) {
        if (
            e instanceof IdNotProvidedError ||
            e instanceof InvalidIdFormatError
        ) {
            // Invalid req
            res.status(400);
            res.send(e.message);
        } else if (e instanceof NotFoundError) {
            // Not found
            res.status(404);
            res.send(e.message);
        } else {
            // Server error
            console.error(e);
            res.status(500);
            res.send("Internal server error.");
        }
    }
});

router.patch("/untrash/:id", async (req, res) => {
    try {
        const activity = await activityRepo.untrash(req.params.id);
        res.status(200);
        res.json(activity);
    } catch (e) {
        if (
            e instanceof IdNotProvidedError ||
            e instanceof InvalidIdFormatError
        ) {
            // Invalid req
            res.status(400);
            res.send(e.message);
        } else if (e instanceof NotFoundError) {
            // Not found
            res.status(404);
            res.send(e.message);
        } else {
            // Server error
            console.error(e);
            res.status(500);
            res.send("Internal server error.");
        }
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const activity = await activityRepo.update(req.params.id, {
            ...req.body,
        });
        res.status(200);
        res.json(activity);
    } catch (e) {
        if (
            e instanceof IdNotProvidedError ||
            e instanceof InvalidIdFormatError ||
            e instanceof InvalidDateError ||
            e instanceof MissingModelInfoError
        ) {
            // Invalid req
            res.status(400);
            res.send(e.message);
        } else if (e instanceof NotFoundError) {
            // Not found
            res.status(404);
            res.send(e.message);
        } else {
            // Server error
            console.error(e);
            res.status(500);
            res.send("Internal server error.");
        }
    }
});

router.delete("/remove/:id", async (req, res) => {
    try {
        const activity = await activityRepo.remove(req.params.id);
        res.status(200);
        res.json(activity);
    } catch (e) {
        if (
            e instanceof IdNotProvidedError ||
            e instanceof InvalidIdFormatError
        ) {
            // Invalid req
            res.status(400);
            res.send(e.message);
        } else if (e instanceof NotFoundError) {
            // Not found
            res.status(404);
            res.send(e.message);
        } else {
            // Server error
            console.error(e);
            res.status(500);
            res.send("Internal server error.");
        }
    }
});

export default router;
