import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUserById, loginUserByCredentials, logout, oAuthHandler, openIdPasswordAdditionAndChange, refreshAccessTokenHandler, registerUserByCredentials, validateUserData } from "../controllers/auth.controller.js";
const router = Router();
//unsecured routes 
router.route("/login").post(loginUserByCredentials);
router.route("/register").post(validateUserData, registerUserByCredentials);
// think for this you will have to add a different middleware inbetween validation
router.route("/googleOAuth").post(oAuthHandler);
//secured routes 
router.route("/getUserData").get(verifyJWT, getUserById);
router.route("/refreshAccessToken").post(verifyJWT, refreshAccessTokenHandler);
router.route("/addPasswordOAuth").post(verifyJWT, openIdPasswordAdditionAndChange);
router.route("/logout").post(verifyJWT, logout);
export default router;
//# sourceMappingURL=auth.route.js.map