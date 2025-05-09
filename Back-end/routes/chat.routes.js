
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { privateChat, startChat } from "../controllers/chat.controller.js";
const router = Router();


router.route("/:_id").get(verifyJWT, privateChat);
router.route("/start-chat/:id").post(verifyJWT,startChat);

export default router;