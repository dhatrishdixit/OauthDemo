import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import { userSchema } from "./types/zod.js";
const prisma = new PrismaClient();
dotenv.config({
    path: "../env"
});
// routes required 
// create user
// sign in
// google stuff
// dashboard
// userInfo
const app = express();
async function test() {
    try {
        const res = await prisma.user.create({
            data: {
                name: "test6",
                email: "test6"
            }
        });
        console.log("test successfull : ", res);
    }
    catch (error) {
        console.log(error);
    }
}
test();
//# sourceMappingURL=index.js.map