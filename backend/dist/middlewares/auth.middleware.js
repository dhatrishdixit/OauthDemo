import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export const verifyJWT = async (req, res, next) => {
    try {
        const cookie = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!cookie)
            throw new ApiError(401, "accessToken not present");
        const payload = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        const id = payload.id;
        // console.log("_______________________id________________:",id)
        const userInfo = await db.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                authType: true,
                refreshToken: true
            }
        });
        if (!(userInfo && userInfo.refreshToken))
            throw new ApiError(401, "invalid accessToken");
        req.user = userInfo;
        next();
    }
    catch (error) {
        //console.log("err",error)
        const err = error;
        return res
            .status(err.status)
            .json({
            message: err.message
        });
        //  return res
        //       .json({
        //       message:error
        //    })
    }
};
//# sourceMappingURL=auth.middleware.js.map