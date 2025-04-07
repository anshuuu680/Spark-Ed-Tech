import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  otpCheck,
  forgotOtp,
  updateUser,
  allUsers,
  userDetails,
  savedPosts,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// Secured routes

router.route("/user-data").get(verifyJWT, getCurrentUser);
router
  .route("/update-user")
  .post(upload.single("avatar"), verifyJWT, updateUser);
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/send-otp").post(forgotOtp);
router.route("/verify-otp").post(otpCheck);
router.route("/reset-password").post(resetPassword);


router.route("/all-users").get(verifyJWT,allUsers);
router.route("/saved").post(verifyJWT,savedPosts);
router.route("/user/:username").get(verifyJWT,userDetails);
router.route("/get-value").get(userDetails);



export default router;
