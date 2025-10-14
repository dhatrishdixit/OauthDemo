import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controlles.js";


const router = Router();
 
router.route("/check").get(healthCheck);

  
export default router ;
