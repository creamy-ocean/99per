import express from "express";
import * as gameController from "../controller/game.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isAuth, gameController.getGames);

export default router;
