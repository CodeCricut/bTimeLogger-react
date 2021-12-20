import express from "express";
import AlreadyAddedError from "../repositories/errors/AlreadyAddedError.js";
import IdNotProvidedError from "../repositories/errors/IdNotProvidedError.js";
import InvalidIdFormatError from "../repositories/errors/InvalidIdFormatError.js";
import MissingModelInfoError from "../repositories/errors/MissingModelInfoError.js";
import NotFoundError from "../repositories/errors/NotFoundError.js";
import InvalidDateError from "../repositories/errors/InvalidDateError.js";

import { TypeRepository } from "../repositories/TypeRepository.js";

const router = express.Router();
const typeRepo = new TypeRepository();

router.get("/", async (req, res, next) => {
    let types;
    if (req.query.name) {
        types = await typeRepo.getByName(req.query.name).catch(next);
    } else {
        types = await typeRepo.getAll().catch(next);
    }

    res.json(types);
});

router.get("/:id", async (req, res, next) => {
    const type = await typeRepo.getById(req.params.id).catch(next);

    res.status(200);
    res.json(type);
});

router.post("/add", async (req, res, next) => {
    const type = await typeRepo.add(req.body.name).catch(next);

    res.status(200);
    res.json(type);
});

router.delete("/remove/:id", async (req, res, next) => {
    await typeRepo.delete(req.params.id).catch(next);

    res.status(200);
    res.send();
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
