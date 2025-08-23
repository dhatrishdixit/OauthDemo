import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
const prisma = new PrismaClient();
dotenv.config({
    path: "../env"
});
const app = express();
async function test() {
    try {
        const res = await prisma.user.create({
            data: {
                name: "test4",
                email: "test4"
            }
        });
        console.log("test successfull : ", res);
    }
    catch (error) {
        console.log(error);
    }
}
console.log("Google key", process.env.GOOGLE_CLIENT_ID);
test();
//# sourceMappingURL=index.js.map