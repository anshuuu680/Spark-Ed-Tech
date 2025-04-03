
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { privateChat } from "../controllers/chat.controller.js";
const router = Router();


router.route("/:_id").get(verifyJWT, privateChat);

export default router;