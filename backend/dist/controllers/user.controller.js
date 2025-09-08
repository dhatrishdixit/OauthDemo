import { PrismaClient } from "@prisma/client";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const db = new PrismaClient();
const adminCookieOptions = {
    httpOnly: true,
    secure: process.env.APP_ENV !== "development",
    sameSite: process.env.APP_ENV === "development" ? "none" : "strict",
    expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRY) * 24 * 60 * 60 * 1000)
};
function generateAdminToken(encryptedKey) {
    return jwt.sign({
        key: encryptedKey
    }, process.env.ADMIN_TOKEN_SECRET);
}
const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username !== process.env.ADMIN_SECRET_USERNAME && password !== process.env.ADMIN_SECRET_PASSWORD)
            throw new ApiError(401, "incorrect admin credentials");
        if (!process.env.ADMIN_SECRET_KEY)
            throw new ApiError(501, "Admin secret key absent in server");
        const encryptedKey = await bcrypt.hash(process.env.ADMIN_SECRET_KEY, 10);
        const adminToken = await generateAdminToken(encryptedKey);
        return res
            .status(201)
            .cookie("adminToken", adminToken, adminCookieOptions)
            .json({
            message: "admin privilages added to the account",
            success: true
        });
    }
    catch (error) {
        const err = error;
        return res
            .status(err.status)
            .json({
            message: err.message
        });
    }
};
const allUserInfo = async (req, res) => {
    try {
        const userData = await db.user.findMany();
        return res.status(201)
            .json({
            users: userData,
            success: true
        });
    }
    catch (error) {
        console.log(error);
        const err = error;
        return res
            .status(err.status)
            .json({
            message: error
        });
    }
};
export { adminLogin, allUserInfo };
//# sourceMappingURL=user.controller.js.map