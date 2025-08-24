import jwt from "jsonwebtoken";
import type { Request,Response,NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import type { ApiErrorTypes } from "../utils/ApiError.js";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const verifyJWT = async (req:Request,res:Response,next:NextFunction) => {
       try {
          
          const cookie = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") ;

          if(!cookie) throw new ApiError(401,"accessToken not present");
          
          const userID = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET as string);

          const userInfo = await db.user.findUnique({
           where : {
               id:userID as string
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

          req.user = userInfo;
          next();

       } catch (error: any) {
          const err : ApiErrorTypes = error
          return res
            .status(err.status)
            .json({
               message:err.message
            })

       }
}