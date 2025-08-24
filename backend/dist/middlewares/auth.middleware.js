import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { getUserById } from "../controllers/auth.controller.js";
export const verifyJWT = async (req, res, next) => {
    try {
        const cookie = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!cookie)
            throw new ApiError(401, "accessToken not present");
        const userID = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
        const userInfo = await getUserById(String(userID));
        if (!userInfo)
            throw new ApiError(401, "invalid accessToken");
        req.user = userInfo;
        next();
    }
    catch (error) {
        const err = error;
        res
            .status(err.status)
            .json({
            message: err.message
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map