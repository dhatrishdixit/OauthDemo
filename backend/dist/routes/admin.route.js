import { Router } from "express";
import { validateAdmin } from "../middlewares/admin.middleware.js";
import { adminLogin, allUserInfo } from "../controllers/admin.controller.js";
const router = Router();
// unsecured Path 
router.route("/login").post(adminLogin);
//secured Path 
router.route("/userInfo").get(validateAdmin, allUserInfo);
export default router;
//# sourceMappingURL=admin.route.js.map