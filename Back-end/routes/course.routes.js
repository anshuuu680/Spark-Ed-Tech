import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {courseDetail, getAllCourses, myCourses} from '../controllers/course.controller.js'



const router = Router();

router.route("/all-courses").get(verifyJWT,getAllCourses);
router.route("/my-courses").get(verifyJWT,myCourses);
router.route("/:id").get(verifyJWT,courseDetail);





export default router;