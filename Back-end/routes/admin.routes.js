import { Router } from "express";
import { getAdminData,adminAuth, logoutAdmin } from "../controllers/admin.controller.js";
import { verifyAdminJWT, verifyJWT } from "../middlewares/auth.middleware.js";




const router = Router();

router.route('/admin-data').get(verifyJWT,verifyAdminJWT,getAdminData);
router.route('/admin-auth').get(verifyJWT,verifyAdminJWT,adminAuth)
router.route('/logout').get(verifyJWT,verifyAdminJWT,logoutAdmin)

export default router;