import { Router } from "express";
import {
  createPost,
  createQuestion,
  getPosts,
  handleLike,
  checkLike,
  getPostData,
  addComment,
  commentLikes,
  getUserPosts,
  getUserQuestions,
} from "../controllers/feed.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/create-post").post(upload.single("image"), verifyJWT, createPost);

router.route("/create-question").post(verifyJWT, createQuestion);

router.route("/get-posts").get(verifyJWT, getPosts);

router.route("/like").post(verifyJWT,handleLike);

router.route("/check-like").post(verifyJWT,checkLike);

router.route("/post-data").get(verifyJWT,getPostData);

router.route("/add-comment").post(verifyJWT,addComment);

router.route("/comment-likes").post(verifyJWT,commentLikes);

router.route("/get-posts/:username").get(verifyJWT,getUserPosts);

router.route("/get-questions/:username").get(verifyJWT,getUserQuestions);



export default router;
