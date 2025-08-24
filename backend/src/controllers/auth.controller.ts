import { PrismaClient } from "@prisma/client";
import type { Request , Response } from "express";
import bcrypt from "bcrypt";
import { ApiError, type ApiErrorTypes } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const db = new PrismaClient();

// getUserById
// loginUser 
// registerUser 
// logoutUser 
// addPasswordInCaseOfGoogle + add button to completely switch completely to 
// Google Create Account 
// refresh access token

const accessTokenCookieOption = {
    httpOnly : true,
    secure : process.env.APP_ENV !== "development" ,
    sameSite : process.env.APP_ENV === "development" ? "none" : "strict" as
    | boolean
    | "none"
    | "lax"
    | "strict",
    expires : new Date(
        Date.now() + Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000
    ) 
}
const refreshTokenCookieOption = {
    httpOnly : true,
    secure : process.env.APP_ENV !== "development" ,
    sameSite : process.env.APP_ENV === "development" ? "none" : "strict" as
    | boolean
    | "none"
    | "lax"
    | "strict",
    expires : new Date(
        Date.now() + Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000
    ) 
}


function generateRefreshToken(id:string){

        return jwt.sign({
            id
        },process.env.REFRESH_TOKEN_SECRET as string)


}


function generateAccessToken(id:string){
      
        return jwt.sign({
            id
        },process.env.ACCESS_TOKEN_SECRET as string)
      
}




const getUserById = async (id:string) => {
       return await db.user.findUnique({
           where : {
               id 
           },
           select : {
               id : true ,
               name : true,
               email : true,
               authType : true
           }
       }) 

}


const registerUserByCredentials = async (req:Request,res:Response) => {
    const { name,email,password } = req.body ;
    try {
        if(!(name && email && password)) throw new ApiError(411,"either of name , email & password is missing") 

        const existingUser = await db.user.findUnique({
            where:{
                email,
            }
        })

        if(existingUser) throw new ApiError(411,"User already exists")
        
        const hashedPassword = await bcrypt.hash(password,10);

        
        const createdUser = await db.user.create({
            data:{
               name,
               email,
               passwordHash:hashedPassword,
               authType:"PasswordLogin"
            }
        });

        return res.status(201).json({
            message:"createdSuccessfully",
            data:createdUser
        })

    } catch (error) {
        const err : ApiErrorTypes = error as ApiErrorTypes ;
        return res
        .status(err.status)
        .json({
            message:err.message
        })
    }

    // after register redirect to login 
}

const loginUserByCredentials = async (req:Request,res:Response) => {
    try {
        const {email , password} = req.body
        if(!(email && password)) throw new ApiError(411,"Either email or password is missing")

        const user = await db.user.findUnique({
            where : {
                email
            }
        });

        if(!user?.passwordHash) throw new ApiError(411,"Either account not present or logged in through google")

        const passwordCheck = await bcrypt.compare(password,user.passwordHash);
        
        if(!passwordCheck) throw new ApiError(406,"password is not correct");

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        const loggedInUser = await db.user.update({
            where : {
                id : user.id
            },
            data:{
                refreshToken
            }
        });



        return res
        .status(201)
        .cookie("accessToken",accessToken,accessTokenCookieOption)
        .cookie("refreshToken",refreshToken,refreshTokenCookieOption)
        .json({
            message:"user logged in",
            data: loggedInUser
        })

    } catch (error) {
        const err : ApiErrorTypes = error as ApiErrorTypes ;
        return res
        .status(err.status)
        .json({
            message:err.message
        })
    }

}

const logout = async () => {}

const oAuthHandler = async () => {}

const openIdPasswordAdditionAndChange = async () => {}

const refreshAccessTokenHandler = async () => {}

export {
    getUserById
}