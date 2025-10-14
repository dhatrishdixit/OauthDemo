import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controlles.js";


const router = Router();
 
router.route("/health").get(healthCheck);

  
export default router ;
