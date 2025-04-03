import { Router } from "express";
import { loginInstructor, logoutInstructor, refreshAccessToken, registerInstructor,createCourse, courseData, createSection, otpCheck, instructorData, all, addLecture,addSection, deleteSection, detailsChange } from "../controllers/instructor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyInstructorJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerInstructor);

router.route("/login").post(loginInstructor)
router.route("/verify-otp").post(otpCheck);


// Secured routes
router.route("/data").get(verifyInstructorJWT,instructorData)
router.route("/all-courses").get(verifyInstructorJWT,all)
router.route("/logout").post(verifyInstructorJWT,logoutInstructor);
router.route('/refresh-token').post(refreshAccessToken)
router.route("/create").post(upload.single("thumbnail"), verifyInstructorJWT,createCourse)
router.route("/courses/:id").get(verifyInstructorJWT,courseData);
router.route("/create-section/:id").post(upload.array("videos", 10), verifyInstructorJWT,createSection);
router.route("/add-lecture").post(upload.array("lecture", 1), verifyInstructorJWT,addLecture);
router.route("/:id/add-section").post(verifyInstructorJWT,addSection);
router.route("/:id/details-change").post(verifyInstructorJWT,detailsChange);
router.route("/delete-section").post(verifyInstructorJWT,deleteSection);


export default router;
