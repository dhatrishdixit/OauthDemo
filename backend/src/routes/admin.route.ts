import { Router } from "express";

import { validateAdmin } from "../middlewares/admin.middleware.js";
import { adminLogin,allUserInfo, deleteuUserById, logoutUserById, verifyAdmin } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// unsecured Path 

router.route("/login").post(adminLogin);

//secured Path 

router.route("/userInfo").get(verifyJWT,validateAdmin,allUserInfo);
router.route("/verifyAdmin").get(verifyJWT,validateAdmin,verifyAdmin);
router.route("/deleteUser").delete(verifyJWT,validateAdmin,deleteuUserById);
router.route("/logoutUser").put(verifyJWT,validateAdmin,logoutUserById)


export default router ;