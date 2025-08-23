import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import type { Request,Response,NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";


export const verifyJWT = async (req:Request,res:Response,next:NextFunction) => {
       try {
        
          const cookie = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") ;

          if(!cookie) throw new ApiError(401,"accessToken not present");
          
          const userID = await jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET as string);


       } catch (error) {
        
       }
}