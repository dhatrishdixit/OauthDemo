import type { Response,Request,NextFunction } from "express";
import { ApiError, type ApiErrorTypes } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const validateAdmin = (req:Request,res:Response,next:NextFunction) => {
     try {
        
        const cookie = req.cookies.adminToken || req.header("Admin_Authorization")?.replace("Bearer ","") ;
        
        if(!cookie) throw new ApiError(401,"admin token is absent");

        type payloadType = {
            key:string,
            iat :number
        }

        const payload = jwt.verify(cookie,process.env.ADMIN_TOKEN_SECRET as string) as payloadType;

        const adminKey = payload.key;
        
        if(!bcrypt.compareSync(process.env.ADMIN_SECRET_KEY as string,adminKey)) throw new ApiError(401,"wrong admin token")

        next();

     }catch (error:any) {
        const err : ApiErrorTypes = error as ApiErrorTypes ;
        const statusCode = typeof err.status === "number" ? err.status : 501 ; 
              return res
              .status(statusCode)
              .json({
                  message:err.message,
                  status:"fail"
              })  
    }
}