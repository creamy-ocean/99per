import express from "express";
import "express-async-errors";
import * as profileController from "../controller/profile.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /profile
// GET /profiles?username=:username
router.get("/", isAuth, profileController.getProfiles);

// GET /profiles/:id
router.get("/:id", isAuth, profileController.getProfile);

// POST /tweeets
router.post("/", isAuth, profileController.createProfile);

// PUT /profiles/:id
router.put("/:id", isAuth, profileController.updateProfile);

// DELETE /profiles/:id
router.delete("/:id", isAuth, profileController.deleteProfile);

export default router;
