import express from "express";
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
        console.error(e);
        res.status(500);
        res.send(e.toString());
    }
});

router.post("/add", async (req, res) => {
    try {
        const type = await typeRepo.add(req.body.name);

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
        await typeRepo.delete(req.params.id);

        res.status(200);
        res.send();
    } catch (e) {
        console.error(e);
        res.status(400);
        res.send(e.toString());
    }
});

export default router;
