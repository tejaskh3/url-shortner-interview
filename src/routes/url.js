import express from "express";
import { createShortUrl, getShortUrl } from "../controllers/url.js";

const router = express.Router();

router.post("/short", createShortUrl);
router.get("/:shortUrl", getShortUrl);

export default router; 