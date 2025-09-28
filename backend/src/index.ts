
import dotenv from "dotenv";
import path from "path"

import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"
import adminRouter from "./routes/admin.route.js"

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

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/admin",adminRouter);

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

