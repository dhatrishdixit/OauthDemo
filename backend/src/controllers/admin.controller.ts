import {  PrismaClient } from "@prisma/client";
import type { Request,Response } from "express";
import { ApiError, type ApiErrorTypes } from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const db = new PrismaClient();

const adminCookieOptions = {
    httpOnly : true,
    secure : process.env.APP_ENV !== "development" ,
    sameSite : process.env.APP_ENV === "development" ? "lax" : "strict" as
    | boolean
    | "none"
    | "lax"
    | "strict",
    expires : new Date(
        Date.now() + Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000
    ) 
}

function generateAdminToken(encryptedKey:string){

        return jwt.sign({
            key:encryptedKey
        },process.env.ADMIN_TOKEN_SECRET as string)

}

const adminLogin = async (req:Request,res:Response) => {
    try {
        const { username , password } = req.body;

    if( username !== process.env.ADMIN_SECRET_USERNAME || password !== process.env.ADMIN_SECRET_PASSWORD) throw new ApiError(401,"incorrect admin credentials")

    if(!process.env.ADMIN_SECRET_KEY) throw new ApiError(501,"Admin secret key absent in server")
    
    const encryptedKey = await bcrypt.hash(process.env.ADMIN_SECRET_KEY,10);

    const adminToken = await generateAdminToken(encryptedKey)
    
    return res
    .status(201)
    .cookie("adminToken",adminToken,adminCookieOptions)
    .json({
        message : "admin privilages added to the account",
        success : true
    })
            

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

const allUserInfo = async (req:Request,res:Response) => {
     try {
        const userData = await db.user.findMany({
              select: {
                    id: true,
                    email: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    authType: true,
                    refreshToken: true,
                }
        });
        

        return res.status(200)
         .json({
        users : userData,
        success : true 
        })
   
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

const verifyAdmin = async (req:Request,res:Response) => {
    
       return res
       .status(201)
       .json({
          status:"success"
       })

}

const deleteuUserById = async (req:Request,res:Response) => {
    try {

        const { id } = req.body ;
        
        const user = await db.user.delete({
            where:{
                id
            }
        });

        
        return res.status(201).json({
            message:"user deleted successfully",
            user:user,
            status:"success"
        })


    } catch (error) {
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

const logoutUserById = async (req:Request,res:Response) => {
     try {
        const { id } = req.body ;

        await db.user.update({
            where : { id },
            data : {
                refreshToken:null
            }
        });

        return res.status(201).json({
            message:"user successfully logged out",
            status:"success"
        })

     } catch (error) {
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

const logoutAdmin = async (req:Request,res:Response) => {
      
      return res
      .status(201)
      .clearCookie("adminToken",adminCookieOptions)
      .json({
        message:"admin logged out successfully"
      })
    
}


export {
    adminLogin,
    allUserInfo,
    verifyAdmin,
    deleteuUserById,
    logoutUserById,
    logoutAdmin
}

 