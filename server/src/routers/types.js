import express from "express";
import AlreadyAddedError from "../repositories/AlreadyAddedError.js";
import IdNotProvidedError from "../repositories/IdNotProvidedError.js";
import InvalidIdFormatError from "../repositories/InvalidIdFormatError.js";
import MissingModelInfoError from "../repositories/MissingModelInfoError.js";
import NotFoundError from "../repositories/NotFoundError.js";
import { TypeRepository } from "../repositories/TypeRepository.js";

const router = express.Router();
const typeRepo = new TypeRepository();

router.get("/", async (req, res) => {
    try {
        const types = await typeRepo.getAll();
        res.json(types);
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send();
    }
});

router.get("/:id", async (req, res) => {
    try {
        const type = await typeRepo.getById(req.params.id);

        res.status(200);
        res.json(type);
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

router.post("/add", async (req, res) => {
    try {
        const type = await typeRepo.add(req.body.name);

        res.status(200);
        res.json(type);
    } catch (e) {
        if (
            e instanceof MissingModelInfoError ||
            e instanceof AlreadyAddedError
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

router.delete("/remove/:id", async (req, res) => {
    try {
        await typeRepo.delete(req.params.id);

        res.status(200);
        res.send();
    } catch (e) {
        if (
            e instanceof MissingModelInfoError ||
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
            res.status(400);
            res.send("Internal server error.");
        }
    }
});

export default router;
