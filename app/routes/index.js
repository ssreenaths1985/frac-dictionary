import express from "express";
import site from "./site";

const router = express.Router();

router.get(`/`, (req, res) => res.sendStatus(200));

router.use(`/api/v1/site`, site);

module.exports = router;
