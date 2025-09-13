import jwt from "jsonwebtoken";
import type { Request,Response,NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import type { ApiErrorTypes } from "../utils/ApiError.js";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const verifyJWT = async (req:Request,res:Response,next:NextFunction) => {
       try {

          console.log(req.cookies?.accessToken)
          
          const cookie = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") ;

          if(!cookie) throw new ApiError(401,"accessToken not present");
          
          type payloadType = {
            id : string ,
            iat : number
          }
          const payload:payloadType = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET as string) as payloadType ;
          
          const id = payload.id;
         // console.log("_______________________id________________:",id)
          const userInfo = await db.user.findUnique({
           where : {
               id:id as string
           },
           select : {
               id : true ,
               name : true,
               email : true,
               authType : true,
               refreshToken: true
           }
       }) ;

          if(! ( userInfo && userInfo.refreshToken )) throw new ApiError(401,"invalid accessToken");

          req.user = {
            id:userInfo.id,
            name:userInfo.name,
            email:userInfo.email,
            authType:userInfo.authType
          };
          next();

       } catch (error:any) {
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