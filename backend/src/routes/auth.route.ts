import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    getUserById, 
    loginUserByCredentials, 
    logout, 
    oAuthHandler, 
    openIdPasswordAdditionAndChange, 
    refreshAccessTokenHandler, 
    registerUserByCredentials, 
    validateUserData}
     from "../controllers/auth.controller.js";

const router = Router();

//unsecured routes 
router.route("/login").post(loginUserByCredentials);
router.route("/register").post(validateUserData,registerUserByCredentials);

// think for this you will have to add a different middleware inbetween validation
router.route("/googleAuth").post(oAuthHandler);


//secured routes 
router.route("/getUserData").get(verifyJWT,getUserById);
router.route("/refreshAccessToken").get(verifyJWT,refreshAccessTokenHandler);
router.route("/addPasswordOAuth").get(verifyJWT,openIdPasswordAdditionAndChange);
router.route("/logout").get(verifyJWT,logout);
  
export default router ;

