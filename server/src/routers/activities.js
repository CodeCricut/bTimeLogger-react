import express from "express";
import { ActivityRepository } from "../repositories/ActivityRepository.js";
import AlreadyAddedError from "../repositories/errors/AlreadyAddedError.js";
import IdNotProvidedError from "../repositories/errors/IdNotProvidedError.js";
import InvalidIdFormatError from "../repositories/errors/InvalidIdFormatError.js";
import MissingModelInfoError from "../repositories/errors/MissingModelInfoError.js";
import NotFoundError from "../repositories/errors/NotFoundError.js";
import InvalidDateError from "../repositories/errors/InvalidDateError.js";

const router = express.Router();
const activityRepo = new ActivityRepository();

router.get("/", async (req, res, next) => {
    const activities = await activityRepo.getAll().catch(next);
    res.json(activities);
});

router.get("/:id", async (req, res, next) => {
    const activity = await activityRepo.getById(req.params.id).catch(next);
    res.status(200);
    res.json(activity);
});

router.post("/start-new", async (req, res, next) => {
    const activity = await activityRepo.startNew({ ...req.body }).catch(next);
    res.status(200);
    res.json(activity);
});

router.post("/create-completed", async (req, res, next) => {
    const activity = await activityRepo
        .createCompleted({ ...req.body })
        .catch(next);
    res.status(200);
    res.json(activity);
});

router.patch("/stop/:id", async (req, res, next) => {
    const activity = await activityRepo.stop(req.params.id).catch(next);
    res.status(200);
    res.json(activity);
});

router.patch("/resume/:id", async (req, res, next) => {
    const activity = await activityRepo.resume(req.params.id).catch(next);
    res.status(200);
    res.json(activity);
});

router.patch("/trash/:id", async (req, res, next) => {
    const activity = await activityRepo.trash(req.params.id).catch(next);
    res.status(200);
    res.json(activity);
});

router.patch("/untrash/:id", async (req, res, next) => {
    const activity = await activityRepo.untrash(req.params.id).catch(next);
    res.status(200);
    res.json(activity);
});

router.put("/update/:id", async (req, res, next) => {
    const activity = await activityRepo
        .update(req.params.id, {
            ...req.body,
        })
        .catch(next);
    res.status(200);
    res.json(activity);
});

router.delete("/remove/:id", async (req, res, next) => {
    const activity = await activityRepo.remove(req.params.id).catch(next);
    res.status(200);
    res.json(activity);
});

router.use((e, req, res, next) => {
    if (
        e instanceof AlreadyAddedError ||
        e instanceof IdNotProvidedError ||
        e instanceof InvalidDateError ||
        e instanceof InvalidIdFormatError ||
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
        res.send(
            "There was an internal server error while handling the request."
        );
    }
});

export default router;
