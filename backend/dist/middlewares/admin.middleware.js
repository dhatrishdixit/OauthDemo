import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
export const validateAdmin = (req, res, next) => {
    try {
        const cookie = req.cookies.adminToken || req.header("Admin_Authorization")?.replace("Bearer ", "");
        if (!cookie)
            throw new ApiError(401, "admin token is absent");
        const payload = jwt.verify(cookie, process.env.ADMIN_TOKEN_SECRET);
        const adminKey = payload.key;
        if (!bcrypt.compareSync(process.env.ADMIN_SECRET_KEY, adminKey))
            throw new ApiError(401, "wrong admin token");
        next();
    }
    catch (error) {
        const err = error;
        const statusCode = typeof err.status === "number" ? err.status : 501;
        return res
            .status(statusCode)
            .json({
            message: err.message
        });
    }
};
//# sourceMappingURL=admin.middleware.js.map