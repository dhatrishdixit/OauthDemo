import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
const db = new PrismaClient();
// getUserById
// loginUser 
// registerUser 
// logoutUser 
// addPasswordInCaseOfGoogle + add button to completely switch completely to 
// Google Create Account 
// refresh access token
const accessTokenCookieOption = {
    httpOnly: true,
    secure: process.env.APP_ENV !== "development",
    sameSite: process.env.APP_ENV === "development" ? "None" : "Strict",
    expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000)
};
const refreshTokenCookieOption = {
    httpOnly: true,
    secure: process.env.APP_ENV !== "development",
    sameSite: process.env.APP_ENV === "development" ? "None" : "Strict",
    expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000)
};
const getUserById = async (id) => {
    return await db.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            authType: true
        }
    });
};
const registerUserByCredentials = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!(name && email && password))
            throw new ApiError(411, "either of name , email & password is missing");
        const existingUser = await db.user.findUnique({
            where: {
                email,
            }
        });
        const hashedPassword = await bcrypt.hash(password, 10);
        // const res = await db.user.create({
        //     data:{
        //     }
        // })
    }
    catch (error) {
    }
};
const loginUserByCredentials = async () => {
};
const logout = async () => { };
const oAuthHandler = async () => { };
const openIdPasswordAdditionAndChange = async () => { };
const refreshAccessTokenHandler = async () => { };
export { getUserById };
//# sourceMappingURL=auth.controller.js.map