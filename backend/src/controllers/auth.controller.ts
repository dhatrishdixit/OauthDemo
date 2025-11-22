import { PrismaClient } from "@prisma/client";
import type { NextFunction, Request , Response } from "express";
import bcrypt from "bcrypt";
import { ApiError, type ApiErrorTypes } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { userSchema } from "../types/zod.js";
import type { userInfoType } from "../types/general.js";

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
    sameSite : process.env.APP_ENV === "development" ? "lax" : "none" as
    | boolean
    | "none"
    | "lax"
    | "strict",
    // expires : new Date(
    //     Date.now() + Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000
    // ) 
    maxAge: 1 * 24 * 60 * 60 * 1000
}

const refreshTokenCookieOption = {
    httpOnly : true,
    secure : process.env.APP_ENV !== "development" ,
    sameSite : process.env.APP_ENV === "development" ? "lax" : "none" as
    | boolean
    | "none"
    | "lax"
    | "strict",
    // expires : new Date(
    //     Date.now() + Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000
    // ) 
    maxAge: 10  * 24 * 60 * 60 * 1000
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


const getCurrentUser = async (req:Request,res:Response) => {
       return res
       .status(201)
       .json({
          data:req.user,
          status:"success"
       })

}


const getUserById = async (req:Request,res:Response) => {
         
       return res
       .status(201)
       .json({
          message:"user found",
          data : req.user
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

        
        // console.log("__________accessToken____________",accessToken);
        // console.log("____________refreshToken____________",refreshToken);
        

        const loggedInUser = await db.user.update({
            where : {
                id : user.id
            },
            data:{
                refreshToken
            },
            select:{
                id:true,
                name:true,
                authType:true,
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

const logout = async (req:Request,res:Response) => {
    try {
        
        const id = req.user?.id as string;
        await db.user.update({
            where : { id },
            data : {
                refreshToken:null
            }
        });

        return res
        .status(201)
        .clearCookie('accessToken',accessTokenCookieOption)
        .clearCookie('refreshToken',refreshTokenCookieOption)
        .json(
            {
                message : "user logged out"
            }
        )

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

const oAuthHandler = async (req:Request,res:Response) => {
    
    const { authorizationCode } = req.body;

    try {
    
    if(!authorizationCode) throw new ApiError(401,"authorization code absent") ;
    const googleAuthorizationServer = "https://oauth2.googleapis.com/token";
    const httpMethod = "POST";
         
      const tokenRes = await fetch(googleAuthorizationServer,{
        method:httpMethod,
        headers:{"Content-Type": "application/x-www-form-urlencoded"},
        body:new URLSearchParams({
            code:authorizationCode,
            client_id:process.env.GOOGLE_CLIENT_ID!,
            client_secret:process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri:`${process.env.ORIGIN}/auth/google/callback`,
            grant_type: "authorization_code",
        })
      })

      const token = await tokenRes.json();

      const googleAccessToken = token.access_token;

      // fetch user info 

      const userProfile = await fetch("https://www.googleapis.com/oauth2/v2/userinfo",{
         headers:{
            Authorization:`Bearer ${googleAccessToken}`
         }
      })

      const userInfo:userInfoType = await userProfile.json();

      const user = await db.user.upsert({
           where:{
              email:userInfo.email,
           },
           update:{
              googleId:userInfo.id,
              authType: userInfo.authType === "PasswordLogin" ? "Both" : "GoogleLogin" ,
           },
           create:{
              name:userInfo.name,
              email:userInfo.email,
              authType:"GoogleLogin",
              googleId:userInfo.id,
           }
      });


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

const openIdPasswordAdditionAndChange = async (req:Request,res:Response) => {
     try {
        
        // switch to email - password or just change password 

        const { newPassword , changeMode , id } = req.body ;

        if(!newPassword) throw new ApiError(400,"password cannot be empty");

        const passwordHash = await bcrypt.hash(newPassword,10);

        let userData ;
        if(!changeMode){
             userData = await db.user.update({
                where:{id},
                data:{
                    passwordHash,
                    googleId:null,
                    authType:"PasswordLogin"
                }
             })
        }else{
            userData = await db.user.update({
                where:{id},
                data:{
                    passwordHash,
                    authType:"Both"
                }
            })
        }

        return res.status(200).json({
            message:"password change",
            data: userData

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

const refreshAccessTokenHandler = async (req:Request,res:Response) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken
        
        //console.log("________cookie_______",req.cookies)

        if(!incomingRefreshToken) throw new ApiError(401,"refresh token is absent");

        //console.log("incomingRefreshToken______________",incomingRefreshToken)
        
        type payloadType = {
             id : string ,
            iat : number
        }

        const payload = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET as string) as payloadType;


        const user = await db.user.findUnique({
            where:{
                id: payload.id
            },
        })
        
        if(!user) throw new ApiError(401,"user not found")

        if(user?.refreshToken != incomingRefreshToken) throw new ApiError(401,"refreshToken doesnt match");
        
        // console.log(user);
        // console.log('_______________id______________',user.id)
        const accessToken = generateAccessToken(user.id);
        const newRefreshToken = generateRefreshToken(user.id);

        await db.user.update({
            where : {
                id : user.id
            },
            data:{
                refreshToken:newRefreshToken
            }
        });

        return res
        .status(201)
        .cookie("accessToken",accessToken,accessTokenCookieOption)
        .cookie("refreshToken",newRefreshToken,refreshTokenCookieOption)
        .json({
            message: "access token is refreshed successfully"
        })

    } catch (error:any) {
        const err : ApiErrorTypes = error as ApiErrorTypes ;
       // console.log(error);
        const statusCode = typeof err.status === "number" ? err.status : 501
        return res
        .status(statusCode)
        .json({
                  message:err.message,
                  status:"fail"
              }) 

        // return res
        //.status(err.status)
        // json({
        //     message:error
        // }).


    }
}


// this is a good way to use zod 
// can also a global error handler 
const validateUserData = (req:Request,res:Response,next:NextFunction) => {
      try {
             const recievedData = req.body ;
             const data = {
                name :recievedData.name,
                email :recievedData.email , 
                password:recievedData.password,
                authType:recievedData.type
             }
             userSchema.parse(data);

             next();

      } catch (error) {
            console.log(error)
            return res
            .status(401)
            .json({
                message:"Error in the recieved data"
            })
      }
}

export {
    getUserById ,
    registerUserByCredentials , 
    refreshAccessTokenHandler , 
    oAuthHandler , 
    logout , 
    loginUserByCredentials , 
    openIdPasswordAdditionAndChange ,
    validateUserData ,
    getCurrentUser
}
