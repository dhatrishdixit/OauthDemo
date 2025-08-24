import { PrismaClient } from "@prisma/client";

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
    sameSite : process.env.APP_ENV === "development" ? "None" : "Strict",
    expires : new Date(
        Date.now() + Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000
    ) 
}
const refreshTokenCookieOption = {
    httpOnly : true,
    secure : process.env.APP_ENV !== "development" ,
    sameSite : process.env.APP_ENV === "development" ? "None" : "Strict",
    expires : new Date(
        Date.now() + Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000
    ) 
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


const registerUserByCredentials = async () => {}

const loginUserByCredentials = async () => {}

const logout = async () => {}







export {
    getUserById
}