
import dotenv from "dotenv";
import path from "path"

import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"
import adminRouter from "./routes/admin.route.js"
import healthCheckRouter from "./routes/healthcheck.routes.js"
import { rateLimit } from 'express-rate-limit'

export const prisma = new PrismaClient();

dotenv.config({
    path:path.resolve(import.meta.dirname,"../.env")
})


const corsOption = {
  origin:  process.env.ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}

console.log(process.env.ORIGIN);
const app = express();


app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
    limit:'16kb'
}));


const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})


app.use("/api/v1/auth",limiter,authRouter);
app.use("/api/v1/admin",limiter,adminRouter);
app.use("/api/v1/health",healthCheckRouter);

// routes required 
// create user
// sign in
// google stuff
// dashboard
// userInfo



app.listen(parseInt(process.env.PORT || '8080'),()=>{
    console.log(`server is running at PORT :${process.env.PORT || 8080}`)
})

// async function test(){
//    try {
//      // const res = await prisma.user.create({
//         // data:{
//         //     name:"test6",
//         //     email:"test6"
//         // }
//         const res = await prisma.user.findUnique({
//             where : {
//                 email: "test6"
//             }
//         });
//         console.log("test successfull : ",res)
//    } catch (error) {
//      console.log(error)
//    }
// }


// test();

